import {prisma} from '../database/prismaMysql.js';
import logger from '../lib/log.js';

export const createNewsDb = async function(body){
    logger.debug({serviceCreateNewsBody: body});

    return prisma.new.create({
        data: body
    });
};

export const getAllNews = async function(){

};

export const getNews = async function(field, value){

};

export const getUserById = async function(id){
    logger.debug({serviceGetUserIdNews: id});

    return prisma.user.findUnique({
        where: {
            id: id
        }
    });
};