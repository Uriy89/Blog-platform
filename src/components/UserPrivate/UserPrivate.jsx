import React from 'react';
import style from './UserPrivate.module.css';
import { Link } from 'react-router-dom';
import * as ROUTERS from '../../constants/routers';
import d from '../../assets/images/noava.png';

const UserPrivate = ({ handleLogout, username, image }) => {
  return (
    <div className={style.userButtons}>
      <Link to={ROUTERS.NEW_ARTICLE}>
        <button type="button" className={style.createArticle}>
          Create article
        </button>
      </Link>
      <Link to={ROUTERS.PROFILE}>
        <button type="button" className={style.profile}>
          <span>{username}</span>
          <img src={!!image ? image : d} alt="Avatar" />
        </button>
      </Link>
      <Link to={ROUTERS.ROOT}>
        <button type="button" className={style.logOut} onClick={handleLogout}>
          Log Out
        </button>
      </Link>
    </div>
  );
};

export default UserPrivate;
