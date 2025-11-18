
import { convert } from "html-to-text";

function getRoute(categorySlug?: string) {
  return {
    events: "event",
    news: "news",
    podcasts: "podcasts",
    blogs: "posts",
  }[categorySlug ?? ""] || "articles";
}

function deepExtract(node: any, acc: string[]) {
  if (!node) return;
  if (typeof node === 'string') {
    let cleaned = node;
    try { cleaned = convert(node); } catch { /* ignore */ }
    cleaned = cleaned.replace(/\s+/g,' ').trim();
    if (cleaned) acc.push(cleaned);
    return;
  }
  if (Array.isArray(node)) { node.forEach(n=> deepExtract(n, acc)); return; }
  if (typeof node === 'object') {
    for (const [k,v] of Object.entries(node)) {
      if (k === '__component') continue;
      deepExtract(v, acc);
    }
  }
}

function buildSearchText(entity: any): string {
  const parts: string[] = [];
  ["title", "heading", "subHeading"].forEach(f=> { if (entity?.[f]) parts.push(String(entity[f])); });
  deepExtract(entity?.content, parts);
  deepExtract(entity?.category, parts);
  // Deduplicate
  const seen = new Set<string>();
  const ordered: string[] = [];
  for (const p of parts) {
    const lower = p.toLowerCase();
    if (!seen.has(lower)) { seen.add(lower); ordered.push(p); }
  }
  return ordered.join(' ').replace(/\s+/g,' ').trim().toLowerCase();
}

export default {
  async beforeCreate(event) {
    const { data } = event.params;
    data.search_text = buildSearchText(data);
  },
  async beforeUpdate(event) {
    const { data } = event.params;
    // Need existing relations for category-based text
    if (event.params?.where?.id) {
      const existing = await strapi.entityService.findOne("api::article.article", event.params.where.id, { populate: { category: true } });
      data.search_text = buildSearchText({ ...existing, ...data });
    } else {
      data.search_text = buildSearchText(data);
    }
  },
  async afterCreate(event) {
    await generatePreviewUrl(event);
  },
  async afterUpdate(event) {
    await generatePreviewUrl(event);
  },
};

async function generatePreviewUrl(event) {
  const { result } = event;
  const article = await strapi.entityService.findOne("api::article.article", result.id, {
    populate: { category: true },
  });
  const articleAny = article as any;
  const categorySlug = articleAny.category?.slug?.toLowerCase();
  const route = getRoute(categorySlug);
  const site = process.env.FRONTEND_URL || "https://devwebsite.landus.ag";
  const previewUrl = `${site}/${route}/${articleAny.slug}`;
  if (articleAny.previewUrl === previewUrl) return; // Avoid infinite loop
  await strapi.entityService.update("api::article.article", articleAny.id, { data: { previewUrl } });
}
