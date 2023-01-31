import { createNewsDb, getAllNews, getNews, 
    getUserById, updateNewsDb } from "../services/news.service.js";
import logger from '../lib/log.js';
import { BadRequest, InternalError, ServerError, 
    Unauthorized } from "../lib/error.js";

export const createNews = async function(body){
    logger.debug({createBodyNewsController: body});

    const {title, text, banner, userId} = body;

    ServerError
        .throwIf(!title || !text || !banner,
            'Missing data', BadRequest)
        .throwIf(!userId, 'Unauthorized', Unauthorized);

    const exists = await getNews('title', body['title']);
    logger.debug({existsNewsController: exists});

    ServerError.throwIf(exists, 'News already exists',
        BadRequest);

    const created = await createNewsDb(body);
    logger.debug({createdNewsController: created});

    ServerError.throwIf(!created,
        'Error on create news.', InternalError);

    return {
        statusCode: 200,
        message: `${body['title']} successfuly created.`
    };
};

export const findAllNews = async function(){
    return getAllNews();
};

export const findNews = async function(key, value){
    logger.debug({toFindNewsController: {key, value}});

    ServerError.throwIf(!key || !value,
        'Missing data.', BadRequest);

    return getNews(key, value);
};

export const updateNews = async function(title, body){
    return updateNewsDb(title, body);
};