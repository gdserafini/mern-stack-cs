import {prisma} from '../database/prismaMysql.js';
import logger from '../lib/log.js';

const NEWS_FIELDS = {
    id: false,
    title: true,
    text: true,
    created: true,
    comments: true,
    likes: true,
    author: true,
    userId: false,
    banner: true
};

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

export const getNewsLength = async function(){
    const count = await prisma.user.count();
    logger.debug({getAllCountService: count});
    return count;
};

export const getAllNews = async function(limit, offset, order){
    logger.debug({queryAllService: {limit, offset, order}});

    return prisma.new.findMany({
        skip: offset,
        take: limit,
        orderBy: {
            title: order
        },
        select: NEWS_FIELDS
    });
};

export const getNews = async function(key, value){
    logger.debug({toFindNewsService: {key, value}});

    return prisma.new.findUnique({
        where: {
            [key]: value
        },
        select: NEWS_FIELDS
    });
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

export const getLastNewsDb = async function(){

    return prisma.new.findMany({
        orderBy: {
            created: 'desc'
        },
        take: 1
    });

};