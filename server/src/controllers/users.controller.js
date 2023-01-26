import { create, find, update } from "../services/user.service.js";

export const createUser = async function(body){
    return create(body);
};

export const findUser = async function(id){
    return find(id);
};

export const updateUserData = async function(userId, body){
    return update(userId, body);
};