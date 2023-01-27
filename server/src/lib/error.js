
export const BadRequest = function(message='Bad request.'){
    return new ServerError(400, message);
};

export const Unauthorized = function(message='Unauthorized'){
    return new ServerError(401, message);
};

export const Forbidden = function(message='Forbidden'){
    return new ServerError(403, message);
};

export const NotFound = function(message='Not found.'){
    return new ServerError(404, message);
}

export class ServerError extends Error {
    statusCode;
    errors;

    constructor(statusCode=500, message='Server error.'){
        super(message);

        this.statusCode = statusCode;
        this.errors = [];
    };

    add(error){
        this.errors.append(error);
        return this;
    };

    static throwIf(condition, message, builder=BadRequest){
        if(condition) throw builder(message);
    };
};