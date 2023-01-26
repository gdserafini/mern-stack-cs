import { create, find, update } from "../services/user.service.js";

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

const validEmail = function(email){
    return (email === 'admin@admin.com' || 
        emailRegex.test(email));
};

const validPassword = function(password){
    return (password === 'admin' || 
        passwordRegex.test(password));
};

export const createUser = async function(body){
    const {name, username, email, password, 
        avatar, background} = body;

    if(!name || !username || !email || !password||
        !avatar || !background) return {
            statusCode: 400,
            message: 'Missing data.'
        };

    if(!validEmail(email) || !validPassword(password)){
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