import srv from '../lib/core.js';  // eslint-disable-line import/no-unresolved

export default function server(file, port, host, config, cb) {
  // Load mod instance.
  let mod;

  try {
    mod = require(file).default;  // eslint-disable-line global-require
  } catch (e) {
    cb(new Error(`${file} does not exist.`));
  }

  if (typeof mod !== 'function') {
    cb(new Error(`${file} does not export a function.`));
  }

  srv(mod, config).listen(port, host, (err) => {
    if (err) {
      return cb(err.stack);
    }
    return cb(null);
  });
}
