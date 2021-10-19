import React from 'react';
import { toast as toastFun, ToastContainer } from 'react-toastify';
import { useStore, Dispatch } from 'store';

import 'react-toastify/dist/ReactToastify.css';

export const Toast: React.FC = React.memo(() => {

  // const toastReducer = useStore(p => p.appReducer);
  // console.log(toastReducer);
  // const timer = React.useRef<NodeJS.Timeout>();
  // const { toast, show } = toastReducer;
  // const { type, text, toastContainer } = toast;

  // React.useEffect(() => {
  //   if (show) {
  //     toastFun[type](text);
  //     if (timer.current) {
  //       clearTimeout(timer.current);
  //     }
  //     timer.current = setTimeout(() => Dispatch.toast.hide(), 2000);
  //   }
  //   return () => timer.current && clearTimeout(timer.current);
  // }, [show, type, text]);

  return (
    <ToastContainer
      position="top-right"
      // limit={3}
      autoClose={3000}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      hideProgressBar
      pauseOnFocusLoss
      draggable
      pauseOnHover />
  )
})
