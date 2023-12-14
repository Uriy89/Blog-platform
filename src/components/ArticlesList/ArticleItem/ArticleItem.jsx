import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Markdown from 'markdown-to-jsx';
import PropTypes from 'prop-types';
import style from './ArticleItem.module.css';
import { formatDate } from '../../../utils';
import * as ROUTES from '../../../constans/routers';
import { Popconfirm, message } from 'antd';
import { postFavorited, deleteFavorited } from '../../../services';
import classNames from 'classnames';

const ArticleItem = ({
  slug,
  title,
  description,
  updatedAt,
  tagList,
  likeCount,
  username,
  image,
  isAuthorized,
  favorited
}) => {

  const [like, setLike] = useState(likeCount);
  const [active, setActive] = useState(favorited);

  const onLike = () => {
    if(isAuthorized)  {
      setActive((active) => !active);
      setLike(() => (active ? like - 1 : like + 1))
      !active ? postFavorited(slug) : deleteFavorited(slug);
    }
  }

  const heart = classNames({
    [style.articleLike]: !favorited,
    [style.articleLikeRed]: favorited,
  });


  return (
    <article className={style.article} key={slug}>
      <header className={style.articleHeader}>
        <div className={style.contentTable}>
          <div className={style.title}>
            <Link to={`${ROUTES.ARTICLES}/${slug}`}>
              <h3 className={style.articleTitle}>{title}</h3>
            </Link>
            <span className={heart} onClick={onLike}>{like}</span>
          </div>
          <div className={style.tags}>
            {tagList.map((tag, index) => (
              <span className={style.articleTag} key={index}>
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className={style.userTable}>
          <div className={style.userInfo}>
            <span className={style.userName}>{username}</span>
            <span className={style.datePublication}>{formatDate(updatedAt)}</span>
          </div>
          <img className={style.userAvatar} src={image} alt={`avatar`} />
        </div>
      </header>
      <div className={style.bodyContent}>
        <Markdown>{description}</Markdown>
      </div>
    </article>
  );
};

ArticleItem.propTypes = {
  slug: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  updatedAt: PropTypes.string,
  tagList: PropTypes.array,
  likeCount: PropTypes.number,
  username: PropTypes.string,
  image: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
};

export default ArticleItem;
