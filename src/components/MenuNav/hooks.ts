import { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Api } from 'apis';

import { fetchUserUnreadMsgNum } from 'store/login/reducer';
import { pathConfig } from 'config/constants/navConfig'

export const useFetchUnreadMsg = (notification) => {
  const [refreshMsg, setRefreshMsg] = useState(0)
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setInterval(() => {
      setRefreshMsg(prep => prep + 1)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {

    if (notification) {
      dispatch(fetchUserUnreadMsgNum());
    }

  }, [dispatch, refreshMsg, notification])

}

// 将消息变为已读
export const useReadMsg = (pathname) => {
  const dispatch = useDispatch();

  const getMessageRead = useCallback(async (type) => {
    const res = await Api.NewsApi.getMessageRead(type);
    if (Api.isSuccess(res)) {
      dispatch(fetchUserUnreadMsgNum());
    }
  }, [])
  useEffect(() => {
    let msgType
    switch (pathname) {
      case pathConfig.messageAtMePath:
        msgType = 1;
        break;
      case pathConfig.messageCommentPath:
        msgType = 2;
        break;
      case pathConfig.messageLikePath:
        msgType = 3;
        break;
      case pathConfig.messageNoticePath:
        msgType = 5;
        break;
    }
    if (msgType) {
      getMessageRead(msgType)
    }
  }, [pathname, getMessageRead])
}
