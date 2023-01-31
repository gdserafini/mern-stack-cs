import { createNewsDb, getAllNews, getNews, 
    getNewsLength, getLastNewsDb, updateNewsDb } from "../services/news.service.js";
import logger from '../lib/log.js';
import { BadRequest, InternalError, NotFound, 
    ServerError, Unauthorized } from "../lib/error.js";

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

export const findAllNews = async function(limit, offset, order, url){
    logger.debug({queryAllController: {limit, offset, order}});

    const total = await getNewsLength();
    logger.debug({countControllerAll: total});

    const next = limit + offset;
    const nextUrl = next < total ? 
        `/news/data/all?limit=${limit}&offset=${next}` : null;
    const previous = offset - limit < 0 ?
        null : offset - limit;
    const previousUrl = previous ? 
        `/news/data/all?limit=${limit}&offset=${previous}` : null;

    logger.debug({dataPagination: {
        next, nextUrl, previous, previousUrl
    }});

    const news = await getAllNews(limit, offset, order);

    return {
        statusCode: 200,
        next, nextUrl, limit, offset, total,
        results: news.map(n => ({
            title: n['title'],
            text: n['text'],
            created: n['created'],
            comments: n['comments'],
            likes: n['likes'],
            author: {
                username: n['author']['username'],
                avatar: n['author']['avatar']
            },
            banner: n['banner']
        }))
    };
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

export const getLastNews = async function(){
    const last = await getLastNewsDb();
    const lastNews = last[0];
    logger.debug({lastNewsController: lastNews});

    ServerError.throwIf(!lastNews, 
        'Not found.', NotFound);

    return {
        statusCode: 200,
        last:{
            title: lastNews['title'],
            text: lastNews['text'],
            created: lastNews['created'],
            comments: lastNews['comments'],
            likes: lastNews['likes'],
            author: {
                username: lastNews['author']['username'],
                avatar: lastNews['author']['avatar']
            },
            banner: lastNews['banner']
        }
    };
};