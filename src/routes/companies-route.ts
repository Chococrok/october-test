import express from 'express';
import rateLimit from 'express-rate-limit';
import CompaniesClient from '../clients/companies-client';

export const COMPANIES_ROUTE = express.Router();

// We will use an api with a limited amount of request
// so we must limit the calls to this route (otherwise IP will be black listed)
const limiter = rateLimit({
  windowMs: 1000,
  max: 1,
});

COMPANIES_ROUTE.use(limiter);
COMPANIES_ROUTE.get('/companies/:name', async (req, res) => {
  const company = await CompaniesClient.getCompanies(req.params.name);
  res.send({ name: req.params.name, phoneNumber: company });
});
