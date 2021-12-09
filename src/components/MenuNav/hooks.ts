import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { storeAction } from 'store';
import { Api } from 'apis';

import { pathConfig } from 'config/constants/navConfig'

// 将消息变为已读
export const useReadMsg = (pathname) => {
  const dispatch = useDispatch();

  const getMessageRead = useCallback(async (type, key: keyof Api.News.UnreadMsgNum) => {
    const res = await Api.NewsApi.getMessageRead(type);
    if (Api.isSuccess(res)) {
      // dispatch(fetchUserUnreadMsgNum());
      dispatch(storeAction.setUserUnreadMsgNum({ [key]: 0 }))

    }
  }, [])
  //   message_at_me: 0
  // message_comment: 2
  // message_like: 0
  // message_secret: 0
  // message_system: 0
  // message_timestamp: 0
  useEffect(() => {
    let msgType
    let key
    switch (pathname) {
      case pathConfig.messageAtMePath:
        msgType = 1;
        key = 'message_at_me'
        break;
      case pathConfig.messageCommentPath:
        msgType = 2;
        key = 'message_comment'
        break;
      case pathConfig.messageLikePath:
        msgType = 3;
        key = 'message_like'
        break;
      case pathConfig.messageNoticePath:
        msgType = 5;
        key = 'message_system'
        break;
    }
    if (msgType) {
      getMessageRead(msgType, key)
    }
  }, [pathname, getMessageRead])
}
