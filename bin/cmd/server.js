import srv from '../lib/core.js'

export default function server(file, port, host, cb) {
  // Load mod instance.
  let mod

  try {
    mod = require(file).default
  } catch (e) {
    //throw new Error(`${file}" does not exist.`);
    cb(new Error(`${file} does not exist.`));
  }

  if ('function' !== typeof mod) {
    cb(new Error(`${file} does not export a function.`));
    //throw new Error(`${file} does not export a function.`);
  }

  srv(mod).listen(port, host, (err) => {
      if (err) {
          return cb(err.stack);
          //throw new Error(err.stack);
      }
      cb(null);
      //console.log(chalk.green('▼ Ready! Listening on:', chalk.white(`http://${host}:${port}`)));
  });
}
