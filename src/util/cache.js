const server = require('../server');

module.exports.getCache = async key => {
  try {
    // Get cache
    const value = await server.apiCache.get(key);
    return value;
  } catch (err) {
    throw err;
  }
};

module.exports.setCache = async (key, data) => {
  try {
    // Set cache
    await server.apiCache.set(key, data);
  } catch (err) {
    throw err;
  }
};

module.exports.dropCache = async key => {
  try {
    // Drop cache
    await server.apiCache.drop(key);
  } catch (err) {
    throw err;
  }
};
