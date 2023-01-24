import express from 'express';
import { createUser, findUser } from '../controllers/users.controller.js';

const router = express.Router();

router.post('/account', async (req, res) => {
    return res.json(await createUser(req.body));
});

router.get('/info/:id', async (req, res) => {
    return res.json(await findUser(req.params.id));
});

export default router;