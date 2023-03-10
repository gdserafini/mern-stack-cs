import { createNewsDb, getAllNews, getNewsDb, 
    getNewsLength, getLastNewsDb, updateNewsDb,
    getList, deleteNewsDb, addInfoDb,
    getLikeDb,
    deleteInfoDb} from "../services/news.service.js";
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

    const exists = await getNewsDb('title', body['title']);
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

export const findAllNews = async function(limit, offset, order, key, value){
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

    const news = await getAllNews(limit, offset, order, key, value);

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

    const news = await getList(key, value);
    logger.debug({
        newsControllerNews: news
    });

    ServerError.throwIf(!news,
        'Not found.', NotFound);

    return {
        statusCode: 200,
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

export const updateNews = async function(body){
    ServerError.throwIf(!body,
        'Missing data.', BadRequest);

    const resp = await updateNewsDb(body['title'], body);

    ServerError.throwIf(!resp,
        'Cannot update.', InternalError);

    return {
        statusCode: 200,
        message: 'Successfuly.'
    };
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

export const deleteNews = async function(id){
    ServerError.throwIf(!id,
        'Missing id.', BadRequest);

    const resp = await deleteNewsDb(id);
    logger.debug(`News controller - deleteNews - resp: ${resp}`);

    ServerError.throwIf(!resp,
        'Cannot delete.', InternalError);

    return {
        statusCode: 200,
        message: 'Successfuly deleted.'
    };
};

export const addInfo = async function(newId, userId, infoName, data){
    ServerError.throwIf(!newId || !userId || !infoName,
        'Missing params.', BadRequest);

    if(infoName === 'likes'){
        const exists = await getLikeDb(newId, userId);
        logger.debug(`News controller - addInfo - exists: ${exists}`);

        ServerError.throwIf(exists,
            'Already like it.', Unauthorized);
    };

    const resp = await addInfoDb(newId, userId, infoName, data);
    logger.debug(`News controller - addInfo - resp: ${resp}`);

    ServerError.throwIf(!resp,
        'Internal server error.', InternalError);

    return {
        statusCode: 200,
        message: 'Successfuly.'
    };
};

export const deleteInfo = async function(id, userId, infoName){
    ServerError.throwIf(!id || !userId || !infoName,
        'Missing params.', BadRequest);

    const deleted = await deleteInfoDb(id, userId, infoName);
    logger.debug(`News controller - deleteInfo - deleted: ${deleted}`);

    ServerError.throwIf(!deleted,
        'Internal server error.', InternalError);

    return {
        statusCode: 200,
        message: 'Successfuly.'
    };

};