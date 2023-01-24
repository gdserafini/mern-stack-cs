import { create, find, update } from "../services/user.service.js";

export const createUser = async function(body){

    if(!body) return {
        statusCode: 400,
        message: "Missing data."
    };

    const {name, username, email, 
        password, avatar, background} = body;

    if(!name || !username || !email || 
        !password || !avatar || !background) {
            return {
                statusCode: 400,
                message: "Missing data."
            };
    };

    return create(body);
};

export const findUser = async function(id){
    if(!id) return {
        statusCode: 400,
        message: 'Missing data.'
    };

    const user = await find(id);

    if(!user) return {
        statusCode: 404,
        message: "Not found."
    };

    return user;
};

export const updateUserData = async function(userId, body){
    if(!userId || !body) return {
        statusCode: 400,
        message: 'Missing data.'
    };

    const {id, email, username} = body;

    if(id || email || username) return {
        statusCode: 405,
        message: 'Cannot update this data.'
    };

    return update(userId, body);
};