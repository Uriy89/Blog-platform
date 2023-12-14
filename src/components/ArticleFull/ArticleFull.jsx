import React, { useEffect, useState } from 'react';
import style from './ArticleFull.module.css';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { getArticleBySlug, deleteArticle, postFavorited, deleteFavorited } from '../../services';
import Markdown from 'markdown-to-jsx';
import { formatDate } from '../../utils';
import * as ROUTES from '../../constans/routers';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

const ArticleFull = (props) => {
  const { slug, username, onIsArticleEdit } = props;
  const [data, setData] = useState({});
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
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

  const onDeleteHandler = async (slug) => {
    try {
      await deleteArticle(slug);
      history.push(ROUTES.ROOT);
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };

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
          <div className={style.description}>
            <Markdown>{data.description}</Markdown>
          </div>
        </div>
        <div className={style.userTable}>
          <div className={style.userInfo}>
            <div className={style.span}>
              <span className={style.userName}>{author.username}</span>
              <span className={style.datePublication}>{formatDate(data.updatedAt)}</span>
            </div>
            <img className={style.userAvatar} src={author.image} alt={`avatar`} />
          </div>
          {username === author.username ? (
            <div className={style.buttons}>
              <button
                type="button"
                className={style.btnDelete}
                onClick={() => onDeleteHandler(slug)}
              >
                Delete
              </button>
              <Link to={`/articles/${data.slug}/edit`}>
                <button type="button" className={style.btnAdd} onClick={() => {
                  onIsArticleEdit(true);
                }}>
                  Edit
                </button>
              </Link>
            </div>
          ) : null}
        </div>
      </header>

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
