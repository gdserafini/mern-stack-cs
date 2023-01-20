import express from 'express';
import { connectDB } from './src/database/db.connect.js';
import userRouter from './src/routers/user.router.js'
import { testGet } from './src/routers/user.router.js';

const normalizePort = function(value){
    const port = parseInt(value);

    if(isNaN(port)) return value;
    if(port >= 0) return port;
    return false;
}

const app = express();
const PORT = normalizePort(process.env.PORT || '3000');

app.set('port', PORT);

connectDB();
app.use(express.json());

app.listen(PORT);
//app.use('/user', userRouter);
app.use('/user/info/:id', testGet);
