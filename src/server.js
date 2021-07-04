const Hapi = require('@hapi/hapi');
const config = require('config');
const pkg = require('../package.json');

const server = new Hapi.Server({
  // Instead of requiring the config package wherever app config is needed,
  // Hapi provides the ability to stash this kind of data on the server object.
  app: config,
  host: config.get('api.host'),
  port: config.get('api.port'),
  router: {
    stripTrailingSlash: true,
  },
  routes: {
    cache: {
      privacy: 'public',
      // Expiration in 1 minute. Setting this as a default value to push more
      // careful consideration of caching behaviors.
      expiresIn: config.get('api.http.cache.maxAge'),
    },
    log: {
      // @see https://hapijs.com/api#-routeoptionslog
      // Verify this works.
      collect: config.get('api.debug') === 'true',
    },
    response: {
      // @see https://hapijs.com/api#-routeoptionsresponseemptystatuscode
      emptyStatusCode: 204,
    },
  },
});

/**
 * Starts the server
 * @returns {Promise.<void>}
 */
const startServer = async () => {
  try {
    // Start the server
    console.log('Starting Hapi server...');
    await server.start();

    await console.log(
      `Service "${config.get('api.name')}" v${pkg.version
      } started at ${config.get('api.host')}:${config.get(
        'api.port',
      )} with env: ${config.util.getEnv('NODE_ENV')}`,
    );
  } catch (error) {
    console.error(
      `Error starting service "${config.get('api.name')} v${pkg.version}": `,
      error,
    );
    process.exit(1);
  }
};

const apiCache = server.cache({
  segment: 'apicache',
  expiresIn: 20 * 60 * 1000, // 20 minutes
});

module.exports.apiCache = apiCache;
module.exports.instance = server;
module.exports.start = startServer;
