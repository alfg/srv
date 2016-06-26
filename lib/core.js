import express from 'express';
import logger from './logger';

const app = express();

export default function srv(fn) {
    // Hook in middleware here.
    app.use(require('morgan')({ "stream": logger.stream }));
    app.logger = logger;

    // Base routes.
    app.get('/health-check', (req, res) => {
        res.send('OK')
    })

    // Add mod instance.
    fn(app);

    return app;
}
