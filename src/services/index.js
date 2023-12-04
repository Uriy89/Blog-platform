import axios from 'axios';

const ROOT_URL = 'https://blog.kata.academy/api/';
const LIMIT = 5;

export const getAllArticles = async (offset=0) => {
    try {
        const response = await axios.get(ROOT_URL + `articles?limit=${LIMIT}&offset=${offset}`);
        return response.data;
    } catch(error) {
        console.error('Error occurred when receiving all articles: ', error);
        throw error;
    }
}

export const getArticleBySlug = async (slug) => {
    try {
        const response = await axios.get(ROOT_URL + `articles/${slug}`);
        return response.data;
    } catch(error) {
        console.error('Error occurred when receiving all articles: ', error);
        throw error;
    }
}