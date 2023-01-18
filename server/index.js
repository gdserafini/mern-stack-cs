import express from 'express';
import userRouter from './src/routers/user.router.js';
import { connectDB } from './src/database/db.connect.js';

const app = express();
const PORT = 3000;

connectDB();
app.use(express.json());
app.use('/user', userRouter);

app.listen(PORT, () => console.log(
    `Server running on port ${PORT}.`
));