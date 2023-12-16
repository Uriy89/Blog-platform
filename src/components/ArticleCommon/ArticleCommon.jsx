import React, { useState } from "react";
import { deleteArticle } from '../../services';
import style from "./ArticleCommon.module.css";
import Markdown from 'markdown-to-jsx';
import { formatDate } from '../../utils';
import { message } from 'antd';
import classNames from 'classnames';
import { useHistory } from 'react-router-dom';
import * as ROUTERS from '../../constants/routers';
import ArticleButtons from "./ArticleButtons";
import { postFavorited, deleteFavorited } from '../../services';

const ArticleCommon = ({data, username, onIsArticleEdit, isAuthorized }) => {
  const history = useHistory();
  const [error, setError] = useState(false);
  const [active, setActive] = useState(data.favorited);
  const [like, setLike] = useState(data.favoritesCount);

  const confirm = () => {
    deleteArticle(data.slug)
      .then((body) => {
        setError(false);
      })
      .catch(() => setError(true));

    if (!error) {
      message.success('Article deleted');
      history.push(ROUTERS.ROOT);
    }
  };

  const heart = classNames({
    [style.articleLike]: !active,
    [style.articleLikeRed]: active
  });

  const push = () => {
    history.push(`${ROUTERS.ARTICLES}/${data.slug}`);
  };

  const onLike = () => {
    if (isAuthorized) {
      setActive((active) => !active);
      setLike(() => (active ? like - 1 : like + 1));
      !active ? postFavorited(data.slug) : deleteFavorited(data.slug);
    } else {
      message.error('You need is authorized!');
    }
  };

  return (
    <section className={style.section}>
      <header className={style.articleHeader}>
        <div className={style.contentTable}>
          <div className={style.title}>
            <h3 onClick={push}>{data.title}</h3>
            <span className={heart} onClick={onLike}>{like}</span>
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
              <span className={style.userName}>{data.author.username}</span>
              <span className={style.datePublication}>{formatDate(data.updatedAt)}</span>
            </div>
            <img className={style.userAvatar} src={data.author.image} alt={`avatar`} />
          </div>
          <ArticleButtons
            data={data}
            username={username}
            onIsArticleEdit={onIsArticleEdit}
            confirm={confirm}
          />
        </div>
      </header>

      <div className={style.fullContent}>
        <Markdown>{data.body}</Markdown>
      </div>
    </section>
  );
}

export default ArticleCommon;
