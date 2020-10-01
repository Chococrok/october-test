import { ErrorRequestHandler } from 'express';
import logger from '../configuration/logger';
import { HandledRouteError } from './route-error';

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof HandledRouteError) {
    res.status(err.code).send(err);
  } else {
    logger.error(err);
    res.status(500).send('Something broke!');
  }
};
