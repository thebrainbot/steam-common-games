/**
 * GraphQL API config for HAPI
 *
 */

const config = require('config');
const { ApolloServer } = require('apollo-server-hapi');
const { hapi: voyagerMiddleware } = require('graphql-voyager/middleware');
const pkg = require('../../../package.json');
const schema = require('./schema');
const pluginUtil = require('../../util/plugin');

// Unique name of this component amongst all Hapi plugins.
const name = 'graphQL';

const plugin = {
  name,
  version: pkg.version,
};

const routes = [
  {
    plugin: voyagerMiddleware,
    options: {
      path: '/voyager',
      route: {
        auth: {
          mode: 'try',
        },
      },
      endpointUrl: '/graphql',
      displayOptions: {
        sortByAlphabet: true,
      },
    },
    config: {
      plugins: {
        routeFilter: { testRoute: true },
      },
    },
  },
];

const testMode = config.get('api.test_mode');

plugin.register = async (server, options) => {
  let playground = false;
  let introspection = false;
  if (testMode === 'true') {
    playground = {
      shareEnabled: true,
    };
    introspection = true;
  }

  const apolloServer = new ApolloServer({
    schema,
    playground,
    introspection,
  });

  await apolloServer.applyMiddleware({
    app: server,
    route: {
      auth: {
        mode: 'try',
      },
    },
  });
  await apolloServer.installSubscriptionHandlers(server.listener);

  server.register(await pluginUtil.filterRoutes(routes));
};

module.exports = plugin;
