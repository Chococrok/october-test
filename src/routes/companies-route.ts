import express from 'express';
import rateLimit from 'express-rate-limit';
import CompaniesService from '../services/companies-service';
import logger from '../configuration/logger';
import { HandledRouteError } from './route-error';

export const COMPANIES_ROUTE = express.Router();

// We will use an api with a limited amount of request
// so we must limit the calls to this route (otherwise IP will be black listed)
const limiter = rateLimit({
  windowMs: 1000,
  max: 1,
});

type availableQueryParamsType = {
  name: string;
  siret: string;
  siren: string;
  adress: string;
};

const AVAILABLE_QUERY_PARAMS = ['name', 'siret', 'siren', 'adress'];

COMPANIES_ROUTE.use(limiter);
COMPANIES_ROUTE.get('/companies', (req, res, next) => {
  const params = req.query as availableQueryParamsType;

  for (const key of Object.keys(params)) {
    if (!AVAILABLE_QUERY_PARAMS.includes(key)) {
      next(new HandledRouteError(400, `query parameter ${key} unknown`));
      return;
    }
  }

  logger.debug(`New request asking for company: ${params.name}`);

  CompaniesService.getPhoneNumber(params)
    .then(company => res.send(company))
    .catch(next);
});
