export default {
  index(ctx) {
    ctx.body = process.version;
  },
};