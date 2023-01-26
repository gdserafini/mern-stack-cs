import { create, find, update } from "../services/user.service.js";

export const createUser = async function(body){
    const {name, username, email, password, 
        avatar, background} = body;

    if(!name || !username || !email || !password||
        !avatar || !background) return {
            statusCode: 400,
            message: 'Missing data.'
        };

    return create(body);
};

export const findUser = async function(id){
    return find(id);
};

export const updateUserData = async function(userId, body){
    return update(userId, body);
};