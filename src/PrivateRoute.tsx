import { Route, Redirect } from 'react-router-dom';
import { useProvideAuth } from 'hooks';

export const PrivateRoute = ({ component, ...rest }) => {
  const authInfo = useProvideAuth();
  const { uid } = authInfo;
  const Component = component;

  return (
    <Route
      {...rest}
      render={props =>
        !Boolean(uid) ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};
