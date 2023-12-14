import React, { useState, useRef, useEffect } from 'react';
import style from './CreateEdditArticles.module.css';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { createNewArticle, getArticleBySlug, editArticle } from '../../services';
import * as ROUTES from '../../constans/routers';

const CreateEdditArticles = ({ isArticleEdit }) => {
  const { slug } = useParams();
  const [tags, setTags] = useState([]);
  const [tagValue, setTagValue] = useState('');
  const history = useHistory();
  const token = localStorage.getItem('token');

  const maxId = useRef(11);
  const {
    register,
    formState: { errors },
    handleSubmit,
    unregister,
    setValue,
  } = useForm({
    mode: 'onBlur'
  });

  useEffect(() => {
    if (slug) {
      getArticleBySlug(slug)
      .then((element) => {
        setValue('title', element.article.title);
        setValue('description', element.article.description);
        setValue('body', element.article.body);
        setTags(
          element.article.tagList.map((item) => {
            return { value: item, id: String(maxId.current++) };
          })
        );

      })
      .catch(() => console.log(true));
    }
  }, [slug])


  const onSubmitHandler = (data) => {
      const { body, description, title, ...tags } = data;
      const allTags = Object.entries(tags).map((el) => el[1]);
      const tagList = [...new Set(allTags.filter((element) => element.trim() !== ''))];
      const newData = { body, description, title, tagList };
      if(!slug) {
        createNewArticle({ article: newData }, token)
          .then(() => history.push(ROUTES.ARTICLES))
          .catch((err) => console.error('Create article error: ', err))
      } else {
        console.log('edit: ', newData)
        editArticle(slug, { article: newData })
          .then((data) => history.push(ROUTES.ROOT))
          .catch((err) => console.error('Edit article error: ', err));
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
          <h2>{isArticleEdit ? 'Edit article' : 'Create new article'}</h2>
        </div>
        <form className={style.form} onSubmit={handleSubmit(onSubmitHandler)}>
          <label className={style.label}>
            Title
            <input
              type="text"
              id="title"
              autoFocus
              placeholder="Title"
              className={style.input}
              {...register('title')}
            />
          </label>
          <div className={style.error}>{errors?.title && <p>{errors?.title?.message}</p>}</div>
          <label className={style.label}>
            Short description
            <input
              type="text"
              id="description"
              placeholder="Short description"
              className={style.input}
              {...register('description')}
            />
          </label>
          <div className={style.error}>
            {errors?.description && <p>{errors?.description?.message}</p>}
          </div>
          <label className={style.label}>
            Text
            <textarea
              id="body"
              placeholder="Text"
              className={style.input}
              {...register('body')}
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
