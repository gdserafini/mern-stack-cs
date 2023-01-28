import express from 'express';
import { createUser, findUser, updateUserData } from '../controllers/users.controller.js';
import { validId, validBody} from '../middlewares/global.middleware.js';
import { errorJson } from '../lib/error.js';
import logger from '../lib/log.js';

const router = express.Router();

router.post('/account', validBody, async (req, res) => {

    try{
        const response = await createUser(req.body);
        logger.info({response: response});

        return res.status(response['statusCode'])
            .json(response);
    }
    catch(error){ 
        logger.error(error);
        return res.status(error['statusCode'])
            .json(errorJson(error));
    };
});

router.get('/data/:id', validId, async (req, res) => {
    try{
        const response = await findUser(
            req.params.id
        );
        logger.info({response: response});

        return res.status(response['statusCode'])
            .json(response);
    }
    catch(error){ 
        logger.error(error);
        return res.status(error['statusCode'])
            .json(errorJson(error));
    };
});

router.put('/account/data/:id', validId, 
    validBody, async (req, res) => {

    try{
        const response = await updateUserData(
            req.params.id, req.body
        );
        logger.info({response: response});

        return res.status(response['statusCode'])
            .json(response);
    }
    catch(error){
        logger.error(error);
        return res.status(error['statusCode'])
            .json(errorJson(error));
    };
});

export default router;