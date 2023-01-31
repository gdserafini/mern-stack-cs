import {prisma} from '../database/prismaMysql.js';
import logger from '../lib/log.js';

export const createNewsDb = async function(body){
    logger.debug({serviceCreateNewsBody: body});

    return prisma.new.create({
        data: {
            title: body['title'],
            text: body['text'],
            banner: body['banner'],
            author: {
                connect: {
                    id: body['userId']
                }
            }
        }
    });
};

export const getAllNews = async function(){
    return prisma.new.findMany();
};

export const getNews = async function(key, value){
    logger.debug({toFindNewsService: {key, value}});

    return prisma.new.findUnique({
        where: {
            [key]: value
        }
    })
};

export const getUserById = async function(id){
    logger.debug({serviceGetUserIdNews: id});

    return prisma.user.findUnique({
        where: {
            id: id
        }
    });
};

export const updateNewsDb = async function(title, body){
    return;
};