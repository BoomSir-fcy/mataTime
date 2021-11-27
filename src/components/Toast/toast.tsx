import React from 'react';
import { ToastContainer, ToastContainerProps } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

export const ToastComponents: React.FC<ToastContainerProps> = React.memo(() => {
  return (
    <ToastContainer
      containerId="toast"
      position="top-right"
      limit={5}
      autoClose={3000}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      hideProgressBar
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );
});
