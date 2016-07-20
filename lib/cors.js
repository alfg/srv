// Sets 'Access-Control-Allow-Origin' CORS header to allow whitelisted
// domains to access API.

import cors from 'cors';


export default function (opt) {
  const whitelist = opt.allowedOrigins || [];

  const config = {

    origin(origin, callback) {
      // If whitelist config is empty, allow all CORS requests.
      if (whitelist.length === 0) {
        return callback(null, true);
      }

      const originIsWhitelisted = whitelist.indexOf(origin) !== -1;
      return callback(null, originIsWhitelisted);
    },
  };

  return {
    cors: cors(config),
  };
}
