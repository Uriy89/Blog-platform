import React from "react";
import ArticleForm from '../ArticleForm';

const EdditArticle = ({ isEditArticle }) => {
  return (
    <ArticleForm
      isEditArticle={isEditArticle}
    />
  );
}

export default EdditArticle;
