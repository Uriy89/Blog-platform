import React, { useState, useRef } from 'react';
import style from './CreateEdditArticles.module.css';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { createNewArticle } from '../../services';
import * as ROUTES from '../../constans/routers';
import { message } from 'antd';

const CreateEdditArticles = () => {
  const [tags, setTags] = useState([]);
  const [tagValue, setTagValue] = useState('');
  const history = useHistory();
  const token = localStorage.getItem('token');

  const maxId = useRef(11);
  const {
    register,
    formState: { errors },
    handleSubmit,
    unregister
  } = useForm({
    mode: 'onBlur'
  });

  const onSubmitHandler = async (data) => {
    const { body, description, title, ...tags } = data;
    const allTags = Object.entries(tags).map((el) => el[1]);
    const tagList = allTags.filter((element) => element.trim() !== '');
    const newData = { body, description, title, tagList };
    try {
      const responseData = await createNewArticle({ article: newData }, token);
      if (responseData.error) {
        console.error('Error in loginUser:', responseData.newData);
      } else {
        history.push(ROUTES.ARTICLES);
      }
    } catch (error) {
      console.log('Unexpected Error:', error);
    }
  };

  const deleteTag = (id) => {
    setTags((tag) => tag.filter((element) => element.id !== id));
    unregister(`tags${id}`);
  };

  const onAddTag = () => {
    unregister('tags0');
    if (tagValue.trim()) {
      setTags([...tags, { value: tagValue.trim(), id: String(maxId.current++) }]);
      setTagValue('');
    }
  };

  return (
    <section className={style.editProfile}>
      <div className={style.wrapper}>
        <div className={style.title}>
          <h2>Create new article</h2>
        </div>
        <form className={style.form} onSubmit={handleSubmit(onSubmitHandler)}>
          <label className={style.label}>
            Title
            <input
              type="text"
              name="title"
              placeholder="Title"
              className={style.input}
              {...register('title', {
                required: true,
                defaultChecked: true,
                minLength: {
                  value: 1,
                  message: 'title is a required field'
                }
              })}
            />
          </label>
          <div className={style.error}>{errors?.title && <p>{errors?.title?.message}</p>}</div>
          <label className={style.label}>
            Short description
            <input
              type="text"
              name="description"
              placeholder="Short description"
              className={style.input}
              {...register('description', {
                required: true,
                defaultChecked: true,
                minLength: {
                  value: 1,
                  message: 'description is a required field'
                }
              })}
            />
          </label>
          <div className={style.error}>
            {errors?.description && <p>{errors?.description?.message}</p>}
          </div>
          <label className={style.label}>
            Text
            <textarea
              name="body"
              placeholder="Text"
              className={style.input}
              {...register('body', {
                required: true,
                defaultChecked: true,
                minLength: {
                  value: 1,
                  message: 'body is a required field'
                }
              })}
            />
          </label>
          <div className={style.error}>{errors?.body && <p>{errors?.body?.message}</p>}</div>
          <div className={style.label}>
            <div>Tags</div>
            <div className={style.tags}>
              {tags.map((item) => {
                return (
                  <div className={style.tag} key={item.id}>
                    <input
                      id="tags"
                      type="text"
                      className={style.input}
                      placeholder="Tag"
                      {...register(`tags${item.id}`, {
                        value: item.value
                      })}
                    />
                    <button className={style.btnDelete} onClick={() => deleteTag(item.id)}>
                      Delete
                    </button>
                  </div>
                );
              })}
              <div className={style.tag}>
                <input
                  id="tags"
                  type="text"
                  className={style.input}
                  placeholder="Tag"
                  value={tagValue}
                  {...register('tags0', {
                    onChange: (e) => {
                      setTagValue(e.target.value);
                    }
                  })}
                />
                <button
                  type="button"
                  className={style.btnDelete}
                  onClick={() => {
                    setTagValue('');
                    unregister('tags0');
                  }}
                >
                  Delete
                </button>
                <button className={style.btnAdd} type="button" onClick={() => onAddTag()}>
                  Add
                </button>
              </div>
            </div>
          </div>
          <button className={style.send}>Send</button>
        </form>
      </div>
    </section>
  );
};

export default CreateEdditArticles;
