import express from 'express';
import {CONSTANTS, GLOBAL_CONFIGURATION} from './configuration'
import { COMPANIES_ROUTE } from './routes';

console.log('Starting server with configuration', GLOBAL_CONFIGURATION);

const app = express();

app.use(CONSTANTS.CONTEXT_ROOT, COMPANIES_ROUTE);

app.listen(GLOBAL_CONFIGURATION.PORT, () => {
  console.log(`Example app listening at http://${GLOBAL_CONFIGURATION.HOST}:${GLOBAL_CONFIGURATION.PORT}`)
})

