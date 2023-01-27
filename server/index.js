import express from 'express';
import { BootstrapDB } from './src/database/prismaMysql.js';
import usersRouter from './src/routers/user.router.js';
import authRouter from './src/routers/auth.router.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { isDev } from './src/lib/env.js';

dotenv.config();

const normalizePort = function(value){
    const port = parseInt(value);

    if(isNaN(port)) return value;
    if(port >= 0) return port;
    return false;
};

const app = express();
const PORT = normalizePort(process.env.PORT || '3000');
const MORGAN_FORMAT = !isDev() ? 'dev' : 
    `:remote-addr :method :url: HTTP/:http-version :status 
    :res[content-length] :response-time ms :user-agent`;

app.set('port', PORT);

//BootstrapDB();
app.use(logger(MORGAN_FORMAT));
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(cookieParser());

app.listen(PORT);
app.use('/user', usersRouter);
app.use('/auth', authRouter);

app.use(ServerError.HANDLERS);
