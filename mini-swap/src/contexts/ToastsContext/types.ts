import { Toast } from 'pancake-uikit'

type ToastSignature = (
  title: Toast['title'],
  description?: Toast['description'],
  customIcon?: Toast['customIcon'],
) => void
type ToastCustom = (opt: {
  title: Toast['title']
  description?: Toast['description']
  customIcon?: Toast['customIcon']
  ttl?: Toast['ttl']
  width?: Toast['width']
  stackSpacing?: Toast['stackSpacing']
}) => string

export interface ToastContextApi {
  toasts: Toast[]
  clear: () => void
  remove: (id: string) => void
  toastError: ToastSignature
  toastInfo: ToastSignature
  toastSuccess: ToastSignature
  toastWarning: ToastSignature
  toastCustom: ToastCustom
}
