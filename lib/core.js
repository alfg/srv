import express from 'express';
import morgan from 'morgan';

import logger from './logger';
import cors from './cors';


export default function srv(fn, opt) {
  // Express app.
  const app = express();

  // Hook in middleware here.

  // Winston logging.
  const log = logger(opt);
  app.use(morgan('combined', { stream: log.stream }));
  app.log = log.logger;  // Add to express app context.

  // CORS rules.
  const origin = cors(opt.cors);
  app.use(origin.cors);

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
