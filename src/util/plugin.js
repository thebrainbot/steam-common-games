// This function is used to filter routes which are intended
// for test environments ONLY.  If the route contains a plugin
// setting for routeLoader which has testRoute = true AND config
// is not set to test_mode, filter the route so it is not registered
const config = require('config');

module.exports.filterRoutes = async routes => {
  // Check to see if config is set to test mode
  // If we are in test mode, return all routes
  if (config.get('api.test_mode') === 'true') {
    return routes;
  }

  // Filter any routes which have testRoute = true
  routes = routes.filter(route => {
    let returnRoute = true;

    if (route.config && route.config.plugins) {
      const { routeFilter } = route.config.plugins;

      if (routeFilter) {
        const { testRoute } = routeFilter;
        if (testRoute) {
          returnRoute = false;
        }
      }
    }
    return returnRoute;
  });

  return routes;
};
