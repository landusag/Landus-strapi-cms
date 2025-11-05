
function getRoute(categorySlug?: string) {
  return {
    events: "event",
    news: "news",
    blogs: "blog",
  }[categorySlug ?? ""] || "articles";
}

export default {
  async afterCreate(event) {
    await generatePreviewUrl(event);
  },

  async afterUpdate(event) {
    await generatePreviewUrl(event);
  },
};

async function generatePreviewUrl(event) {
  const { result } = event;

  // Get fresh article with relation
  const article = await strapi.entityService.findOne("api::article.article", result.id, {
    populate: { category: true },
  });

  const articleAny = article as any;
  const categorySlug = articleAny.category?.slug?.toLowerCase();
  const route = getRoute(categorySlug);
  const site = process.env.FRONTEND_URL || "https://devwebsite.landus.ag";
  const previewUrl = `${site}/${route}/${articleAny.slug}`;

  //  STOP infinite loop: Only update if value is different
  if (articleAny.previewUrl === previewUrl) {
    return;
  }


  await strapi.entityService.update("api::article.article", articleAny.id, {
    data: { previewUrl },
  });
}
