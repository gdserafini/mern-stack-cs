import express from 'express';
import { validBody } from '../middlewares/global.middleware.js';

const router = express.Router();

router.post('/account', validBody, async (req, res) => {
    try{
        return res.json(await login(req.body));
    }
    catch(error){
        return res.json({
            statusCode: 500,
            message: error.message
        });
    }
});

export default router;