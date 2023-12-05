import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import styles from './App.module.css';
import ArticlesList from '../ArticlesList';
import ArticleFull from '../ArticleFull';
import SignUp from '../SignUp';
import SignIn from '../SignIn';
import EditProfile from '../EditProfile';


const App = () => {
  
  return (
    <Router>
      <header className={styles.mainHeader}>
        <Link to={'/'}><h1 className={styles.title}>Realworld Blog</h1></Link>
        <div className={styles.headerButtons}>
          <Link to='/sign-in'><button type='button' className={styles.signIn}>Sign In</button></Link>
          <Link to='/sign-up'><button type='button' className={styles.signUp}>Sign Up</button></Link>
        </div>
      </header>
      <div className="wrapper">
        <Route 
          path={['/', '/articles']} 
          exact 
          component={() => <ArticlesList/>}
          />
          <Route path='/articles/:slug' component={({ match }) => (
                       <ArticleFull slug={match.params.slug}/>
          )}/>
          <Route path='/sign-up' render={() => <SignUp />}/>
          <Route path='/sign-in' component={() => <SignIn />}/>
          <Route path='/profile' component={() => <EditProfile />}/>
      </div>  
      </Router>
  );
}

export default App;
