import { create, find, update } from "../services/user.service.js";
import myLib from '../lib/myLib.js';
import { BadRequest, NotFound, ServerError } from "../lib/error.js";
import bcrypt from 'bcrypt';

export const createUser = async function(body){

    ServerError
        .throwIf(myLib.missingFieldsCreate(body), 
            'Missing fields.', BadRequest)
        .throwIf(!myLib.validEmail(body.email), 
            'Invalid email format.', BadRequest)
        .throwIf(!myLib.validPassword(body.password), 
            'Invalid password format.', BadRequest);

    body['password'] = await bcrypt.hash(
        body['password'], await bcrypt.genSalt()
    );
    body['type'] = 'USER';

    const exists = await find(
        'username', body['username']);

    ServerError.throwIf(exists, 
        'User already exists.', BadRequest);

    const userCreate = await create(body);

    return {
        statusCode: 200,
        message: `${userCreate['username']} created.`
    };
};

export const findUser = async function(id){
    const user = await find('id', id);

    ServerError.throwIf(!user, 
        'User not found.', NotFound
    );

    return {
        statusCode: 200,
        user: user
    };
};

export const updateUserData = async function(userId, body){
    const user = await find('id', userId);

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