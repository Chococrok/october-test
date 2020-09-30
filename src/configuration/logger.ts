import util from 'util';
import winston, { format } from 'winston';
import { FileConfiguration } from './configuration-file-schema';

const consoleTransport = new winston.transports.Console({ level: 'info' });

export function setLogLevel(logLevel: FileConfiguration['logLevel']) {
  consoleTransport.level = logLevel;
}

const customFormat = format.printf(info => {
  return `${info.timestamp} [${info.level.toUpperCase()}] ${util.format(
    info.message
  )}`;
});

export default winston.createLogger({
  transports: consoleTransport,
  format: format.combine(format.timestamp(), customFormat),
}) as Readonly<winston.Logger>;
