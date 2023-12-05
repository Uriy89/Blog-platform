import React, { useState } from 'react';
import style from './SignUp.module.css';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';

const SignUp = () => {
  const [pass, setPass] = useState('');
  const [checked, setChecked] = useState(true);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch
  } = useForm({
    mode: 'onBlur'
  });

  const confirmPass = watch('rpassword', '');

  const checkboxClass = classNames({
    [style.checkBox]: true,
    [style.isCheked]: checked
  });

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
    reset();
  };

  return (
    <section className={style.signUp}>
      <div className={style.wrapper}>
        <h2 className={style.title}>Create new account</h2>
        <form className={style.form} onSubmit={handleSubmit(onSubmit)}>
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
          <div className={style.error}>{errors?.email && <p>{errors?.email?.message}</p>}</div>
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
              onChange={(e) => setPass(e.target.value)}
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
              onChange={() => setChecked(!checked)}
            />
            <span className={checkboxClass}></span>I agree to the processing of my personal
            information
          </label>
          <button className={style.createButton}>Create</button>
        </form>
        <span className={style.signIn}>
          Already have an account?{' '}
          <Link to="/sign-in">
            <span>Sign In.</span>
          </Link>
        </span>
      </div>
    </section>
  );
};

export default SignUp;
