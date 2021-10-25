import React from 'react';
import { useProvideAuth } from 'hooks';

export const AuthContext = React.createContext({});
export const ProvideAuth: React.FC = ({ children }) => {
  const auth = useProvideAuth();
  
  return (
    <AuthContext.Provider value={{...auth}}>
      {children}
    </AuthContext.Provider>
  );
}