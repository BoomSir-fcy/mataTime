import { useCallback, useEffect } from 'react'
import { storeAction } from 'store';
import { useDispatch } from 'react-redux';
import { IM } from 'utils';
import useIm from './useIm'

// 未读消息通知
const useUnreadMsg = (flag?: number | boolean) => {
  const dispatch = useDispatch();
  const { im } = useIm()

  const handleNewMsg = useCallback((event) => {
    const { data: { data } } = event
    dispatch(storeAction.setUserUnreadMsgNum(data))
  }, [dispatch])

  useEffect(() => {
    if (im) {
      im.addEventListener(IM.EventType.UNREAD_NOTIFY, handleNewMsg)
    }
    return () => {
      if (im) {
        im.removeEventListener(IM.EventType.UNREAD_NOTIFY, handleNewMsg)
      }
    }
  }, [im])

}

export default useUnreadMsg