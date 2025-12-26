module.exports = ({ env }) => ({
  redirect: {
    enabled: true
  },
  graphql: {
    config: {
      defaultLimit: 100,
      maxLimit: 200,
      depthLimit: 10,
    },
  },

  "content-manager": {
    enabled: true,
    config: {
      preview: {
        formats: [
          {
            uid: "api::article.article",
            draft: {
              url: (entity) =>
                `${env("FRONTEND_URL", "https://landus.ag")}/${entity.previewUrl}`,
            },
            published: {
              url: (entity) =>
                `${env("FRONTEND_URL", "https://landus.ag")}/${entity.previewUrl}`,
            },
          },
        ],
      },
    },
  },

  upload: {
    config: {
      provider: "local",
      providerOptions: {
        sizeLimit: 50000000,
      },
    },
  },



  "scholarship-export": {
    enabled: true,
    resolve: "./src/plugins/scholarship-export",
  },

  "donation-export": {
    enabled: true,
    resolve: "./src/plugins/donation-export",
  },
});
