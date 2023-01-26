import express from 'express';
import { validBody } from '../middlewares/global.middleware.js';
import { login } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/account', validBody, async (req, res) => {
    try{
        const response = await login(req.body);

        return res.status(response['statusCode'])
            .json(response);
    }
    catch(error){
        return res.json({
            statusCode: 500,
            message: error.message
        });
    }
});

export default router;