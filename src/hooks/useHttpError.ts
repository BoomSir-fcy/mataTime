import { useCallback, useEffect, useState } from 'react'
import eventBus from 'utils/eventBus';
import { useTranslation } from 'contexts/Localization';
import { useToast } from './useToast';
import translations from 'config/localization/translations.json'

const httpErrorCodes = (() => {
  const codes = []
  Object.keys(translations).filter(item => {
    if (item.includes('http-error-')) {
      codes.push(Number(item.split('http-error-')[1]))
    }
  })
  return codes
})()

// modified from https://usehooks.com/useDebounce/
export default function useHttpError() {
  const { toastSuccess, toastError, toastInfo } = useToast();
  const { t } = useTranslation();

  const httpErrorToast = useCallback((data: Api.Error) => {
    console.log(httpErrorCodes, data, '==httpErrorCodes')
    if (httpErrorCodes.includes(data.code)) {
      toastError(t(`http-error-${data.code}`));
    } else {
      toastError(t('服务器错误'));
    }
  }, [t, toastError])
  
  return httpErrorToast
}
