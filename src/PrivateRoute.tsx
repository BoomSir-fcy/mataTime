import { Route, Redirect} from 'react-router-dom';
import { useProvideAuth } from 'hooks';

export const PrivateRoute = ({ Component, ...rest }) => {

  const authInfo = useProvideAuth();  
  const { UID }: any = authInfo.userInfo;

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