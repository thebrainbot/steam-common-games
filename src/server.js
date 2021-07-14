/* eslint-disable no-console */
const Hapi = require('@hapi/hapi');
const config = require('config');
const plugins = require('./plugins');
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

// Register an individual plugin, includes error handling and logging.
async function registerPlugin(plugin) {
  const name = plugin.plugin.name || plugin.plugin.pkg.name;
  const version = plugin.plugin.version || plugin.plugin.pkg.version;
  try {
    await server.register(plugin);
    console.log(` \u2714 registered plugin "${name} v${version}"`);
  } catch (error) {
    console.error(`Failed to register plugin "${name} v${version}": ${error}`);
    throw error;
  }
}

// Register a set of plugins associated with a given startup phase.
const registerPluginSet = async phase => {
  if (plugins[phase] instanceof Function) {
    plugins[phase] = plugins[phase]();
  }

  const pluginsArray = plugins[phase].map(async pluginSet => {
    console.log('registering plugin', pluginSet);
    if (pluginSet instanceof Function) {
      pluginSet = pluginSet(server);
    }
    if (!Array.isArray(pluginSet)) {
      pluginSet = [pluginSet];
    }

    const pluginSetArray = pluginSet.map(async plugin => {
      await registerPlugin(plugin);
    });
    // This requres all plugins in the set to be registered before returning
    await Promise.all(pluginSetArray);
  });
  // This requres all plugins for specified phase to be registered before returning
  await Promise.all(pluginsArray);
};

// Register all plugins. The phases are explicit for clarity.
const registerAllPlugins = async () => {
  // await registerPluginSet('bootstrap');
  await registerPluginSet('main');
  await registerPluginSet('tail');
};

/**
 * Handle server configuration or other pre-start configurations.
 * Useful for supporting HAPI testing.
 */
const serverPrep = async () => {
  try {
    console.log('Registering Hapi plugins...');
    // This should register all plugins before continuing
    await registerAllPlugins();
  } catch (error) {
    console.error(
      `Error during server prep "${config.get('api.name')} v${pkg.version}": `,
      error,
    );
    process.exit(1);
  }
};
/**
 * Starts the server
 * @returns {Promise.<void>}
 */
const startServer = async () => {
  try {
    await serverPrep();
    // Start the server
    console.log('Starting Hapi server...');
    await server.start();

    await console.log(
      `Service "${config.get('api.name')}" v${
        pkg.version
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

/**
 * Server init used for testing.
 */
const initServer = async () => {
  await serverPrep();
  await server.initialize();
  return server;
};

const apiCache = server.cache({
  segment: 'apicache',
  expiresIn: 20 * 60 * 1000, // 20 minutes
});

module.exports.apiCache = apiCache;
module.exports.instance = server;
module.exports.registerAllPlugins = registerAllPlugins;
module.exports.start = startServer;
module.exports.testInit = initServer;
