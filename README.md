# `▼srv`
WIP

▼ A modern, opinionated and simple microservices stack built on Express.

## Why?
Creating services using the [microservices architecture](http://martinfowler.com/articles/microservices.html) pattern can involve a lot of repeated boilerplate, including server, logging, documentation, transpilation and other middleware.

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
$ npm install -g srv
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
Usage: srv [options] [command]

Commands:

  help  Display help

Options:

  -D, --docs          Generate Docs
  -h, --help          Output usage information
  -H, --host [value]  Host to listen on
  -n, --no-babel      Skip Babel transformation
  -p, --port <n>      Port to listen on
  -v, --version       Output the version number
```

### Generating Documentation
TODO

### Babel
TODO

## Logging
TODO

## CORS
TODO

## Adding Middleware
TODO

## Development
TODO

## TODO
* Caching
* Default Configuration
* Environment Variables


## License
MIT
