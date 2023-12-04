import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import styles from './App.module.css';
import ArticlesList from '../ArticlesList';
import ArticleFull from '../ArticleFull';


const App = () => {
  
  return (
    <Router>
      <header className={styles.mainHeader}>
        <h1 className={styles.title}>Realworld Blog</h1>
        <div className={styles.headerButtons}>
          <button type='button' className={styles.headerButton}>Sign In</button>
          <button type='button' className={styles.headerButton}>Sign Up</button>
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
        
      </div>  
      </Router>
  );
}

export default App;
