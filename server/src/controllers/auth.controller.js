import myLib from '../lib/myLib.js';
import bcrypt from 'bcrypt';
import { getUser } from '../services/auth.service.js';
import jsonwebtoken from 'jsonwebtoken';

const generateToken = function(user){
    if(!user) return {
        statusCode: 400,
        message: 'Missing data.'
    };

    return {
        statusCode: 200,
        message: 'working'
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
        if(!myLib.validPassword(password)){

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
        if(!myLib.validEmail(email) || 
            !myLib.validPassword(password)){

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