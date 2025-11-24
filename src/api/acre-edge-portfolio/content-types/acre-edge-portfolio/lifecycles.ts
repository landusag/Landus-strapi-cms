// Auto-generate previewUrl for Acre Edge Portfolio entries using shared utility.
// Pattern: FRONTEND_URL/acreedge/{slug}

import { buildPreviewUrl, shouldRegenerate, fetchExistingSlug } from '../../../../utils/previewUrl';

export default {
  async beforeCreate(event) {
    const { data } = event.params;
    if (data.slug) {
      data.previewUrl = buildPreviewUrl('acreedge', data.slug);
    }
  },
  async beforeUpdate(event) {
    const { data, where } = event.params;
    if (shouldRegenerate(data)) {
      let slug = data.slug;
      if (!slug && where?.id) {
        slug = await fetchExistingSlug('api::acre-edge-portfolio.acre-edge-portfolio', where.id);
      }
      if (slug) {
        data.previewUrl = buildPreviewUrl('acreedge', slug);
      }
    }
  }
};
