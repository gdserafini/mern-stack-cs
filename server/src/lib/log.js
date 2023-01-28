import pino from 'pino';
import {isDev} from './env.js';

export default pino ({
    enabled: true,
    level: isDev() ? 'debug' : 'info'
});
