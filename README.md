# `▼srv`
> A modern, opinionated and simple microservices stack built on Express.

![npm-version](https://img.shields.io/npm/v/srv-cli.svg)
![dependencies](https://david-dm.org/alfg/srv.svg)
[![Build Status](https://travis-ci.org/alfg/srv.svg?branch=master)](https://travis-ci.org/alfg/srv)
[![Coverage Status](https://coveralls.io/repos/github/alfg/srv/badge.svg?branch=master)](https://coveralls.io/github/alfg/srv?branch=master)

## Why?
Creating services using the [microservices architecture](http://martinfowler.com/articles/microservices.html) pattern can involve a lot of repeated boilerplate code including server, logging, documentation, transpilation and other middleware.

`srv` helps combine the common boilerplate code, while allowing you to extend as needed.

## Features
* Minimal CLI + Framework over Express
* Babel Transpilation
* Logging
* RESTful Documentation Generation
* CORS
* Linting (eslint)

## Included Modules
* [Express](http://expressjs.com/) &mdash; Minimalist web framework
* [Babel](https://babeljs.io/) &mdash; Javascript Transpilation.
* [Winston Logging](https://github.com/winstonjs/winston) &mdash; A multi-transport async logging library for node.js.
* [apiDoc](http://apidocjs.com) &mdash; Inline Documentation for RESTful web APIs.
* [ESLint](http://eslint.org/) &mdash; Linting utility.
* [dotenv](https://github.com/motdotla/dotenv) &mdash; Environment variables.

## Install
```
$ npm install -g srv-cli
$ srv --help
```

or local (without bin symlink):
```
$ npm install srv-cli --no-bin-links
$ node node_modules/srv-cli/build/srv --help
```

## Example
Create `hello.js` with a default export:
```javascript
export default function hello(app) {
    app.get('/hello', (req, res) => {
        res.send("Hello world!");
    })
}
```
The `express` context will be passed into the default export, giving you full access to the express API. No need to write any express boilerplate code.

You can run the application directly with `srv`:
```
$ srv hello.js

▼ Babel transpiled.
▼ Ready! Listening on: http://0.0.0.0:3000
```

Any ES2015 code will automatically be transpiled (via babel), then served at the default host + port. See the CLI Reference for more options and features.

## CLI Reference
```
$ srv --help
Usage: srv entrypoint.js [options]

Options:

  -h, --help            output usage information
  -V, --version         output the version number
  -p, --port [n]        Port to listen on
  -H, --host [value]    Host to listen on
  -D, --docs [value]    Generate Docs from folder
  -L, --lint            Lint code with ESLint
  -n, --no-babel        Skip Babel transformation
  -C, --config [value]  Configuration file
```

### Generating Documentation
RESTful documentation generation is based on [apiDoc](http://apidocjs.com/) params. See [example/hello.js](examples/hello.js) for an example.

Run the following command to generate documentation:
```
$ srv entrypoint.js --docs examples
```

`examples` - Generate Docs from folder.

View docs at: http://0.0.0.0:3000/docs

Refer to http://apidocjs.com/#params for supported apiDoc params.


### Babel/ES6
By default, `srv` will transpile the entrypoint file (via babel) its dependencies with the es2015 preset. No need to setup babel yourself, it works out of the box!

See https://babeljs.io/docs/plugins/preset-es2015/ for supported plugins loaded by preset-es2015.

You can disable the transpilation by providing the `--no-babel` flag.


## Logging
[Winston](https://github.com/winstonjs/winston) logging transport is enabled by default and will log all http `info` logs to `logs/` and all console `debug` logs to stdout.

You can also call the logging instance directly via the `express.logger` context.

See [examples/hello.js](examples/hello.js) for an example.


## CORS
[CORS](http://enable-cors.org/) middleware is enabled for all requests by default (via [express-cors](https://github.com/expressjs/cors))

You can configure whitelisted domains in the default configuration.

## Configuration
Configuration defaults are set on [default.json](default.json). You can add, extend or override these defaults by creating your own configuration file (as json) and use the `--config` flag when running `srv`.

```
$ srv examples/hello.js --config custom.json
```

This will use `default.json` as a base config and extend using your provided configuration.

## Environment Variables
srv uses [dotenv](https://github.com/motdotla/dotenv) to load environment varaibles from a `.env` file into `process.env`.

Just create a `.env` file in the root directory of your project. Add environment-specific variables on new lines in the form of `NAME=VALUE`. For example:

```
DB_HOST=localhost
DB_USER=root
DB_PASS=s1mpl3
```

That's it.

`process.env` now has the keys and values you defined in your `.env` file.

```javascript
db.connect({
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS
});
```

This makes it easy for development, but it is not recommended to add your `.env` files into VCS.

## Linting
srv uses [ESLint](http://eslint.org) to lint your code using the `airbnb-base` config.

To eslint your code, just use the `--lint` flag:
```
$ srv examples/hello.js --lint
```

If you wish to update the default profile, you can set  `lint` options on your custom configuration.

```javascript
  "lint": {
    "rules": {
        "extends": "airbnb-base",
    }
  }
```

## Adding Middleware
Adding extra middleware is easy. Simply export a middleware function in your entrypoint file containing your middleware loaders.

Example:
```
export function middleware(app) {
  app.use(awesomeMiddleware);
  app.use(anotherMiddleware);
}
```

See [examples/middleware-example.js](examples/middleware-example.js) for an example.

## Contributing
See: [CONTRIBUTING.md](CONTRIBUTING.md)

## Change Log
See: [CHANGELOG.md](CHANGELOG.md)

## License
See: [LICENSE](LICENSE)
