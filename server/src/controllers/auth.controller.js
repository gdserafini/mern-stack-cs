import myLib from '../lib/myLib.js';
import bcrypt from 'bcrypt';
import { getUser } from '../services/auth.service.js';
import jwt from 'jsonwebtoken';
import { BadRequest, NotFound, ServerError, Unauthorized } from '../lib/error.js';
import logger from '../lib/log.js';
import {newAxios} from '../lib/network.js';

const generateToken = function(user){
    logger.debug({toTokenUser: user});

    ServerError.throwIf(!user,
        'Missing user.', BadRequest);

    const {id, type} = user;
    logger.debug({toTokenFields: {id, type}});

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
    logger.debug({bodyLoginController: body});

    const {username, email, password} = body;

    logger.debug({fieldsLoginController: {
        username, email, password
    }});

    ServerError.throwIf(!username && !email || !password, 
        'Missing data to login.', BadRequest    
    );

    if(!email){
        const validPassword = await myLib
            .validPassword(password);
        logger.debug({validPasswordController: validPassword});

        ServerError
            .throwIf(!validPassword, 
                'Invalid password format', BadRequest);

        const user = await getUser('username', username);
        logger.debug({userLoginUsernameController: user});

        ServerError
            .throwIf(!user, 'User not found', NotFound);

        const correctPassword = await bcrypt.compare(
            password, user['password']);
        logger.debug({correctPasswordUController: correctPassword});

        ServerError.
            throwIf(!correctPassword, 'Incorrect data',
                Unauthorized);

        return generateToken(user);
    }
    else if(!username){
        const validPassword = await myLib
            .validPassword(password);
        const validEmail = myLib.validEmail(email);

        logger.debug({validPasswordController: validPassword});
        logger.debug({validEmailController: validEmail});

        ServerError
            .throwIf(!validPassword, 
                'Invalid password format', BadRequest)
            .throwIf(!validEmail, 
                'Invalid email format', BadRequest);

        const user = await getUser('email', email);
        logger.debug({userLoginEmailController: user});

        ServerError
            .throwIf(!user, 'User not found', NotFound);

        const correctPassword = await bcrypt.compare(
            password, user['password']
        );
        logger.debug({correctPasswordEController: correctPassword});

        ServerError.
            throwIf(!correctPassword, 'Incorrect data',
                Unauthorized);

        return generateToken(user);
    };

};