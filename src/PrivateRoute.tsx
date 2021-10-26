import React from 'react';
import { Route, Redirect} from 'react-router-dom';

export const PrivateRoute = ({ Component, ...rest }) => {
  
  let auth = {
    user: true
  };

  return (
    <Route {...rest}
      render={(props) =>
        auth.user ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}