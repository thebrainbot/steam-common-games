/**
 * Plugins
 *
 * This is the central point of identifying all Hapi plugins to load as part
 * of preparations to start a new server instance.
 *
 * In addition to loading all plugins from the components directory, any
 * other ad hoc plugins from the project dependencies or elsewhere in the codebase
 * should be loaded here. In the case of a "subsystem" model, this file should
 * not know the details of the Hapi plugin in use, for example, the logger.
 *
 * Registration of plugins is not handled here, see server.js::registerAllPlugins().
 *
 * This file's export is an object with arrays of plugins broken up by phase:
 * - bootstrap: Plugins that must be loaded before other plugins, such as
 *   route-providing components. This includes authentication plugins.
 * - main: The main bulk of plugins.
 * - tail: Plugins dependent one or more "main" plugins.
 */

/* eslint global-require: "off", import/no-dynamic-require: "off" */
const components = require('./components');

// If components need to be disabled from the system, use components.filter
// to modify which components are assigned to the enabled variable.
//
// Note this may be replaced in a more structured way with plugin labels.
// const enabled = components.filter(component => true);
const enabled = components;

const plugins = {};

// Convert the list of components by name to the structure expected by hapi.
plugins.main = enabled.map(component => ({
  // eslint-disable-next-line
  plugin: require(`./components/${component}/hapi`),
}));

// Initialize the tail phase.
plugins.tail = [];

module.exports = plugins;
