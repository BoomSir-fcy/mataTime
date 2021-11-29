import React from 'react';
import { ToastsContext } from 'contexts';

export const useToast = () => {
  const toastContext = React.useContext(ToastsContext);
  return toastContext;
};
