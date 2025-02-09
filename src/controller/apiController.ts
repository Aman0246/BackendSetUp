import { Request, Response, NextFunction } from 'express';
import httpResponse from '../utils/httpResponse';
import httpError from '../utils/httpError';
import responseMessage from '../constants/responseMessage';
import logger from '../utils/logger';

export default {
    self: (req: Request, res: Response, next: NextFunction) => {
        try {
            httpResponse(req, res, 200, responseMessage.SUCCESS)
        } catch (error) {
            httpError(next, error, req, 500)
        }

    },

    postSelef: (req: Request, _: Response, next: NextFunction) => {
        try {
            throw new Error('This is a test error');
        } catch (error) {

            logger.error('TEST_ERROR', { meta: error });

            httpError(next, error, req, 500);
        }
    }



}