import React, { useEffect, useState } from 'react';
import style from './ArticleFull.module.css';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { getArticleBySlug, deleteArticle } from '../../services';
import Markdown from 'markdown-to-jsx';
import { formatDate } from '../../utils';
import * as ROUTES from '../../constans/routers';
import { Link } from 'react-router-dom';
import { Popconfirm, message  } from 'antd';

const ArticleFull = (props) => {
  const { slug, username, onIsArticleEdit } = props;
  const [data, setData] = useState({});
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
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

  //const onDeleteHandler = async (slug) => {
  //  try {
  //    await deleteArticle(slug);
  //    history.push(ROUTES.ROOT);
  //  } catch (error) {
  //    console.error('Error fetching articles:', error);
  //  }
  //};

  if (loading) {
    return <span className={style.loader}></span>;
  }
  
  const confirm = () => {
    deleteArticle(data.slug)
      .then((body) => {
        setError(false);
      })
      .catch(() => setError(true));

    if (!error) {
      message.success('Article deleted');
      history.push('/');
    }
  };

  const push = () => {
    history.push(`/articles/${data.slug}`);
  };

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
              <Popconfirm
                placement={'right'}
                title="Are you sure to delete this task?"
                onConfirm={confirm}
                onCancel={push}
                okText="Yes"
                cancelText="No"
              >
                <button type="button" className={style.btnDelete}>Delete</button>
              </Popconfirm>
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
