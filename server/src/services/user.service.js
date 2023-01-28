
import { prisma } from "../database/prismaMysql.js";
import logger from '../lib/log.js';

const USER_FIELDS = {
    id: true,
    name: true,
    username: true,
    password: false,
    email: true,
    avatar: true,
    background: true
};

export const create = async function(body){
    logger.debug({serviceCreateBody: body});

    return prisma.user.create({
        data: body
    });
};

export const find = async function(key, value){
    logger.debug({toFindService: {key, value}});

    return prisma.user.findUnique({
        where: {
            [key]: value
        },
        select: USER_FIELDS
    });
};

export const update = async function(id, data){
    logger.debug({updateService: {id, data}});

    return prisma.user.update({
        where: {
            id: id
        },
        data: data
    });
};