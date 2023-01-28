import { BadRequest, ServerError, errorJson } from "../lib/error.js";

export const validId = function(req, res, next){
    try{
        const id = parseInt(req.params.id);

        ServerError.throwIf(isNaN(id) || id <= 0 || !id, 
            'Invalid user id.', BadRequest
        );

        req.params.id = id;

        next();
    }
    catch(error){
        return res.status(error['statusCode'])
            .json(errorJson(error));
    };
};

export const validBody = function(req, res, next){
    try {
        ServerError.throwIf(!req.body,
            'Missing body', BadRequest
        );

        const params = Object.keys(req.body);

        ServerError.throwIf(params.length === 0,
            'Empty body', BadRequest    
        );

        next();
    } 
    catch(error) {
        return res.status(error['statusCode'])
            .json(errorJson(error));
    };
};