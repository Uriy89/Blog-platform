import React, { useState } from 'react';
import style from './EditProfile.module.css';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { changeUserData } from '../../services';
import * as ROUTES from '../../constans/routers';
import * as SERVICES from '../../constans/services';

const EditProfile = (props) => {
  const { handleUserData, handleEdditProfile } = props;
  const username = localStorage.getItem(SERVICES.USER_NAME);
  const useremail = localStorage.getItem(SERVICES.EMAIL);
  const history = useHistory();
  const [err, setErr] = useState({});

  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      username: username || '',
      email: useremail || '',
      password: ''
    }
  });

  const onSubmitHandler = async (data) => {
    try {
      const responseData = await changeUserData({ user: data });
      if (responseData.error) {
        console.error('Error in loginUser:', responseData.data);
      } else {
        const { username, email, token, image } = responseData.data.user;
        handleUserData(token, username, email, image);
        handleEdditProfile(username, image);
        history.push(ROUTES.ROOT);
      }
    } catch (error) {
      console.log('Unexpected Error:', error);
    }
  };

  return (
    <section className={style.editProfile}>
      <div className={style.wrapper}>
        <h2 className={style.title}>Eddit profile</h2>
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
            New password
            <input
              type="password"
              {...register('password', {
                required: false
              })}
              name="password"
              placeholder="New password"
              className={style.input}
            />
          </label>
          <div className={style.error}>
            {errors?.password && <p>{errors?.password?.message}</p>}
          </div>
          <label className={style.label}>
            Avatar image (url)
            <input
              type="text"
              {...register('image', { required: 'This field is required' })}
              placeholder="Avatar image"
              className={style.input}
            />
          </label>
          <div className={style.error}>{errors?.image && <p>{errors?.image?.message}</p>}</div>
          <button className={style.save}>Save</button>
        </form>
      </div>
    </section>
  );
};

export default EditProfile;
