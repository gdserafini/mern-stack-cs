import pino from 'pino';
import {isDev} from './env.js';

export default pino ({
    enabled: true,
    level: process.env.NODE_ENV === 'dev' 
        ? 'debug' : 'info'
});
