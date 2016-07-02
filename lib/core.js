import express from 'express';
import logger from './logger';
import cors from 'cors';

const app = express();

export default function srv(fn) {
    // Hook in middleware here.

    // Winston logging.
    app.use(require('morgan')('combined', {stream: logger.stream}));
    app.logger = logger;

    // CORS rules.
    app.use(cors(require('./cors')));

    // Base routes.
    app.get('/health-check', (req, res) => { res.send('HTTP OK') });

    // Static Documentation.
    app.use('/docs', express.static('docs'));

    // Add mod instance.
    fn(app);

    return app;
}
