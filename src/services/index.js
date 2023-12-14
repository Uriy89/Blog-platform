import axios from 'axios';
import * as SERVICES from '../constans/services';

const token = localStorage.getItem('token');

export const getAllArticles =  async (offset = 0, limit = 5) => {
  const articles = await axios
    .get(SERVICES.ROOT_URL + SERVICES.ARTICLES, { params: { offset, limit } })
    .then((res) => res.data)
    .catch((error) => {
      throw error
    })
    
  return articles
}

export const getArticleBySlug = async (slug) => {
  try {
    const response = await axios.get(`${SERVICES.ROOT_URL}${SERVICES.ARTICLES}/${slug}`);
    return response.data;
  } catch (error) {
    console.error('Error occurred when receiving all articles: ', error);
    throw error;
  }
};

export const postCreateUser = async (user) => {
  try {
    const response = await axios.post(SERVICES.ROOT_URL + SERVICES.USERS, user, {
      headers: { 'Cache-Control': 'no-cache' }
    });
    return { data: response.data, error: null };
  } catch (error) {
    if (error.response) {
      return { data: null, error: error.response.data };
    } else {
      console.error('Error:', error);
      return { data: null, error: 'An unexpected error occurred.' };
    }
  }
};

export const loginUser = async (user) => {
  try {
    const response = await axios.post(SERVICES.ROOT_URL + SERVICES.LOGIN, user);
    return { data: response.data, error: null };
  } catch (error) {
    if (error.response) {
      return { data: null, error: error.response.data };
    } else {
      console.error('Error:', error);
      return { data: null, error: 'An unexpected error occurred.' };
    }
  }
};

export const changeUserData = async (data) => {
  try {
    const response = await axios.put(SERVICES.ROOT_URL + SERVICES.USER, data, {
      headers: {
        Authorization: `Token ${token}`
      }
    });
    return { data: response.data, error: null };
  } catch (error) {
    if (error.response) {
      return { data: null, error: error.response.data };
    } else {
      console.error('Error:', error);
      return { data: null, error: 'An unexpected error occurred.' };
    }
  }
};


export const createNewArticle = async (data, token) => {
  try {
     const response = await axios.post(`${SERVICES.ROOT_URL}${SERVICES.ARTICLES}`, data, {
      headers: {
        Authorization: `Token ${token}`
      }
    });
    return { data: response.data, error: null };
  } catch (error) {
    if (error.response) {
      return { data: null, error: error.response.data };
    } else {
      console.error('Error:', error);
      return { data: null, error: 'An unexpected error occurred.' };
    }
  }
};


export const deleteArticle = async (slug) => {
  try {
    const response = await axios.delete(`${SERVICES.ROOT_URL}${SERVICES.ARTICLES}/${slug}`, {
      headers: {
        Authorization: `Token ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error occurred when receiving all articles: ', error);
    throw error;
  }
};

export const editArticle = async (slug, data) => {
  try {
    const response = await axios.put(`${SERVICES.ROOT_URL}${SERVICES.ARTICLES}/${slug}`, data, {
      headers: {
        Authorization: `Token ${token}`
      }
    });
    return { data: response.data, error: null };
  } catch (error) {
    console.error('Error occurred when receiving all articles: ', error);
    throw error;
  }
};

