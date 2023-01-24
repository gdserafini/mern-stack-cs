
import { prisma } from "../database/prismaMysql.js";
import bcrypt from 'bcrypt';

const USER_FIELDS = {
    id: true,
    name: true,
    username: true,
    password: false,
    email: true,
    roles: true,
    avatar: true,
    background: true
};

export const create = async function(body){

    if(!body) return {
        statusCode: 400,
        message: 'Missing data.'
    };

    const {name, username, email, 
        password, avatar, background} = body;

    const exists = prisma.user.findUnique({
        where: {
            username: username
        },
        select: USER_FIELDS
    });

    if(exists) return {
        statusCode: 401,
        message: 'Already exists.'
    };

    if(!name || !username || !email || !password ||
        !avatar || !background) {
            return {
                statusCode: 400,
                message: 'Missing data.'
            }
    };

    const cryptPassword = await bcrypt.hash(
        password, await bcrypt.genSalt()
    );

    return prisma.user.create({
        data: {
            name: name,
            username: username,
            email: email,
            password: cryptPassword,
            avatar: avatar,
            background: background,
            roles: {
                connect: [
                    {
                        name: 'USER'
                    }
                ]
            }
        }
    });
};

export const find = async function(id){
    if(!id || parseInt(id) <= 0) return {
        statusCode: 400,
        message: 'Missing/invalid data.'
    };

    return prisma.user.findUnique({
        where: {
            id: parseInt(id)
        },
        select: USER_FIELDS
    });
};

export const update = async function(id, data){
    if(!id || !data) return {
        statusCode: 400,
        message: 'Missing data'
    };

    const user = await find(id);

    if(!user) return {
        statusCode: 404,
        message: "Not found."
    };

    return prisma.user.update({
        where: {
            id: parseInt(id)
        },
        data: data
    });
};