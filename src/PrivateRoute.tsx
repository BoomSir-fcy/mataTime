import { Route, Redirect } from 'react-router-dom';
import { useProvideAuth } from 'hooks';

export const PrivateRoute = ({ Component, ...rest }) => {

  const authInfo = useProvideAuth();

  return (
    <Route {...rest}
      render={(props) =>
        Boolean(authInfo.userInfo.uuid) ? (
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