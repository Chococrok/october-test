import express from 'express';
import { format } from 'util';
import CONF from './configuration/global-configuration';
import logger from './configuration/logger';
import { COMPANIES_ROUTE } from './routes';

logger.info('Starting server');
logger.debug(format('Using configuration: ', CONF));

const app = express();

app.use(CONF.CONTEXT_ROOT, COMPANIES_ROUTE);

app.listen(CONF.PORT, () => {
  logger.info(
    `October-test app listening at http://${CONF.HOST}:${CONF.PORT}${CONF.CONTEXT_ROOT}`
  );
});
