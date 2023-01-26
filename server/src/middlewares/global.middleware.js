
export const validId = function(req, res, next){
    const id = req.params.id;

    if(!id) return {
        statusCode: 400,
        message: 'Missing id.'
    };

    if(isNaN(parseInt(id)) ||
        parseInt(id) <= 0) {

            return {
                statusCode: 400,
                message: 'Invalid id.'
            };
    };

    next();
};

export const validBody = function(req, res, next){
    if(!req.body) return {
        statusCode: 400,
        message: 'Missing data.'
    };

    const params = Object.keys(req.body);

    if(params.length === 0){
        return {
            statusCode: 400,
            message: 'The body is empty.'
        };
    }
};