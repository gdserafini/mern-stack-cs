import { create, find } from "../services/user.service.js";

export const createUser = async function(body){
    const {name, username, email, 
        password, avatar, background} = body;

    if(!name || !username || !email || 
        !password || !avatar || !background) {
            return {
                statusCode: 400,
                message: "Bad request."
            };
    };

    const user = await create(body);

    if(!user) return {
        statusCode: 400,
        message: "Bad request."
    };

    return {
        statusCode: 200, 
        message: "Created.",
        id: user._id
    }; 
};

export const findUser = async function(id){
    const user = find(id);

    if(!user) return {
        statusCode: 404,
        message: "Not found."
    };

    return user;
};