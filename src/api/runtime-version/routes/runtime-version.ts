export default {
  routes: [
    {
      method: "GET",
      path: "/runtime-version",
      handler: "runtime-version.index",
      config: {
        auth: false,
      },
    },
  ],
};