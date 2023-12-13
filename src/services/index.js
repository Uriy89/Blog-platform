import axios from 'axios';
import * as SERVICES from '../constans/services';
//const token = localStorage.getItem('token');

export const getAllArticles =  async (offset = 0, limit = 5) => {
  const articles = await axios
    .get(SERVICES.ROOT_URL + SERVICES.ARTICLES, { params: { offset, limit } })
    .then((res) => res.data)
    .catch((error) => {
      throw error
    })
    
  return articles
}

/*
export const getAllArticles = async (offset = 0) => {
  try {
    const response = await axios.get(SERVICES.ROOT_URL + `articles?limit=${SERVICES.LIMIT}&offset=${offset}`);
    const res = await response.data;
    console.log(res);
    return res;
  } catch (error) {
    console.error('Error occurred when receiving all articles: ', error);
    throw error;
  }
};*/

export const getArticleBySlug = async (slug) => {
  try {
    const response = await axios.get(SERVICES.ROOT_URL + `articles/${slug}`);
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

export const changeUserData = async (data, token) => {
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
    console.log(data)
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
  const token = localStorage.getItem('token');
  try {
    const response = await axios.delete(SERVICES.ROOT_URL + `articles/${slug}`, {
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
