/**
 * App API
 *
 * This module handles app related API calls.
 *
 * Primarily this will contain API functionality to ensure the App is running
 * compatible version.
 *
 */
const pkg = require('../../../package.json');
const pluginUtil = require('../../util/plugin');

// Unique name of this component amongst all Hapi plugins.
const name = 'app';

const plugin = {
  name,
  version: pkg.version,
};

plugin.register = async (server, options) => {
  const routes = await pluginUtil.filterRoutes(require('./app.routes')(name));
  server.route([].concat(routes));
};

module.exports = plugin;
