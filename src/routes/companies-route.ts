import express from 'express';
import rateLimit from 'express-rate-limit';
import CompaniesService from '../services/companies-service';
import logger from '../configuration/logger';

export const COMPANIES_ROUTE = express.Router();

// We will use an api with a limited amount of request
// so we must limit the calls to this route (otherwise IP will be black listed)
const limiter = rateLimit({
  windowMs: 1000,
  max: 1,
});

COMPANIES_ROUTE.use(limiter);
COMPANIES_ROUTE.get('/companies/:name', (req, res, next) => {
  const name = req.params.name;

  logger.debug(`New request asking for company: ${name}`);

  CompaniesService.getPhoneNumber(name)
    .then(company =>
      res.send({ name: name, phoneNumber: company || 'Not found' })
    )
    .catch(next);
});
