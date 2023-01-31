import pino from 'pino';

export default pino ({
    enabled: true,
    level: process.env.NODE_ENV === 'dev' 
        ? 'debug' : 'info'
});
