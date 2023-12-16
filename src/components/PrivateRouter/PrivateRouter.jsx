import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRouter = ({
  redirectTo,
  component: Component,
  isAuthorized,
  handleUserData,
  handleEdditProfile,
  onIsArticleEdit,
  isArticleEdit,

  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthorized ? (
          <Component
            {...props}
            handleUserData={handleUserData}
            handleEdditProfile={handleEdditProfile}
            onIsArticleEdit={() => onIsArticleEdit()}
            isArticleEdit={isArticleEdit}
          />
        ) : (
          <Redirect to={{ pathname: redirectTo, state: { from: props.location } }} />
        )
      }
    />
  );
};

export default PrivateRouter;
