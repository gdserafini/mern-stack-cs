import express from 'express';
import { BootstrapDB } from './src/database/prismaMysql.js';
import usersRouter from './src/routers/user.router.js';
import authRouter from './src/routers/auth.router.js';
import dotenv from 'dotenv';

dotenv.config();

const normalizePort = function(value){
    const port = parseInt(value);

    if(isNaN(port)) return value;
    if(port >= 0) return port;
    return false;
}

const app = express();
const PORT = normalizePort(process.env.PORT || '3000');

app.set('port', PORT);

//BootstrapDB();
app.use(express.json());

app.listen(PORT);
app.use('/user', usersRouter);
app.use('/auth', authRouter);
