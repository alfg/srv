# `▼srv`
▼ A modern, opinionated and simple microservices stack built on Express.

**Currently a work-in-progress project!**

![npm-version](https://img.shields.io/npm/v/srv-cli.svg)
[![Build Status](https://travis-ci.org/alfg/srv.svg?branch=master)](https://travis-ci.org/alfg/srv)

## Why?
Creating services using the [microservices architecture](http://martinfowler.com/articles/microservices.html) pattern can involve a lot of repeated boilerplate code including server, logging, documentation, transpilation and other middleware.

`srv` helps combine the common boilerplate code, while allowing you to extend as needed.

## Features
* Minimal CLI + Framework over Express
* Babel Transpilation
* Logging
* RESTful Documentation Generation
* CORS configuration

## Included Modules
* [Express](http://expressjs.com/) &mdash; Minimalist web framework
* [Babel](https://babeljs.io/) &mdash; Javascript Transpilation.
* [Winston Logging](https://github.com/winstonjs/winston) &mdash; A multi-transport async logging library for node.js.
* [apiDoc](http://apidocjs.com) &mdash; Inline Documentation for RESTful web APIs.

## Install
```
$ npm install -g srv-cli
$ srv --help
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
Usage: srv [options] [command] entrypoint.js

Commands:

  help  Display help

Options:

  -D, --docs [value]  Generate Docs from folder
  -h, --help          Output usage information
  -H, --host [value]  Host to listen on
  -n, --no-babel      Skip Babel transformation
  -p, --port <n>      Port to listen on
  -v, --version       Output the version number
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


## Logging
[Winston](https://github.com/winstonjs/winston) logging transport is enabled by default and will log all http `info` logs to `logs/` and all console `debug` logs to stdout.

You can also call the logging instance directly via the `express.logger` context.

See [examples/hello.js](examples/hello.js) for an example.


## CORS
[CORS](http://enable-cors.org/) middleware is enabled for all requests by default (via [express-cors](https://github.com/expressjs/cors))

You can configure whitelisted domains in the default configuration.

## Adding Middleware
TODO

## Development
See: [DEVELOPMENT.md](DEVELOPMENT.md)

## License
MIT
