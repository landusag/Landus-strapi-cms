import type { StrapiApp } from "@strapi/strapi/admin";

export default {
  bootstrap(_app: StrapiApp) {
    if (!/\/admin\/?$/.test(window.location.pathname)) return;

    fetch("/api/runtime-version")
      .then(async (response) => {
        if (response.ok) {
          console.log(await response.text());
        }
      })
      .catch(() => undefined);
  },
};