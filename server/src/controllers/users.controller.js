import { create, find } from "../services/user.service.js";

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

    const user = await create(body);

    if(!user) return {
        statusCode: 400,
        message: "Bad request."
    };

    return {
        statusCode: 200, 
        message: "Created."
    }; 
};

export const findUser = async function(id){
    if(!id || parseInt(id) <= 0) return {
        statusCode: 400,
        message: 'Missing/invalid data.'
    };

    const user = await find(id);

    if(!user) return {
        statusCode: 404,
        message: "Not found."
    };

    return user;
};