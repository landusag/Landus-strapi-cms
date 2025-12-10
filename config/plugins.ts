module.exports = ({ env }) => ({
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

  //  EMAIL CONFIG NOW USING ENV VARIABLES
email: {
  config: {
    provider: "nodemailer",
    providerOptions: {
      host: env("SMTP_HOST"),
      port: env.int("SMTP_PORT"),
      secure: false,
      auth: {
        user: env("SMTP_USERNAME"),
        pass: env("SMTP_PASSWORD"),
      },
      tls: {
        rejectUnauthorized: false,
      },
    },
    settings: {
      defaultFrom: env("EMAIL_FROM"),
      defaultReplyTo: env("EMAIL_REPLY_TO"),
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
