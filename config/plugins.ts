module.exports = {
  graphql: {
    config: {
      defaultLimit: 100,
      maxLimit: 200, // adjust if needed
      depthLimit: 10,
    },
  },

  // ✅ Enable preview URLs for Article content type
  'content-manager': {
    enabled: true,
    config: {
      preview: {
        formats: [
          {
            uid: 'api::article.article',   // your collection type UID

            draft: {
              url: (entity) => {
                const site = process.env.FRONTEND_URL || 'https://devwebsite.landus.ag';
                return `${site}/${entity.previewUrl}`;
              },
            },

            published: {
              url: (entity) => {
                const site = process.env.FRONTEND_URL || 'https://devwebsite.landus.ag';
                return `${site}/${entity.previewUrl}`;
              },
            },
          },
        ],
      },
    },
  },
    upload: {
    config: {
      provider: 'local',
      providerOptions: {
        sizeLimit: 50000000, // 50 MB
      },
    },
  },
};
