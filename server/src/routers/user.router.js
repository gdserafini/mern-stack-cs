import express from 'express';
import { createUser, findUser, updateUserData } from '../controllers/users.controller.js';
import { validId, validBody} from '../middlewares/global.middleware.js';
import { errorJson } from '../lib/error.js';

const router = express.Router();

router.post('/account', validBody, async (req, res) => {

    try{
        return res.json(await createUser(
            req.body
        ));
    }
    catch(error){ return res.json({
            statusCode: 500,
            message: error.message
        });
    };
});

router.get('/data/:id', validId, async (req, res) => {
    try{
        const response = await findUser(
            req.params.id
        );

        return res.status(response['statusCode'])
            .json(response);
    }
    catch(error){ 
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

        return res.status(response['statusCode'])
            .json(response);
    }
    catch(error){
        return res.status(error['statusCode'])
            .json(errorJson(error));
    };
});

export default router;