// Koa middleware for Strapi v4
module.exports = (config, { strapi }) => {
  const redirects = config?.map || []; // [{ from: '/old', to: '/new' }, ...]
  const rules = redirects.map(r => ({
    from: new RegExp(`^${r.from}$`), // exact match; change to pattern if needed
    to: r.to,
  }));

  return async (ctx, next) => {
    const match = rules.find(rule => rule.from.test(ctx.path));
    if (match) {
      ctx.status = 301;            // Permanent redirect
      ctx.redirect(match.to);      // Sets Location header
      return;                      // Stop processing
    }
    await next();
  };
};