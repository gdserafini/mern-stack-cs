import express from 'express';
import { JWT_SECURITY, validBody, validId, validTitle } 
    from '../middlewares/global.middleware.js';
import logger from '../lib/log.js';
import { errorJson } from '../lib/error.js';
import { createNews, findNews, findAllNews, 
    getLastNews, updateNews, addInfo, deleteInfo} from '../controllers/news.controller.js';

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
        logger.info(`News router - GET/by-user - resp: ${response}`);

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
        logger.debug(`News router - PUT/data - params: ${req.body}`);

        const response = await updateNews(req.body);
        logger.info(`News router - PUT/data - resp: ${response}`);

        return res.status(response['statusCode'])
            .json(response);
    }
    catch(error){
        logger.error(error);

        return res.sendStatus(error['statusCode'])
            .json(errorJson(error));
    };
});

router.delete('/:id', validId, JWT_SECURITY,
    async (req, res) => {

        try{
            logger.debug(`News router - POST/like:id - params: ${req.params.id}`);

            const response = await deleteNews(req.params.id);
            logger.info(`News router - DELETE/:id - resp: ${response}`);
    
            return res.status(response['statusCode'])
                .json(response);
        }
        catch(error){
            logger.error(error);
    
            return res.sendStatus(error['statusCode'])
                .json(errorJson(error));
        }

});

router.post('/like/:id', validId, JWT_SECURITY, 
    async (req, res) => {

    try{
        const {userId} = req;
        const newId = parseInt(req.params.id);
        logger.debug(`News router - POST/like:id - param: ${userId}, ${newId}`);

        const response = await addInfo(newId, 13, 'likes');
        logger.info(`News router - POST/like:id - resp: ${response}`);
    
        return res.status(response['statusCode'])
            .json(response);
    }
    catch(error){
        logger.error(error);
    
        return res.sendStatus(error['statusCode'])
            .json(errorJson(error));
    };
});

router.delete('/like/:id', validId, JWT_SECURITY, 
    async (req, res) => {

    try{
        const id = parseInt(req.params.id);
        logger.debug(`News router - DELETE/like:id - params: ${id}`);

        const response = await deleteInfo(id, 'likes');
        logger.info(`News router - DELETE/like:id - resp: ${response}`);

        return res.status(response['statusCode'])
            .json(response);
    }
    catch(error){
        logger.error(error);
    
        return res.sendStatus(error['statusCode'])
            .json(errorJson(error));
    };
});

router.post('/comment/:id', validId, validBody, JWT_SECURITY, 
        async (req, res) => {

    try{
        const {userId} = req;
        const newId = parseInt(req.params.id);
        const {text} = req.body;
        logger.debug(`News router - POST/comment:id - params: ${userId} ,${newId}, ${text}`);

        const response = await addInfo(
            newId, userId, 'comments', text);
        logger.info(`News router - POST/comment:id - resp: ${response}`);
    
        return res.status(response['statusCode'])
            .json(response);
    }
    catch(error){
        logger.error(error);
    
        return res.sendStatus(error['statusCode'])
            .json(errorJson(error));
    };
});

router.delete('/comment:id', validId, JWT_SECURITY, 
    async (req, res) => {

    try{
        const id = parseInt(req.params.id);
        logger.debug(`News router - DELET/comment:id - params: ${response}`);

        const response = await deleteInfo(id, 'comments');
        logger.info(`News router - DELETE/comment:id - resp: ${response}`);

        return res.status(response['statusCode'])
            .json(response);
    }
    catch(error){
        logger.error(error);
    
        return res.sendStatus(error['statusCode'])
            .json(errorJson(error));
    };
});

export default router;