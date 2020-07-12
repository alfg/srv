import fs from 'fs';
import winston from 'winston';

export default function (opt) {
  const logs = opt.logs || './logs';

  if (!fs.existsSync(logs)) {
    fs.mkdirSync(logs);
  }

  const logger = winston.createLogger({
    transports: [
      new winston.transports.File({
        level: 'info',
        filename: `./${logs}/all-logs.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: false,
      }),
      new winston.transports.Console({
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true,
      }),
    ],
    exitOnError: false,
  });

  const stream = {
    write(message) {
      logger.info(message);
    },
  };

  return {
    logger,
    stream,
  };
}
