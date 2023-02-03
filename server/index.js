import express from 'express';
import { BootstrapDB } from './src/database/prismaMysql.js';
import usersRouter from './src/routers/user.router.js';
import authRouter from './src/routers/auth.router.js';
import newsRouter from './src/routers/news.router.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import logger from './src/lib/log.js';
import { errorJson } from './src/lib/error.js';

dotenv.config();

const normalizePort = function(value){
    const port = parseInt(value);

    if(isNaN(port)) return value;
    if(port >= 0) return port;
    return false;
};

const app = express();
const PORT = normalizePort(process.env.PORT || '3001');

app.set('port', PORT);

app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(cookieParser());

app.listen(PORT, () => {
    logger.info('Server connected.');
    BootstrapDB().catch(error => {
        logger.error(error);
        process.exit();
    });
});
app.on('error', () => {
    logger.info('Server error');
    process.exit();
})
app.use('/user', usersRouter);
app.use('/auth', authRouter);
app.use('/news', newsRouter);
