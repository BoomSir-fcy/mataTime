import React from 'react';
import { toast } from 'react-toastify';
import { kebabCase } from 'lodash';

const toastTypes = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warn',
  INFO: 'info'
};

export const ToastsContext = React.createContext({} as ToastContextApi);
export const ToastsProvider: React.FC = ({ children }) => {
  const toastFunc = React.useCallback((title, type) => {
    const toastId = title ? kebabCase(title) : kebabCase(`${+new Date()}`);
    toast[type](title, { toastId });
  }, []);

  const toastSuccess = (title: string) => {
    return toastFunc(title, toastTypes.SUCCESS);
  };

  const toastWarning = (title: string) => {
    return toastFunc(title, toastTypes.WARNING);
  };
  
  const toastInfo = (title: string) => {
    return toastFunc(title, toastTypes.INFO);
  };

  const toastError = (title: string) => {
    return toastFunc(title, toastTypes.ERROR);
  };

  return (
    <ToastsContext.Provider value={{ toastSuccess, toastWarning, toastInfo, toastError }}>
      {children}
    </ToastsContext.Provider>
  );
};
