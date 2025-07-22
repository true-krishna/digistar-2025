const logger = require('../../infrastructure/logger');

function requestLogger(req, res, next) {
  logger.info(`${req.method} ${req.originalUrl} - ${req.ip}`);
  next();
}

module.exports = requestLogger;

