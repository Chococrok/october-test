import express from 'express';
import rateLimit from 'express-rate-limit';

export const COMPANIES_ROUTE = express.Router();

// We will use an api with a limited amount of request 
// so we must limit the calls to this route (otherwise IP will be black listed)
const limiter = rateLimit({
    windowMs: 1000,
    max: 1,
})

COMPANIES_ROUTE.use(limiter);
COMPANIES_ROUTE.get('/companies/:name', (req, res) => {
    res.send({name: req.params.name, phoneNumber: '+336 66 66 66 66'});
});