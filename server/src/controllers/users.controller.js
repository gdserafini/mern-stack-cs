import { create, find, update } from "../services/user.service.js";
import myLib from '../lib/myLib.js';

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
    return find(id);
};

export const updateUserData = async function(userId, body){
    return update(userId, body);
};