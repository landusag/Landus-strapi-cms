export default [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
  {
    name: "global::permanent-redirect",
    config: {
      rules: [
        //{ from: "/old-slug", to: "/new-slug" },
        { from: "/events", to: "/company/events" },
        // Add as many as you need
      ],
    },
  }
];
