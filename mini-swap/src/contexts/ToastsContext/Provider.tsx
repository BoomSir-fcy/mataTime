import React, { createContext, ReactNode, useCallback, useState } from 'react'
import { kebabCase } from 'lodash'
import { Toast, toastTypes, ToastContainerProps } from 'pancake-uikit'
import { ToastContextApi } from './types'

export const ToastsContext = createContext<ToastContextApi>(undefined)

export const ToastsProvider: React.FC = ({ children }) => {
  const [toasts, setToasts] = useState<ToastContextApi['toasts']>([])

  const toast = useCallback(
    ({ title, description, type, custom, ttl, hideRemove, width, stackSpacing }: Omit<Toast, 'id'>) => {
      const id = title ? kebabCase(title) : kebabCase(`${+new Date()}`)
      setToasts((prevToasts) => {

        // Remove any existing toasts with the same id
        const currentToasts = prevToasts.filter((prevToast) => prevToast.id !== id)

        return [
          {
            id,
            title,
            description,
            type,
            custom,
            ttl,
            width,
            stackSpacing,
            hideRemove,
          },
          ...currentToasts,
        ]
      })
      return id
    },
    [setToasts],
  )

  const toastError = (title: string, description?: ReactNode) => {
    return toast({ title, description, type: toastTypes.DANGER })
  }
  const toastInfo = (title: string, description?: ReactNode) => {
    return toast({ title, description, type: toastTypes.INFO })
  }
  const toastSuccess = (title: string, description?: ReactNode) => {
    return toast({ title, description, type: toastTypes.SUCCESS })
  }
  const toastWarning = (title: string, description?: ReactNode) => {
    return toast({ title, description, type: toastTypes.WARNING })
  }
  const toastCustom = ({
    title,
    description,
    customIcon,
    ttl,
    width,
    stackSpacing,
    hideRemove,
  }: {
    title: Toast['title']
    description?: Toast['description']
    customIcon?: Toast['customIcon']
    ttl?: Toast['ttl']
    width?: Toast['width']
    stackSpacing?: Toast['stackSpacing']
    hideRemove?: Toast['hideRemove']
  }) => {
    return toast({ title, description, hideRemove, customIcon, ttl, width, stackSpacing, type: toastTypes.CUSTOM })
  }
  const clear = () => setToasts([])
  const remove = (id: string) => {
    setToasts((prevToasts) => prevToasts.filter((prevToast) => prevToast.id !== id))
  }

  return (
    <ToastsContext.Provider
      value={{ toasts, clear, remove, toastError, toastInfo, toastSuccess, toastWarning, toastCustom }}
    >
      {children}
    </ToastsContext.Provider>
  )
}
