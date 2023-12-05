import React from "react";
import style from "./SignIn.module.css";
import { Link } from 'react-router-dom';

const SignIn = () => {
    return (
      <section className={style.signIn}>
      <div className={style.wrapper}>
        <h2 className={style.title}>Create new account</h2>
        <form action="" className={style.form}>
          <label htmlFor="email" className={style.label}>Email address</label>
          <input type="text" name="email" placeholder="Email address" className={style.input}/>
          <label htmlFor="password" className={style.label}>Password</label>
          <input type="text" name="password" placeholder="Password" className={style.input}/>
          <button className={style.login}>Login</button>
        </form>
        <span className={style.signUp}>Don’t have an account? <Link to='/sign-up'><span>Sign Up.</span></Link></span>
      </div>
    </section>
    )
}

export default SignIn;
 