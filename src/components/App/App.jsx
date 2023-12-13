import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import styles from './App.module.css';
import * as ROUTES from '../../constans/routers';
import * as SERVICES from '../../constans/services';
import PrivateRouter from '../PrivateRouter';
import ArticlesList from '../ArticlesList';
import EditProfile from '../EditProfile';
import ArticleFull from '../ArticleFull';
import CreateEdditArticles from '../CreateEdditArticles';
//import UserPrivate from '../UserPrivate';
import style from '../UserPrivate/UserPrivate.module.css';
import SignUp from '../SignUp';
import SignIn from '../SignIn';
//import Header from '../Header';

const App = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [username, setUsername] = useState(localStorage.getItem(SERVICES.USER_NAME));
  const [image, setImage] = useState(localStorage.getItem(SERVICES.IMAGE));

  const handleUserData = (token, username, email, image) => {
    localStorage.setItem(SERVICES.TOKEN, token);
    localStorage.setItem(SERVICES.USER_NAME, username);
    localStorage.setItem(SERVICES.EMAIL, email);
    localStorage.setItem(SERVICES.IMAGE, image);
    setIsAuthorized(true);
  };

  const handleLogout = () => {
    localStorage.removeItem(SERVICES.TOKEN);
    localStorage.removeItem(SERVICES.USER_NAME);
    localStorage.removeItem(SERVICES.EMAIL);
    localStorage.removeItem(SERVICES.IMAGE);
    setIsAuthorized(false);
  };

  const handleEdditProfile = (username, image) => {
    setUsername(username);
    setImage(image);
  };

  useEffect(() => {
    const token = localStorage.getItem(SERVICES.TOKEN);
    if (token !== null) {
      setIsAuthorized(true);
    }
  }, []);

  return (
    <Router>
      <header className={styles.mainHeader}>
        <Link to={ROUTES.ROOT}>
          <h1 className={styles.title}>Realworld Blog</h1>
        </Link>
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
          <div className={style.userButtons}>
            <Link to={ROUTES.NEW_AERTICLE}>
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
        )}
      </header>
      <div className="wrapper">
        <Switch>
          <Route path={[ROUTES.ROOT, ROUTES.ARTICLES]} exact component={() => <ArticlesList />} />
          <Route
            path={ROUTES.ARTICLES_SLUG}
            component={({ match }) => <ArticleFull slug={match.params.slug} username={username} />}
          />
          <Route path={ROUTES.SIGN_UP} render={() => <SignUp />} />
          <Route
            path={ROUTES.SIGN_IN}
            render={() => (
              <SignIn handleUserData={handleUserData} handleEdditProfile={handleEdditProfile} />
            )}
          />
          <PrivateRouter
            redirectTo={ROUTES.SIGN_IN}
            component={EditProfile}
            isAuthorized={isAuthorized}
            handleUserData={handleUserData}
            handleEdditProfile={handleEdditProfile}
            path={ROUTES.PROFILE}
          />
          <PrivateRouter
            redirectTo={ROUTES.SIGN_IN}
            component={CreateEdditArticles}
            isAuthorized={isAuthorized}
            path={ROUTES.NEW_AERTICLE}
          />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
