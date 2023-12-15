import axios from 'axios';
import * as SERVICES from '../constans/services';

const token = localStorage.getItem('token');

export const getAllArticles = async (page, pageSize = 5) => {
  const offset = pageSize * (page - 1);
  const articles = await axios
    .get(SERVICES.ARTICLES, { 
      params: { offset, limit: pageSize },
      headers: {
        Authorization: `Token ${token}`,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      throw error;
    });
  return articles;
};

export const getArticleBySlug = async (slug) => {
  const response = await axios.get(`${SERVICES.ARTICLES}/${slug}`, {
    headers: {
      Authorization: `Token ${token}`,
    }
  });
  return response.data;
};

export const postCreateUser = async (user) => {
  const response = await axios.post(SERVICES.ROOT_URL + SERVICES.USERS, user, {
    headers: { 'Cache-Control': 'no-cache' }
  });
  return { data: response.data, error: null };
};

export const loginUser = async (user) => {
  const response = await axios.post(SERVICES.ROOT_URL + SERVICES.LOGIN, user);
  return { data: response.data, error: null };
};

export const changeUserData = async (data) => {
  const response = await axios.put(SERVICES.ROOT_URL + SERVICES.USER, data, {
    headers: {
      Authorization: `Token ${token}`
    }
  });
  return { data: response.data, error: null };
};

export const createNewArticle = async (data, token) => {
  await axios
    .post(`${SERVICES.ARTICLES}`, data, {
      headers: {
        Authorization: `Token ${token}`
      }
    })
    .then((response) => response.data)
    .catch((err) => console.error(err));
};

export const deleteArticle = async (slug) => {
  try {
    const response = await axios.delete(`${SERVICES.ARTICLES}/${slug}`, {
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
    const response = await axios.put(`${SERVICES.ARTICLES}/${slug}`, data, {
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

export const postFavorited = async (slug) => {
  await axios
    .post(`${SERVICES.ARTICLES}/${slug}/favorite`, '', {
      headers: {
        Authorization: `Token ${token}`
      }
    })
    .then(() => true)
    .catch((e) => console.error(e));
};

export const deleteFavorited = async (slug) => {
  await axios
    .delete(`${SERVICES.ARTICLES}/${slug}/favorite`, {
      headers: {
        Authorization: `Token ${token}`
      }
    })
    .then(() => true)
    .catch((e) => console.error(e));
};
