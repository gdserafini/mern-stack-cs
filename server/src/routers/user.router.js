import express from 'express';
import { createUser } from '../controllers/user.controller.js';

const router = express.Router();

router.post('/create', async (req, res) => {
    return res.json(await createUser(req.body));
});

export default router;