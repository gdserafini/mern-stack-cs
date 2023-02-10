import express from 'express';
import { JWT_SECURITY, validBody, validTitle } 
    from '../middlewares/global.middleware.js';
import logger from '../lib/log.js';
import { errorJson } from '../lib/error.js';
import { createNews, findNews, findAllNews, 
    getLastNews, 
    updateNews} from '../controllers/news.controller.js';

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

router.get('/data', validTitle, async (req, res) => {
    try{
        const { title } = req;
        const response = await findNews('title', title);
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

router.get('/all', async (req, res) => {
    try{
        let {limit, offset, order} = req.query;
        logger.debug({reqGetAllQuery: {limit, offset}});

        limit = parseInt(limit);
        offset = parseInt(offset);

        if(!limit) limit = 10;
        if(!offset) offset = 0;
        if(!order) order = 'asc'

        const response = await findAllNews(
            limit, offset, order);
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

router.put('/data', JWT_SECURITY, validBody, 
    validTitle, async (req, res) => {
    try{
        const response = await updateNews(req.title, req.body);
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

router.get('/last', async (req, res) => {
    try{
        const response = await getLastNews();
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

router.get('/by-user', JWT_SECURITY, async (req, res) => {
    try{
        const {userId} = req;
        let {limit, offset, order} = req.query;
        logger.debug({reqGetAllQuery: {limit, offset}});

        limit = parseInt(limit);
        offset = parseInt(offset);

        if(!limit) limit = 10;
        if(!offset) offset = 0;
        if(!order) order = 'asc'

        const response = await findAllNews(
            limit, offset, order, 'userId', userId);

        return res.status(response['statusCode'])
            .json(response);
    }
    catch(error){
        logger.error(error);

        return res.sendStatus(error['statusCode'])
            .json(errorJson(error));
    }
});

router.put('/data', validBody, JWT_SECURITY, 
    async (req, res) => {

    try{
        const response = await updateNews(req.body);

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