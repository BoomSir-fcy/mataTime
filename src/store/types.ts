
import { ToastContainerProps } from 'react-toastify';

export interface AppStore {
  isDark: boolean,
  show: boolean,
  toast: {
    type: string,
    text: string,
    toastContainer?: ToastContainerProps
  }
}