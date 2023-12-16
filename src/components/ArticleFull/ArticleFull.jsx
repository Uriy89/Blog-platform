import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom'; 
import ArticleCommon from '../ArticleCommon';
import { getArticleBySlug } from '../../services';
import Loader from "../Loader";

const ArticleFull = ({ username, onIsArticleEdit, isAuthorized }) => {
  const [data, setData] = useState({});
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("useFull.....")
    const fetchData = async (slug) => {
      try {
        const res = await getArticleBySlug(slug);
        setData(res.article);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };
    fetchData(slug);
  }, [slug]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <ArticleCommon 
          username={username}
          onIsArticleEdit={onIsArticleEdit}
          data={data}
          isAuthorized={isAuthorized}
        />
      )}
    </>
  );
};

ArticleFull.propTypes = {
  slug: PropTypes.string
};

export default ArticleFull;
