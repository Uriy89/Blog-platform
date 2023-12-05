import React, { useState, useEffect } from 'react';
import styles from './ArticlesList.module.css';
import ArticleItem from './ArticleItem';
import { Pagination } from 'antd';
import { getAllArticles } from '../../services';

const ArticlesList = () => {
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllArticles(currentPage);
        const { articles, articlesCount } = res;
        setArticles(articles);
        setTotalPages(Math.ceil(articlesCount / 5));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };
    fetchData();
  }, [currentPage]);

  if (loading) {
    return <span className={styles.loader}></span>;
  }

  const createArticle = articles.map((article) => {
    return (
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
      />
    );
  });

  return (
    <div className={styles.articlesList}>
      {createArticle}
      <div className={styles.pagination}>
        <Pagination
          defaultCurrent={0}
          pageSize={1}
          total={totalPages}
          onChange={(page) => setCurrentPage(page)}
          showSizeChanger={false}
          itemActiveBg={'#1890FF'}
          className={styles.pagin}
        />
      </div>
    </div>
  );
};

export default ArticlesList;
