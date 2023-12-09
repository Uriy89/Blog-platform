import React from 'react';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import UserPrivate from '../UserPrivate';
import * as ROUTES from '../../constans/routers';
import PropTypes from 'prop-types';

const Header = ({ isAuthorized, handleLogout, username, image }) => {
  return (
    <>
      {!isAuthorized ? (
        <div className={styles.headerButtons}>
          <Link to={ROUTES.SIGN_IN}>
            <button type="button" className={styles.signIn}>
              Sign In
            </button>
          </Link>
          <Link to={ROUTES.SIGN_UP}>
            <button type="button" className={styles.signUp}>
              Sign Up
            </button>
          </Link>
        </div>
      ) : (
        <UserPrivate handleLogout={handleLogout} username={username} image={image}/>
      )}
    </>
  );
};

Header.propTypes = {
  isAuthorized: PropTypes.bool.isRequired,
};

export default Header;
