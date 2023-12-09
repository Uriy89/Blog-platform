import React, { useState } from 'react';
import style from './SignUp.module.css';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';
import { postCreateUser } from '../../services';
import * as ROUTES from '../../constans/routers';

const SignUp = () => {
  const [pass, setPass] = useState('');
  const [checked, setChecked] = useState(true);
  const [err, setErr] = useState({});
  const history = useHistory();

  const {
    register,
    formState: { errors },
    watch,
    handleSubmit
  } = useForm({
    mode: 'onBlur'
  });

  const confirmPass = watch('rpassword', '');

  const onSubmitHandler = async (data) => {
    try {
      const { data: responseData, error: responseError } = await postCreateUser({ user: data });
      if (responseError) {
        setErr(responseError.errors);
      } else {
        localStorage.setItem('token', responseData.user.token);
        history.push(ROUTES.SIGN_IN);
        setErr({});
      }
    } catch (error) {
      console.log('Unexpected Error:', error);
    }
  };

  const checkboxClass = classNames({
    [style.checkBox]: true,
    [style.isCheked]: checked
  });

  return (
    <section className={style.signUp}>
      <div className={style.wrapper}>
        <h2 className={style.title}>Create new account</h2>
        <form className={style.form} onSubmit={handleSubmit(onSubmitHandler)}>
          <label className={style.label}>
            Username
            <input
              type="text"
              {...register('username', {
                required: true,
                defaultChecked: true,
                minLength: {
                  value: 3,
                  message: 'Name must be between 3 and 20 characters.'
                },
                maxLength: {
                  value: 20,
                  message: 'Name must be between 3 and 20 characters.'
                }
              })}
              name="username"
              placeholder="Username"
              className={style.input}
            />
          </label>
          <div className={style.error}>
            {errors?.username && <p>{errors?.username?.message}</p>}
            {Object.keys(err).map((key) =>
              key === 'username' ? <p>This username {err[key]}</p> : null
            )}
          </div>
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
              placeholder="Email"
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
              {...register('password', {
                required: true,
                minLength: {
                  value: 6,
                  message: 'Your password needs to be at least 6 characters.'
                }
              })}
              onChange={(e) => {
                setPass(e.target.value);
              }}
              name="password"
              placeholder="Password"
              className={style.input}
            />
          </label>
          <div className={style.error}>
            {errors?.password && <p>{errors?.password?.message}</p>}
          </div>
          <label className={style.label}>
            Repeat Password
            <input
              type="password"
              {...register('rpassword', {
                required: true
              })}
              name="rpassword"
              placeholder="Repeat password"
              className={style.input}
            />
          </label>
          <div className={style.error}>
            {pass === confirmPass ? null : <p>Passwords must match</p>}
          </div>
          <hr />
          <label className={style.agree}>
            <input
              type="checkbox"
              name="checkbox"
              className={style.agreeInput}
              onChange={() => {
                setChecked((checked) => !checked);
              }}
            />
            <span className={checkboxClass}></span>I agree to the processing of my personal
            information
          </label>
          <button className={style.createButton}>Create</button>
        </form>
        <span className={style.signIn}>
          Already have an account?{' '}
          <Link to={ROUTES.SIGN_IN}>
            <span>Sign In.</span>
          </Link>
        </span>
      </div>
    </section>
  );
};

export default SignUp;
