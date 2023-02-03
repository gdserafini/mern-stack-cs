import { BadRequest, ServerError, errorJson, 
    Unauthorized } from "../lib/error.js";
import logger from '../lib/log.js';
import jwt from 'jsonwebtoken';

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

    try{
        const {authorization} = req.headers;
        logger.debug({authorizationJwt: authorization});

        ServerError.throwIf(!authorization, 
            'Unauthorized', Unauthorized);

        const [bearer, token] = authorization.split(" ");
        logger.debug({partsJwt: {bearer, token}});

        ServerError
            .throwIf((!bearer || !token), 'Missing data.', Unauthorized)
            .throwIf(bearer !== 'Bearer', 'Invalid schema', BadRequest);

        jwt.verify(token, process.env.SECRET, 
            async (error, decoded) => {
                logger.debug({intoJwtVerify: {error, decoded}});

                ServerError.throwIf(error, 
                    'Internal server error', ServerError);
                
                req['userType'] = decoded['type'];
                req['userId'] = decoded['id'];

                logger.debug({reqJwt: {
                    userType: req['userType'], userId: req['userId']
                }});

                return next();
        });
    }
    catch(error){
        logger.error(error);
        return res.status(error['statusCode'])
            .json(errorJson(error));
    }
};

export const isAdmin = function(req, res, next){
    try{
        ServerError.throwIf(req['userType'] !== 'ADMIN',
            'Unauthorized - not a admin.', Unauthorized);

        next();
    }
    catch(error){
        logger.error(error);

        return res.status(error['statusCode'])
            .json(errorJson(error));
    };
}

const urlRegex = /(^((\w+-)+\w+$){1})|(^(\w+$){1})/;

const validTitleFormat = function(title){
    return urlRegex.test(title);
};

export const validTitle = function(req, res, next){
    try{
        const {title} = req.query;
        logger.debug({titleReqMiddleware: title});

        ServerError
            .throwIf(!title, 'Missing title.', BadRequest)
            .throwIf(!validTitleFormat(title), 
                'Invalid title format.', BadRequest);

        req.title = title.replace("-", " ");

        next();   
    }
    catch(error){
        logger.error(error);
        return res.status(error['statusCode'])
            .json(errorJson(error));
    } 
};