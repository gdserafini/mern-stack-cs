import { create, find, update } from "../services/user.service.js";
import myLib from '../lib/myLib.js';
import { BadRequest, NotFound, ServerError } from "../lib/error.js";

export const createUser = async function(body){
    const {name, username, email, password, 
        avatar, background} = body;

    if(!name || !username || !email || !password||
        !avatar || !background) return {
            statusCode: 400,
            message: 'Missing data.'
        };

    if(!myLib.validEmail(email) || 
        !myLib.validPassword(password)){
        
            return {
                statusCode: 400,
                message: 'Invalid email/password format.'
            };
    };

    return create(body);
};

export const findUser = async function(id){
    const user = await find(id);

    ServerError.throwIf(!user, 
        'User not found.', NotFound
    );

    return {
        statusCode: 200,
        user: user
    };
};

export const updateUserData = async function(userId, body){
    const user = await find(userId);

    ServerError
        .throwIf(!user, 'Not found.', NotFound)
        .throwIf(myLib.invalidFields(Object.keys(body)),
            'Invalid fields passed.', BadRequest    
    );

    const updateUser = await update(userId, body);

    return {
        statusCode: 200,
        updateUser: `${updateUser['username']} updated.`
    };
};