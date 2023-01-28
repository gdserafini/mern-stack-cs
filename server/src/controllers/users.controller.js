import { create, find, update } from "../services/user.service.js";
import myLib from '../lib/myLib.js';
import { NotFound, ServerError } from "../lib/error.js";

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
    return update(userId, body);
};