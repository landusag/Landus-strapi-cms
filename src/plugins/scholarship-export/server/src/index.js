'use strict';

const routes = require('./routes');
const controllers = require('./controllers');

module.exports = () => {
  return {
    // optional lifecycle hooks
    register(/* { strapi } */) {},
    bootstrap(/* { strapi } */) {},

    // no custom config for now
    config: {
      default: {},
      validator() {},
    },

    routes,
    controllers,
    services: {},
    contentTypes: {},
    policies: {},
    middlewares: {},
  };
};
