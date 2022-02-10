import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { kebabCase } from 'lodash';
import { Flex, Text } from 'uikit';

const toastTypes = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warn',
  INFO: 'info',
};

export const ToastsContext = React.createContext({} as ToastContextApi);
export const ToastsProvider: React.FC = ({ children }) => {
  const toastFunc = React.useCallback(
    (title, type, url?: string, urlText?: string) => {
      const toastId = title ? kebabCase(title) : kebabCase(`${+new Date()}`);
      toast[type](url ? toastWithLink(title, url, urlText) : title, {
        toastId,
      });
    },
    [],
  );

  const toastWithLink = (title, url, urlText) => (
    <Link to={url}>
      <Text color='rgb(117, 117, 117)'>{title}</Text>
      <Text ml='10px' color='rgb(117, 117, 117)'>
        {urlText}
      </Text>
    </Link>
  );

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

  const toastLink = (title: string, url: any, urlText: string) => {
    return toastFunc(title, toastTypes.SUCCESS, url, urlText);
  };

  return (
    <ToastsContext.Provider
      value={{ toastSuccess, toastWarning, toastInfo, toastError, toastLink }}
    >
      {children}
    </ToastsContext.Provider>
  );
};
