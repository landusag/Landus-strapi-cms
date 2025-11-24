// Auto-generate previewUrl for Product entries.
// Pattern: FRONTEND_URL/energy-commentary/{slug}

import { buildPreviewUrl, shouldRegenerate, fetchExistingSlug } from '../../../../utils/previewUrl';

export default {
  async beforeCreate(event) {
    const { data } = event.params;
    if (data.slug) {
      data.previewUrl = buildPreviewUrl('products', data.slug);
    }
  },
  async beforeUpdate(event) {
    const { data, where } = event.params;
    if (shouldRegenerate(data)) {
      let slug = data.slug;
      if (!slug && where?.id) {
        slug = await fetchExistingSlug('api::product.product', where.id);
      }
      if (slug) {
        data.previewUrl = buildPreviewUrl('products', slug);
      }
    }
  }
};
