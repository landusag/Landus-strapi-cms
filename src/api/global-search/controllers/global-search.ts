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
const CONTENT_TYPES: any[] = [
  {
    uid: "api::article.article",
    type: "article",
    fields: ["title", "heading", "subHeading", "search_text"],
    populate: { category: true, coverImage: true },
    url: (entry: any) => entry.previewUrl || `/news/${entry.slug}`,
  },
  {
    uid: "api::page.page",
    type: "page",
    fields: ["title", "search_text"],
    populate: { seo: true, categories_pages: true, blocks: { populate: "*" } },
    url: (entry: any) => entry?.seo?.canonicalURL || "/", // canonical only per requirement
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
        const orFilters: any[] = [];
        for (const field of cfg.fields) {
          for (const token of tokens) {
            orFilters.push({ [field]: { $containsi: token } });
          }
        }
        // Debug disabled: uncomment if needed
        // console.log('Search filters', cfg.uid, JSON.stringify(orFilters));
        let items;
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

        for (const entry of items) {
          const displayTitle = entry?.seo?.metaTitle || entry.title;
          const searchTextRaw = entry.search_text || "";
          let deepParts: string[] = [];
          if (cfg.type === "page") deepExtract(entry.blocks, deepParts);
          // Build base text (search_text first so phrase matches even if not in blocks)
          const baseText = [
            searchTextRaw,
            displayTitle,
            entry?.seo?.metaDescription,
            ...(deepParts || []),
            entry.heading,
            entry.subHeading,
          ]
            .filter(Boolean)
            .join(" ");
          const combined = normalize(baseText);
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
          // Fallback: if snippetSource still empty and search_text has phrase
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
