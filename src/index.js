import winston from 'winston';
import app from './app';
import keys from './utils/config.utilities';


const port = keys.port || 3000;
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console()
  ]
});


app.listen(port, () => logger.info(`Application running on port ${port}`));
