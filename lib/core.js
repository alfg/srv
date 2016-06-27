import express from 'express';
import logger from './logger';
import cors from 'cors';
import corsConfig from './cors';

const app = express();

export default function srv(fn) {
    // Hook in middleware here.

    // Winston logging.
    app.use(require('morgan')('combined', {stream: logger.stream}));
    app.logger = logger;

    // CORS
    app.use(cors(corsConfig));

    // Base routes.
    app.get('/health-check', (req, res) => {
        res.send('OK')
    });

    app.use('/docs', express.static('doc'));

    // Add mod instance.
    fn(app);

    return app;
}
