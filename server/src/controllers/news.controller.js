import { createNewsDb, getAllNews, getNews, 
    getNewsLength, 
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
            author: n['author']['username'],
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