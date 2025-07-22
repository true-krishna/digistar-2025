const app = require('./app');
const logger = require('./infrastructure/logger');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  logger.info('Server started on port 3000');
});

