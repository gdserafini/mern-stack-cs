import { createNewsDb, getAllNews, getNews, 
    getUserById } from "../services/news.service";

export const createNews = async function(body){
    body['userId'] = body.userId;
    return createNewsDb(body);
};

export const findAllNews = async function(){
    return getAllNews();
};

export const findNews = async function(field, value){
    return getNews(field, value);
};