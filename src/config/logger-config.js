const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;

const customFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} : ${level} : ${message}`;
});

const logger = createLogger({
  format: combine(
    timestamp({format : 'DD-MM-YYYY HH-MM-SS'}),
    customFormat
  ),
  transports: [
    new transports.Console(),
    new transports.File({filename : 'combine.log'})
]
});

module.exports = logger;