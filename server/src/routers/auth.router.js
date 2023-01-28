import express from 'express';
import { validBody } from '../middlewares/global.middleware.js';
import { login } from '../controllers/auth.controller.js';
import logger from '../lib/log.js';
import { errorJson } from '../lib/error.js';

const router = express.Router();

router.post('/account', validBody, async (req, res) => {
    try{
        const response = await login(req.body);
        logger.info({response: response});

        return res.status(response['statusCode'])
            .json(response);
    }
    catch(error){
        logger.error(error);
        return res.status(error['statusCode'])
            .json(errorJson(error));
    }
});

export default router;