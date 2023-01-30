import { BadRequest, ServerError, errorJson } from "../lib/error.js";
import logger from '../lib/log.js';

export const validId = function(req, res, next){
    try{
        const id = parseInt(req.params.id);

        ServerError.throwIf(isNaN(id) || id <= 0 || !id, 
            'Invalid user id.', BadRequest
        );

        logger.debug({validId: id});

        req.params.id = id;

        next();
    }
    catch(error){
        logger.error(error);
        return res.status(error['statusCode'])
            .json(errorJson(error));
    };
};

export const validBody = function(req, res, next){
    try {
        ServerError.throwIf(!req.body,
            'Missing body', BadRequest
        );

        logger.debug({validBody: req.body});

        const params = Object.keys(req.body);

        ServerError.throwIf(params.length === 0,
            'Empty body', BadRequest    
        );

        logger.debug({validBodyParams: params});

        next();
    } 
    catch(error) {
        logger.error(error);
        return res.status(error['statusCode'])
            .json(errorJson(error));
    };
};

export const JWT_SECURITY = async function(req, res, next){
    //get id from jwt token
    req.body.userId = 13;
    next();
};