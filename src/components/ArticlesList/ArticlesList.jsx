import React, { useState, useEffect } from 'react';
import styles from './ArticlesList.module.css';
import ArticleItem from './ArticleItem';
import { Pagination } from 'antd';
import { getAllArticles } from '../../services';

const ArticlesList = ({ isAuthorized }) => {
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllArticles(currentPage)
      .then((body) => {
        setArticles(body.articles);
        setTotalPages(body.articlesCount);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [currentPage]);

  if (loading) {
    return <span className={styles.loader}></span>;
  }

  const onChangePage = (page) => {
    getAllArticles(page)
      .then((body) => {
        setArticles(body.articles);
        setTotalPages(body.articlesCount);
        setLoading(false);
      })
      .catch((err) => console.log(err));
    setCurrentPage(page);
  }

  return (
    <div className={styles.articlesList}>
      {articles.map((article) => (
          <ArticleItem
            key={article.slug}
            slug={article.slug}
            title={article.title}
            description={article.description}
            body={article.body}
            tagList={article.tagList}
            likeCount={article.favoritesCount}
            username={article.author.username}
            image={article.author.image}
            updatedAt={article.updatedAt}
            isAuthorized={isAuthorized}
            favorited={article.favorited}
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
