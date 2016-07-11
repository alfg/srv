// Sets 'Access-Control-Allow-Origin' CORS header to allow whitelisted
// domains to access API.

// var config = require('../config');

// var whitelist = config.app.allowedOrigins || 'http://127.0.0.1';

const whitelist = [];

export default {
  origin(origin, callback) {
    // If whitelist config is empty, allow all CORS requests.
    if (whitelist.length === 0) {
      return callback(null, true);
    }

    const originIsWhitelisted = whitelist.indexOf(origin) !== -1;
    return callback(null, originIsWhitelisted);
  },
};
