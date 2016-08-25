import express from 'express';
import morgan from 'morgan';

import logger from './logger';
import cors from './cors';
import middleware from './middleware';


export default function srv(fn, opt) {
  // Express app.
  const app = express();

  // Hook in middleware if provided export.
  if (fn) middleware(fn.middleware, app);

  // Winston logging.
  const log = logger(opt.logging);
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
  if (typeof fn === 'function') {
    fn(app);
  } else if (fn && typeof fn.default === 'function') {
    fn.default(app);
  }

  return app;
}
