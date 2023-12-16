import React, { useState, useEffect } from 'react';
import styles from './ArticlesList.module.css';
import { Pagination } from 'antd';
import { getAllArticles } from '../../services';
import ArticleCommon from '../ArticleCommon';
import Loader from "../Loader";

const ArticlesList = ({ isAuthorized }) => {
  const pageSize = 5;
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllArticles(currentPage, pageSize)
      .then((body) => {
        setArticles(body.articles);
        setTotalPages(body.articlesCount);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [currentPage]);

  if (loading) {
    return <Loader />;
  }

  const onChangePage = (page) => {
    getAllArticles(page, pageSize)
      .then((body) => {
        setArticles(body.articles);
        setTotalPages(body.articlesCount);
        setLoading(false);
      })
      .catch((err) => console.log(err));
    setCurrentPage(page);
  };

  return (
    <div className={styles.articlesList}>
      {articles.map((article) => (
        <ArticleCommon
          key={article.slug}
          data={article}
          isAuthorized={isAuthorized}
        />
      ))}
      <div className={styles.pagination}>
        <Pagination
          defaultCurrent={1}
          total={totalPages}
          onChange={onChangePage}
          showSizeChanger={false}
          itemActiveBg={'#1890FF'}
          className={styles.pagin}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default ArticlesList;
