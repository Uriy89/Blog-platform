import React from 'react';
import { Link } from 'react-router-dom';
import { Popconfirm } from 'antd';
import * as ROUTERS from '../../../constants/routers'
import style from './ArticleButtons.module.css';

const ArticleButtons = ({ data, username, onIsArticleEdit, confirm, push }) => {
  return (
    <>
      {username === data.author.username ? (
        <div className={style.buttons}>
          <Popconfirm
            placement={'right'}
            title="Are you sure to delete this task?"
            onConfirm={confirm}
            onCancel={push}
            okText="Yes"
            cancelText="No"
          >
            <button type="button" className={style.btnDelete}>
              Delete
            </button>
          </Popconfirm>
          <Link to={`${ROUTERS.ARTICLES}/${data.slug}/edit`}>
            <button
              type="button"
              className={style.btnAdd}
              onClick={() => {
                onIsArticleEdit(true);
              }}
            >
              Edit
            </button>
          </Link>
        </div>
      ) : null}
    </>
  );
};

export default ArticleButtons;
