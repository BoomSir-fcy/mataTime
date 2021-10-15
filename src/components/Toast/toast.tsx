import React from 'react';
import { toast as toastFun, ToastContainer } from 'react-toastify';
import { useStore, Dispatch } from 'store';

import 'react-toastify/dist/ReactToastify.css';

export const Toast: React.FC = React.memo(() => {

  const toastReducer = useStore(p => p.testReducer);
  const { toast, show } = toastReducer;
  const { type, text } = toast;

  React.useEffect(() => {
    if (show) {
      toastFun[type](text);
      Dispatch.toast.hide();
    }
  }, [show]);

  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      hideProgressBar
      pauseOnFocusLoss
      draggable
      pauseOnHover/>
  )
})
