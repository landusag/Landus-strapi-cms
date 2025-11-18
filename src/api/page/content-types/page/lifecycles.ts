import { convert } from 'html-to-text';

// Deeply collect all string-like content from any structure (objects / arrays) for dynamic zones.
function collectStrings(node: any, acc: string[]) {
  if (!node) return;
  if (typeof node === 'string') {
    let cleaned = node;
    try { cleaned = convert(node); } catch { /* ignore */ }
    cleaned = cleaned.replace(/\s+/g,' ').trim();
    if (cleaned) acc.push(cleaned);
    return;
  }
  if (Array.isArray(node)) {
    for (const item of node) collectStrings(item, acc);
    return;
  }
  if (typeof node === 'object') {
    for (const key of Object.keys(node)) {
      if (key === '__component') continue; // skip component uid label
      collectStrings(node[key], acc);
    }
  }
}

function buildSearchText(entity: any): string {
  const parts: string[] = [];
  collectStrings(entity.title, parts);
  collectStrings(entity.seo, parts); // metaTitle, metaDescription, keywords, canonicalURL etc
  collectStrings(entity.blocks, parts); // all nested section fields (heading, description, content, etc)
  collectStrings(entity.categories_pages, parts);
  // Deduplicate while preserving order
  const dedup: string[] = [];
  const seen = new Set<string>();
  for (const p of parts) {
    const lower = p.toLowerCase();
    if (!seen.has(lower)) { seen.add(lower); dedup.push(p); }
  }
  return dedup.join(' ').replace(/\s+/g,' ').trim().toLowerCase();
}

function buildPreviewUrl(entity: any): string {
  if (entity?.seo?.canonicalURL) return entity.seo.canonicalURL;
  const raw = entity.title || '';
  const slug = raw.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'');
  const base = process.env.FRONTEND_URL || '';
  return base ? `${base}/${slug}` : `/${slug}`;
}

export default {
  async beforeCreate(event) {
    const { data } = event.params;
    data.search_text = buildSearchText(data);
    data.previewUrl = buildPreviewUrl(data);
  },
  async beforeUpdate(event) {
    const { data } = event.params;
    if (event.params?.where?.id) {
      const existing = await strapi.entityService.findOne('api::page.page', event.params.where.id, { populate: { seo: true, blocks: { populate: '*' }, categories_pages: true } });
      data.search_text = buildSearchText({ ...existing, ...data });
      data.previewUrl = buildPreviewUrl({ ...existing, ...data });
    } else {
      data.search_text = buildSearchText(data);
      data.previewUrl = buildPreviewUrl(data);
    }
  }
};
