import { Api } from 'apis';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserUnreadMsgNum } from 'store/login/reducer';
import { useCallback, useEffect } from 'react';
import { pathConfig } from './config'

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
    switch(pathname) {
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