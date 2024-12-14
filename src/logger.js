// logger.js
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',  // Log level can be 'info', 'warn', 'error', etc.
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}]: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console({ format: winston.format.simple() }),  // Log to console
    new winston.transports.File({ filename: 'logs/application.log' })  // Log to file
  ]
});
import fs from 'fs';
import path from 'path';

const logFilePath = path.join('C:', 'Users', 'gouja', 'coworking', 'coworking_project', 'back_end', 'logs', 'application.log');

// Ensure the log directory exists
const logDirectory = path.dirname(logFilePath);
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory, { recursive: true });
}

// Logger function
export const logToFile = (message) => {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}\n`;
  fs.appendFileSync(logFilePath, logMessage, 'utf8');
};

// Avant (ESM)
export const logMessage = (msg) => {
  console.log(msg);
};

// Après (CommonJS)


export default logger;
