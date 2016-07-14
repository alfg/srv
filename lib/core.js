import express from 'express';
import logger from './logger';
import cors from 'cors';
import corsConfig from './cors';
import morgan from 'morgan';


export default function srv(fn) {
  // Express app.
  const app = express();

  // Hook in middleware here.

  // Winston logging.
  app.use(morgan('combined', { stream: logger.stream }));
  app.logger = logger;

  // CORS rules.
  app.use(cors(corsConfig));

  // Base routes.
  app.get('/health-check', (req, res) => { res.send('HTTP OK'); });

  // Static Documentation.
  app.use('/docs', express.static('docs'));

  // Add mod instance.
  if (fn !== null || fn !== 'undefined') {
    if (typeof fn === 'function') {
      fn(app);
    }
  }

  return app;
}
