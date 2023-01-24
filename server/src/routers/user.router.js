import express from 'express';
import { createUser, findUser } from '../controllers/users.controller.js';

const router = express.Router();

router.post('/account', async (req, res) => {
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

router.get('/info/:id', async (req, res) => {
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

export default router;