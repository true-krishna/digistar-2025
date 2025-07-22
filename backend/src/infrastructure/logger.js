const winston = require('winston');
const path = require('path');
const fs = require('fs');

// Use project-local logs folder
const logDir = path.join(__dirname, '..', '..', 'logs');
const logFile = 'node-app.log';
const fullPath = path.join(logDir, logFile);

// Ensure logs directory and file exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}
if (!fs.existsSync(fullPath)) {
  fs.writeFileSync(fullPath, '');
}

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ level, message, timestamp }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    })
  ),
  transports: [
    new winston.transports.File({ filename: fullPath }),
    new winston.transports.Console()
  ],
});

module.exports = logger;

