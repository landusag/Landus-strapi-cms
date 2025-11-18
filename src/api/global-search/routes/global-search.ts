export default {
  routes: [
    {
      method: "GET",
      path: "/global-search",
      handler: "global-search.index",
      config: {
        auth: false,
      },
    },
  ],
};
