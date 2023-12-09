import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import styles from "./App.module.css";
import * as ROUTES from '../../constans/routers';
import * as SERVICES from '../../constans/services';
import PrivateRouter from '../PrivateRouter';
import ArticlesList from '../ArticlesList';
import EditProfile from '../EditProfile';
import ArticleFull from '../ArticleFull';
import SignUp from '../SignUp';
import SignIn from '../SignIn';
import Header from '../Header';


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
    if(token !== null) {
      setIsAuthorized(true);
    }
  }, []);

  return (
    <Router>
      <header className={styles.mainHeader}>
        <Link to={ROUTES.ROOT}>
          <h1 className={styles.title}>Realworld Blog</h1>
        </Link>
        <Header isAuthorized={isAuthorized} handleLogout={handleLogout} username={username} image={image}/>
      </header>
      <div className="wrapper">
        <Switch>
          <Route path={[ROUTES.ROOT, ROUTES.ARTICLES]} exact component={() => <ArticlesList />} />
          <Route
            path={ROUTES.ARTICLES_SLUG}
            component={({ match }) => <ArticleFull slug={match.params.slug} />}
          />
          <Route path={ROUTES.SIGN_UP} render={() => <SignUp />} />
          <Route path={ROUTES.SIGN_IN} render={() => <SignIn handleUserData={handleUserData}/>} />
          <PrivateRouter 
            redirectTo={ROUTES.SIGN_IN} 
            component={EditProfile} 
            isAuthorized={isAuthorized} 
            handleUserData={handleUserData}
            handleEdditProfile={handleEdditProfile}
            path={ROUTES.PROFILE}
          />
        </Switch>
      </div>
    </Router>
  );
};

export default App;