import { Route, Redirect } from 'react-router-dom';
import { useProvideAuth } from 'hooks';

export const PrivateRoute = ({ component, ...rest }) => {

  const authInfo = useProvideAuth();  
  const { UID } = authInfo;
  const Component = component;
  
  return (
    <Route {...rest}
      render={(props) =>
        Boolean(UID) ? (
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