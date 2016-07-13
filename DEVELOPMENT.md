# Development

## Install
`srv` is developed and tested on NodeJS 6+, but is published via babel to work with v0.12+. Gulp is the build tool used for transpiling ES2015 and linting.

[nvm](https://github.com/creationix/nvm) is recommended for Node version management.

```bash
$ nvm use 6  # Optional.
$ git clone git@github.com:alfg/srv.git
$ npm install -g gulp
$ cd srv && npm install
$ gulp build && node build/srv examples/hello.js
```

[nodemon](https://github.com/remy/nodemon) is recommended for auto-restarting server on code changes during development. Then you can `gulp watch` to re-transpile code and nodemon will restart the server.

```bash
$ gulp watch  # Tab 1
$ nodemon build/srv examples/hello.js  # Tab 2
```


## Contributing
A few simple rules to follow before sending any pull requests:

* Document your code where necessary
* Use simple, but descriptive commit messages
* Lint and test your code
* Feature Requests
* Provide an example in `examples/` if necessary
* Lets try to keep `srv` a minimal footprint.
* If you're unsure of adding an enhancement, fix or feature, feel free to submit an issue to ask.


## EditorConfig
This project uses [EditorConfig](http://editorconfig.org/) to maintain a consistent coding style.

Please install one of the plugins for your editor at: http://editorconfig.org/#download


## Linting
This project follows the [Airbnb Style Guide](https://github.com/airbnb/javascript) via [ESLint](http://eslint.org/) using the [eslint-config-airbnb-base](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb-base) package.

Run `gulp lint` to check for linting errors before sending a Pull Request.


## Testing
TODO


## TODO
* Tests
* Caching lib (node-cache?)
* Default config template
* Environment Variables
  * https://github.com/indexzero/nconf
  * https://github.com/motdotla/dotenv
  * https://github.com/lorenwest/node-config


## Resources
* https://github.com/alfg/srv
* http://apidocjs.com/#params
* http://eslint.org/
* http://babeljs.io/docs/plugins/preset-es2015/
* https://github.com/winstonjs/winston
* https://github.com/expressjs/cors
* http://editorconfig.org/
* http://gulpjs.com/