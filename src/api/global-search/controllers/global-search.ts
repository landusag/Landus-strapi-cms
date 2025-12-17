// ---------------- Helpers ----------------
function normalize(str: string): string {
  return (str || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function snippet(full: string, term: string, len = 160): string {
  if (!full) return "";
  const nFull = full.toLowerCase();
  const nTerm = term.toLowerCase();
  const idx = nFull.indexOf(nTerm);
  if (idx === -1) return full.slice(0, len);
  const start = Math.max(0, idx - 50);
  const end = Math.min(full.length, idx + nTerm.length + 110);
  return full.slice(start, end).trim();
}

// Deep extractor: returns array of cleaned strings
function deepExtract(node: any, acc: string[]) {
  if (!node) return;
  if (typeof node === "string") {
    const cleaned = node
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    if (cleaned) acc.push(cleaned);
    return;
  }
  if (Array.isArray(node)) {
    node.forEach((n) => deepExtract(n, acc));
    return;
  }
  if (typeof node === "object") {
    for (const [k, v] of Object.entries(node)) {
      if (k === "__component") continue; // skip uid label
      deepExtract(v, acc);
    }
  }
}

// ---------------- Content types config ----------------
// Each object defines a collection or single type to be included in global search.
// For single types, set singleType: true. Specify fields to search and relations to populate.
const CONTENT_TYPES: any[] = [
  // Team Member collection
  {
    uid: "api::team-member.team-member",
    type: "team-member",
    fields: ["fullName", "title", "role"],
    populate: { profilePhoto: true, team_category: true },
    url: (entry: any) => entry.previewUrl || `/team-details/${entry.slug}`,
  },
  // Scholarship Application Page (single type)
  // Article collection
  // Product collection
  // Acre Edge Portfolio collection
  // Page collection
  // Contact Page (single type)
  // Location Page (single type)
  // Home Page (single type)
  {
    uid: "api::scholarship-application-page.scholarship-application-page",
    type: "scholarship-application-page",
    singleType: true,
    fields: ["title", "intro", "introParagraph", "deadlineNotice", "downloadButtonLabel"],
    populate: { seo: true },
    url: (entry: any) => entry?.seo?.canonicalURL || "/scholarship-application",
  },
  {
    uid: "api::article.article",
    type: "article",
  fields: ["title", "heading", "subHeading"],
    populate: { category: true, coverImage: true },
    url: (entry: any) => entry.previewUrl || `/news/${entry.slug}`,
  },
  {
    uid: "api::product.product",
    type: "product",
    fields: ["title", "description", "slug"],
    populate: { category: true, image: true },
    url: (entry: any) => entry.previewUrl || `/products/${entry.slug}`,
  },
  {
    uid: "api::acre-edge-portfolio.acre-edge-portfolio",
    type: "acre-edge-portfolio",
    fields: ["title", "description", "slug"],
    populate: { image: true, products: true, button: true },
    url: (entry: any) => entry.previewUrl || `/acre-edge-portfolio/${entry.slug}`,
  },
  {
    uid: "api::page.page",
    type: "page",
    fields: ["title", "search_text"],
    populate: { seo: true, categories_pages: true, blocks: { populate: "*" } },
    url: (entry: any) => entry?.seo?.canonicalURL || "/", // canonical only per requirement
  },
  {
    uid: "api::contact-page.contact-page",
    type: "contact-page",
    singleType: true,
    fields: ["title"],
    populate: { seo: true, blocks: { populate: "*" } },
    url: () => "/contact", // or your actual contact page route
  },
  {
    uid: "api::location-page.location-page",
    type: "location-page",
    singleType: true,
    fields: ["title"],
    populate: { seo: true, blocks: { populate: "*" }, locations: true },
    url: (entry: any) => entry?.seo?.canonicalURL || "/locations",
  },
  {
    uid: "api::home.home",
    type: "home",
    singleType: true,
    fields: ["title", "description"],
    populate: { seo: true, home: { populate: "*" } },
    url: (entry: any) => entry?.seo?.canonicalURL || "/",
  },
];

export default {
  async index(ctx) {
    try {
      const strapi = (global as any).strapi;
      const qRaw = String(ctx.query.q || "").trim();
      if (!qRaw) {
        ctx.body = [];
        return;
      }
      const tokens = qRaw
        .toLowerCase()
        .split(/[^a-z0-9']+/)
        .filter((t) => t && t.length > 2);
      if (tokens.length === 0) {
        ctx.body = [];
        return;
      }
      const phraseLower = qRaw.toLowerCase().replace(/\s+/g, " ").trim();
      const requireAll = ctx.query.match === "all"; // optional AND mode if client passes ?match=all

      const aggregated: any[] = [];
      for (const cfg of CONTENT_TYPES) {
        // Guard: skip if model UID doesn't exist in Strapi (prevents getModel undefined errors)
        const hasModel = !!(strapi?.getModel?.(cfg.uid) || strapi?.contentTypes?.[cfg.uid]);
        if (!hasModel) {
          // silently skip unknown/disabled content types
          continue;
        }
        let items;
        try {
          if (cfg.singleType) {
            // Single type: fetch one
            const entry = await strapi.entityService.findMany(cfg.uid, { populate: cfg.populate });
            items = entry ? [entry] : [];
          } else {
            const orFilters: any[] = [];
            for (const field of cfg.fields) {
              for (const token of tokens) {
                orFilters.push({ [field]: { $containsi: token } });
              }
            }
            // Debug disabled: uncomment if needed
            // console.log('Search filters', cfg.uid, JSON.stringify(orFilters));
            try {
              items = await strapi.entityService.findMany(cfg.uid, {
                filters: { $or: orFilters },
                populate: cfg.populate,
                limit: 100,
              });
            } catch (e: any) {
              if (e?.details?.key === "content") {
                // Retry without filters (still populate basics)
                items = await strapi.entityService.findMany(cfg.uid, {
                  populate: cfg.populate,
                  limit: 100,
                });
              } else {
                throw e;
              }
            }
            // Fallback: if pages came back empty try unfiltered fetch (for stale search_text)
            if (cfg.type === "page" && items.length === 0) {
              items = await strapi.entityService.findMany(cfg.uid, {
                populate: cfg.populate,
                limit: 200,
              });
            }
            // Article fallback if empty
            if (cfg.type === "article" && items.length === 0) {
              items = await strapi.entityService.findMany(cfg.uid, {
                populate: cfg.populate,
                limit: 150,
              });
            }
          }
        } catch (e) {
          // If a specific model errors, skip it to keep global search responsive
          // console.error("Global search model error for", cfg.uid, e);
          continue;
        }

  // ---- Main search logic for each entry ----
  for (const entry of items) {
          let displayTitle = entry?.seo?.metaTitle || entry.title;
          if (cfg.type === "product") displayTitle = entry.title;
          let searchTextRaw = "";
          if (cfg.type === "page") {
            // pages may still have a derived search text; if removed, keep empty
            searchTextRaw = entry.search_text || "";
          }
          let deepParts = [];
          if (cfg.type === "page" && entry.blocks) deepExtract(entry.blocks, deepParts);
          if (cfg.type === "product" && entry.content) deepExtract(entry.content, deepParts);
          if (cfg.type === "acre-edge-portfolio" && entry.content) deepExtract(entry.content, deepParts);
          if (cfg.type === "contact-page" && entry.blocks) deepExtract(entry.blocks, deepParts);
          if (cfg.type === "home" && entry.home) deepExtract(entry.home, deepParts);
          if (cfg.type === "location-page" && entry.blocks) deepExtract(entry.blocks, deepParts);
          // Build up the base text array for searching. Add extra fields for each type as needed.
          let baseTextArr = [
            searchTextRaw,
            displayTitle,
            entry?.seo?.metaDescription,
            ...(deepParts || []),
            entry.heading,
            entry.subHeading,
          ];
          // Add all relevant fields for team-member collection
          if (cfg.type === "team-member" && entry.fullName) baseTextArr.push(entry.fullName);
          if (cfg.type === "team-member" && entry.title) baseTextArr.push(entry.title);
          if (cfg.type === "team-member" && entry.role) baseTextArr.push(entry.role);
          if (cfg.type === "team-member" && entry.bio) deepExtract(entry.bio, baseTextArr);
          // Add all relevant fields for scholarship-application-page (single type)
          if (cfg.type === "scholarship-application-page" && entry.title) baseTextArr.push(entry.title);
          if (cfg.type === "scholarship-application-page" && entry.intro) baseTextArr.push(entry.intro);
          if (cfg.type === "scholarship-application-page" && entry.introParagraph) baseTextArr.push(entry.introParagraph);
          if (cfg.type === "scholarship-application-page" && entry.deadlineNotice) baseTextArr.push(entry.deadlineNotice);
          if (cfg.type === "scholarship-application-page" && entry.downloadButtonLabel) baseTextArr.push(entry.downloadButtonLabel);
          // Add all relevant fields for other single types and collections
          if (cfg.type === "scholarship-application-page" && entry.title) baseTextArr.push(entry.title);
          if (cfg.type === "scholarship-application-page" && entry.intro) baseTextArr.push(entry.intro);
          if (cfg.type === "scholarship-application-page" && entry.introParagraph) baseTextArr.push(entry.introParagraph);
          if (cfg.type === "scholarship-application-page" && entry.deadlineNotice) baseTextArr.push(entry.deadlineNotice);
          if (cfg.type === "scholarship-application-page" && entry.downloadButtonLabel) baseTextArr.push(entry.downloadButtonLabel);
          if (cfg.type === "product" && entry.description) baseTextArr.push(entry.description);
          if (cfg.type === "product" && entry.slug) baseTextArr.push(entry.slug);
          if (cfg.type === "acre-edge-portfolio" && entry.description) baseTextArr.push(entry.description);
          if (cfg.type === "acre-edge-portfolio" && entry.slug) baseTextArr.push(entry.slug);
          if (cfg.type === "contact-page" && entry.title) baseTextArr.push(entry.title);
          if (cfg.type === "home" && entry.title) baseTextArr.push(entry.title);
          if (cfg.type === "home" && entry.description) baseTextArr.push(entry.description);
          if (cfg.type === "location-page" && entry.title) baseTextArr.push(entry.title);
          const baseText = baseTextArr.filter(Boolean).join(" ");
          const combined = normalize(baseText);
          // Use substring matching to allow prefix queries (e.g., 'compre' matches 'comprehensive')
          let matched = tokens.filter((t) => combined.includes(t));
          if (requireAll && matched.length !== tokens.length) continue;
          if (!matched.length) continue;

          // Snippet logic
          let snippetSource: string;
          const lowerBase = baseText.toLowerCase();
          if (lowerBase.includes(phraseLower)) {
            snippetSource = snippet(baseText, phraseLower);
          } else if (cfg.type === "page" && deepParts.length) {
            // Choose earliest token occurrence
            let earliestIdx = Infinity;
            let chosen = matched[0];
            for (const t of matched) {
              const i = lowerBase.indexOf(t);
              if (i !== -1 && i < earliestIdx) {
                earliestIdx = i;
                chosen = t;
              }
            }
            snippetSource = snippet(baseText, chosen);
          } else {
            // Articles or pages without deep parts
            let earliestIdx = Infinity;
            let chosen = matched[0];
            for (const t of matched) {
              const i = lowerBase.indexOf(t);
              if (i !== -1 && i < earliestIdx) {
                earliestIdx = i;
                chosen = t;
              }
            }
            snippetSource = snippet(baseText, chosen);
          }
          // Fallback: if snippetSource still empty and search_text has phrase (pages only)
          if (!snippetSource && searchTextRaw)
            snippetSource = snippet(searchTextRaw, matched[0]);
          aggregated.push({
            id: entry.id,
            title: displayTitle,
            type: cfg.type,
            url: cfg.url(entry),
            snippet: snippetSource,
            score: matched.length / tokens.length,
          });
        }
      }

      const sorted = aggregated
        .map((r) => {
          const firstToken = tokens[0];
          const pos = (r.snippet || "").toLowerCase().indexOf(firstToken);
          const titleBoost = r.title?.toLowerCase().includes(firstToken)
            ? 0.2
            : 0;
          return { ...r, finalScore: r.score + titleBoost - pos * 0.0005 };
        })
        .sort((a, b) => b.finalScore - a.finalScore);
      ctx.body = sorted;
    } catch (err) {
      console.error("🔥 Global Search Error:", err);
      ctx.internalServerError("Search failed");
    }
  },
};
