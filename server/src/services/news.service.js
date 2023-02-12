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

export const getList = async function(field, value, order){
    return prisma.new.findMany({
        where: {
            [field]: value
        },
        orderBy: {
            title: order ? order : 'asc'
        }
    });
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

export const getAllNews = async function(
        limit, offset, order, key, value){

    logger.debug({queryAllService: {
        limit, offset, order, key, value}});

    return prisma.new.findMany({
        where: {
            [key]: value
        },
        skip: offset,
        take: limit,
        orderBy: {
            title: order
        },
        select: NEWS_FIELDS
    });
};

export const getNewsDb = async function(key, value){
    logger.debug({toFindNewsService: {key, value}});

    return prisma.new.findMany({
        where: {
            [key]: {
                search: value
            }
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
    return prisma.new.update({
        where: {
            'title': title
        },
        data: body
    });
};

export const getLastNewsDb = async function(){

    return prisma.new.findMany({
        orderBy: {
            created: 'desc'
        },
        take: 1,
        select: NEWS_FIELDS
    });

};

export const deleteNewsDb = async function(id){
    return prisma.new.delete({
        where: {
            'id': id
        }
    });
};

export const getLikeDb = async function(newId, userId){
    return prisma.likes.findFirst({
        where: {
            newId: newId,
            userId: userId
        }
    });
};

export const addInfoDb = async function(newId, userId, infoName, text){

    if(infoName === 'likes'){
        return prisma.new.update({
            where: {
                id: newId
            },
            data: {
                [infoName]: {
                    create: [
                        {
                            userId: userId
                        }
                    ]
                }
            }
        });
    }

    return prisma.new.update({
        where: {
            id: newId
        },
        data: {
            [infoName]: {
                create: [
                    {
                        text: text,
                        userId: userId
                    }
                ]
            }
        }
    });

};

export const deleteInfoDb = async function(id, infoName){

        if(infoName === 'likes'){
            return prisma.likes.delete({
                where: {
                    id: id
                }
            });
        };

        return prisma.likes.delete({
            where: {
                id: id
            }
        });

};