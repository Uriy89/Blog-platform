import React, { useEffect, useState } from 'react';
import style from './ArticleFull.module.css';
import PropTypes from 'prop-types';
import { getArticleBySlug } from '../../services';
import Markdown from 'markdown-to-jsx';
import { formatDate } from '../../utils';

const ArticleFull = (props) => {
  const { slug } = props;
  const [data, setData] = useState({});
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('1 вызов');
    const fetchData = async (slug) => {
      try {
        const res = await getArticleBySlug(slug);
        setData(res.article);
        setAuthor(res.article.author);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };
    fetchData(slug);
  }, [slug]);

  if (loading) {
    return <span className={style.loader}></span>;
  }

  return (
    <section className={style.section}>
      <header className={style.articleHeader}>
        <div className={style.contentTable}>
          <div className={style.title}>
            <h3>{data.title}</h3>
            <span className={style.articleLike}>{data.favoritesCount}</span>
          </div>
          <div className={style.tags}>
            {data.tagList.map((tag, index) => (
              <span className={style.articleTag} key={index}>
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className={style.userTable}>
          <div className={style.userInfo}>
            <span className={style.userName}>{author.username}</span>
            <span className={style.datePublication}>{formatDate(data.updatedAt)}</span>
          </div>
          <img className={style.userAvatar} src={author.image} alt={`avatar`} />
        </div>
      </header>
      <div className={style.bodyContent}>
        <Markdown>{data.description}</Markdown>
      </div>
      <div className={style.fullContent}>
        <Markdown>{data.body}</Markdown>
      </div>
    </section>
  );
};

ArticleFull.propTypes = {
  slug: PropTypes.string
};

export default ArticleFull;
