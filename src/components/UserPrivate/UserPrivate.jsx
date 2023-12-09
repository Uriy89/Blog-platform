import React from 'react';
import style from './UserPrivate.module.css';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constans/routers';


const UserPrivate = ({handleLogout, username, image}) => { 
  return (
    <div className={style.userButtons}>
      <Link to={ROUTES.SIGN_IN}>
        <button type="button" className={style.createArticle}>
          Create article
        </button>
      </Link>
      <Link to={ROUTES.PROFILE}>
        <button type="button" className={style.profile}>
          <span>{username}</span>
            <img src={image} alt="Avatar" />
        </button>
      </Link>
      <Link to={ROUTES.ROOT}>
        <button type="button" className={style.logOut} onClick={handleLogout}>
          Log Out
        </button>
      </Link>
    </div>
  );
};

export default UserPrivate;
