import React from 'react';
import ArticleForm from '../ArticleForm';

const CreateArticle = ({ isEditArticle }) => {
  return (
    <ArticleForm
      isEditArticle={isEditArticle}
    />
  );
};

export default CreateArticle;
