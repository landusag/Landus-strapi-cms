// Shared helpers for building preview URLs.
// Ensures base URL normalization, slug encoding, and consistent path output.

const getFrontendBase = (): string => {
  const env = process.env.FRONTEND_URL?.trim() || 'https://devwebsite.landus.ag';
  return env.replace(/\/+$/, ''); // remove trailing slashes
};

export const buildPreviewUrl = (pathPrefix: string, slug?: string): string | undefined => {
  if (!slug) return undefined;
  const base = getFrontendBase();
  // Clean pathPrefix: remove leading/trailing slashes
  const cleanedPrefix = pathPrefix.replace(/^\/+|\/+$/g, '');
  // Encode slug to handle spaces or special characters
  const encodedSlug = encodeURIComponent(String(slug));
  return `${base}/${cleanedPrefix}/${encodedSlug}`;
};

export const shouldRegenerate = (data: any): boolean => {
  // Regenerate if slug provided/changed or previewUrl is missing/empty
  if (!data) return false;
  if (data.slug) return true;
  if (!data.previewUrl) return true;
  return false;
};

export const fetchExistingSlug = async (uid: string, id: number | string): Promise<string | undefined> => {
  try {
    // Use any typing to avoid build-time issues if Strapi TS types are not fully generated.
  const existing: any = await (strapi as any).entityService.findOne(uid, id, { fields: ['slug'] });
    return existing?.slug;
  } catch (e: any) {
    strapi.log.error(`[previewUrl] Failed to fetch existing slug for ${uid} id=${id}: ${e?.message || e}`);
    return undefined;
  }
};
