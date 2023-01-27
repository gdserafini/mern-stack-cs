import myLib from '../lib/myLib.js';
import bcrypt from 'bcrypt';
import { getUser } from '../services/auth.service.js';
import jwt from 'jsonwebtoken';
import { BadRequest, ServerError } from '../lib/error.js';

const generateToken = function(user){
    if(!user) return {
        statusCode: 400,
        message: 'Missing data.'
    };

    const {id, type} = user;

    // if(!id || !username || !type) return {
    //     statusCode: 500,
    //     message: 'Missing data.'
    // };

    ServerError
        .throwIf(!id && !type, 
            `Missing data, required: id and type`, BadRequest)  
        .throwIf(!id || !type, 
            `Missing data: ${!id ? 'id' : 'type'}`, BadRequest);

    const PAYLOAD = {
        id: id,
        type: type
    };

    return {
        statusCode: 200,
        token: jwt.sign(
            PAYLOAD, process.env.SECRET, {expiresIn: 86400}
        )
    };
};

export const login = async function(body){
    const {username, email, password} = body;

    if(!username && !email || !password){
        return {
            statusCode: 400,
            message: 'Missing data.'
        };
    };

    if(!email){
        const validPassword = await myLib
            .validPassword(password)

        if(!validPassword){

            return {
                statusCode: 400,
                message: 'Invalid data format.'
            };

        };

        const user = await getUser('username', username);

        if(!user) return {
            statusCode: 405,
            message: 'Not found.'
        };

        const correctPassword = bcrypt.compare(
            password, user['password']
        );

        if(!correctPassword) return {
            statusCode: 404,
            message: 'Invalid data.'
        };

        return generateToken(user);
    }
    else if(!username){
        const validPassword = await myLib
            .validPassword(password)

        if(!myLib.validEmail(email) || 
            !validPassword){

                return {
                    statusCode: 400,
                    message: 'Invalid data format.'
                };

            };

        const user = await getUser('email', email);

        if(!user) return {
            statusCode: 405,
            message: 'Not found.'
        };

        const correctPassword = await bcrypt.compare(
            password, user['password']
        );

        if(!correctPassword) return {
            statusCode: 404,
            message: 'Invalid data.'
        };

        return generateToken(user);
    };

};