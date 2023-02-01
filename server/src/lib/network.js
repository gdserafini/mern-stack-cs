import axios from 'axios';
import logger from './log.js';

export const newAxios = function(params){
    const instance = axios.create(params);

    instance.interceptors.request.use(
        req => { 
            logger.debug(req['data']);
            return req;
        }
    );

    instance.interceptors.response.use(
        resp => { 
            logger.debug(resp['data']);
            return resp;
        }
    );

    return instance;
};