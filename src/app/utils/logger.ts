import winston from 'winston';
import path from 'path';

// Define log format
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.colorize(),
  winston.format.printf(
    ({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`,
  ),
);

// Create Winston logger
const logger = winston.createLogger({
  level: 'info', // Default log level
  format: logFormat,
  transports: [
    // Log to console
    new winston.transports.Console(),
    // Log to a file
    new winston.transports.File({
      filename: path.join(process.cwd(), 'logs', 'error.log'),
      level: 'error', // Only log errors to this file
    }),
    new winston.transports.File({
      filename: path.join(process.cwd(), 'logs', 'combined.log'),
    }),
  ],
});

export default logger;