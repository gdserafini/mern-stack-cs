import express from 'express';
import { JWT_SECURITY, validBody } from '../middlewares/global.middleware.js';

const router = express.Router();

router.post('/data', JWT_SECURITY, validBody, 
    async (req, res) => {

    try{
        const response = await createNews(req.body);
        logger.info({response: response});

        // return res.status(response['statusCode'])
        //     .json(response);

        return res.json(response);
    }
    catch(error){ 
        logger.error(error);
        return res.status(error['statusCode'])
            .json(errorJson(error));
    };
});

router.get('/data', async (req, res) => {

});

router.put('/data', JWT_SECURITY, validBody, async (req, res) => {

});

export default router;