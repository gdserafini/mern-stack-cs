import { User } from "../models/User.js";

export const create = async function(body){
    return User.create(body);
};

export const find = async function(id){
    return User.findById(id);
};