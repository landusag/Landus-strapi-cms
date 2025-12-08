module.exports = ({ env }) => ({
  graphql: {
    config: {
      defaultLimit: 100,
      maxLimit: 200,
      depthLimit: 10,
    },
  },

  // Preview URL config (your existing setup)
  "content-manager": {
    enabled: true,
    config: {
      preview: {
        formats: [
          {
            uid: "api::article.article",
            draft: {
              url: (entity) => {
                const site = env("FRONTEND_URL", "https://landus.ag");
                return `${site}/${entity.previewUrl}`;
              },
            },
            published: {
              url: (entity) => {
                const site = env("FRONTEND_URL", "https://landus.ag");
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
      provider: "local",
      providerOptions: {
        sizeLimit: 50000000,
      },
    },
  },

  // 📧 Office365 Email Config (Nodemailer)
  email: {
    config: {
      provider: "nodemailer",
      providerOptions: {
        host: "smtp.office365.com",
        port: 587,
        secure: false, // Office365 requires STARTTLS, so false
        auth: {
          user: "cde-noreply@landuscooperative.onmicrosoft.com", // EmailUsername
          pass: "btg4zmh-fwt!GHD2qen", // EmailPassword
        },
        tls: {
          ciphers: "SSLv3",
          rejectUnauthorized: false,
        },
      },
      settings: {
        defaultFrom: "NoReply@landus.ag", // DefaultSenderEmail
        defaultReplyTo: "NoReply@landus.ag",
        defaultFromName: "Landus Team", // DefaultSenderName
      },
    },
  },

   'scholarship-export': {
    enabled: true,
    resolve: './src/plugins/scholarship-export',
  },
});
