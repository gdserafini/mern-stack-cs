import express from 'express';
import { createUser, findUser, updateUserData } from '../controllers/users.controller.js';
import { validId, validBody} from '../middlewares/global.middleware.js';

const router = express.Router();

router.post('/account', validBody, async (req, res) => {

    try{
        return res.json(await createUser(
            req.body
        ));
    }
    catch(error){ return {
        statusCode: 500,
        message: 'Server error.'
    };};
});

router.get('/data/:id', validId, async (req, res) => {

    try{
        return res.json(await findUser(
            req.params.id
        ));
    }
    catch(error){ return {
        statusCode: 500,
        message: 'Server error.'
    };};
});

router.put('/account/data/:id', validId, validBody,
    async (req, res) => {

    try{
        return res.json(await updateUserData(
            req.params.id, req.body
        ));
    }
    catch(error){
        return {
            statusCode: 500,
            message: 'Server error.'
        };
    };
});

export default router;