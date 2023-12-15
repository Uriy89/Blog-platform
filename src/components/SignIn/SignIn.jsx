import React, { useState } from 'react';
import style from './SignIn.module.css';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { loginUser } from '../../services';
import * as ROUTES from '../../constans/routers';

const SignIn = ({ handleUserData, handleEdditProfile }) => {
  const history = useHistory();
  const [err, setErr] = useState(false);
  const { 
    register, 
    handleSubmit,
    formState: { errors }, 
  } = useForm({
    mode: 'onBlur'
  });

  const onSubmitHandler = async (data) => {
    try {
      const { data: responseData, error: responseError } = await loginUser({ user: data });
      if (responseError) {
        console.error('Error in loginUser:', responseError.errors);
        setErr(true);
      } else {
        const { username, email, token, image } = responseData.user;
        handleUserData(token, username, email, image);
        handleEdditProfile(username, image);
        setErr(false);
        history.push(ROUTES.ROOT);
      }
    } catch (error) {
      console.log('Unexpected Error:', error);
      setErr(true);
    }
  };

  return (
    <section className={style.signIn}>
      <div className={style.wrapper}>
        <h2 className={style.title}>Sign In</h2>
        <form className={style.form} onSubmit={handleSubmit(onSubmitHandler)}>
          <label className={style.label}>
            Email address
            <input
              type="text"
              {...register('email', {
                required: true,
                pattern: {
                  value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                  message: 'Invalid email format'
                }
              })}
              name="email"
              placeholder="Email address"
              className={style.input}
            />
          </label>
          <div className={style.error}>
            {errors?.email && <p>{errors?.email?.message}</p>}
            {Object.keys(err).map((key) => (key === 'email' ? <p>This email {err[key]}</p> : null))}
          </div>
          <label className={style.label}>
            Password
            <input
              type="password"
              name="password"
              {...register('password', {
                required: {
                  value: true,
                  message: 'The password field is required for ignition'
                }
              })}
              placeholder="Password"
              className={style.input}
            />
          </label>
          {err && <p className={style.error}>email or password is invalid</p>}
          <button className={style.login}>Login</button>
        </form>
        <span className={style.signUp}>
          Don’t have an account?{' '}
          <Link to={ROUTES.SIGN_UP}>
            <span>Sign Up.</span>
          </Link>
        </span>
      </div>
    </section>
  );
};

export default SignIn;
