function buildPreviewUrl(entity: any) {
  const site = process.env.FRONTEND_URL || "https://devwebsite.landus.ag";
  return `${site}/team-details/${entity.slug}`;
}

export default {
  async beforeCreate(event) {
    const { data } = event.params;
    if (data.slug) {
      data.previewUrl = buildPreviewUrl(data);
    }
  },
  async beforeUpdate(event) {
    const { data } = event.params;
    if (data.slug) {
      data.previewUrl = buildPreviewUrl(data);
    }
  },
};
