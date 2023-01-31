import express from 'express';
import { JWT_SECURITY, validBody, validTitle } 
    from '../middlewares/global.middleware.js';
import { createNews } from '../controllers/news.controller.js';
import logger from '../lib/log.js';
import { errorJson } from '../lib/error.js';
import { findNews, findAllNews } from '../controllers/news.controller.js';

const router = express.Router();

router.post('/data', JWT_SECURITY, validBody, 
    async (req, res) => {

    try{
        const response = await createNews(req.body);
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

router.get('/data/:title', validTitle, async (req, res) => {
    try{
        const response = await findNews(req.params.title);
        logger.info({response: response});

        return res.status(response['statusCode'])
            .json(response);
    }
    catch(error){
        logger.error(error);

        return res.sendStatus(error['statusCode'])
            .json(errorJson(error));
    }
});

router.get('/data/all', async (req, res) => {
    try{
        const response = await findAllNews();
        logger.info({response: response});

        return res.status(response['statusCode'])
            .json(response);
    }
    catch(error){
        logger.error(error);

        return res.sendStatus(error['statusCode'])
            .json(errorJson(error));
    }
});

router.put('/data/:title', JWT_SECURITY, validBody, 
    validTitle, async (req, res) => {
    try{
        const response = await updateNews(req.params.title, req.body);
        logger.info({response: response});

        return res.status(response['statusCode'])
            .json(response);
    }
    catch(error){
        logger.error(error);

        return res.sendStatus(error['statusCode'])
            .json(errorJson(error));
    }
});

export default router;