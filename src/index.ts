import express from 'express';
import CONF from './configuration/global-configuration';
import { COMPANIES_ROUTE } from './routes';

console.log('Starting server with configuration', CONF);

const app = express();

app.use(CONF.CONTEXT_ROOT, COMPANIES_ROUTE);

app.listen(CONF.PORT, () => {
  console.log(`October-test app listening at http://${CONF.HOST}:${CONF.PORT}`);
});
