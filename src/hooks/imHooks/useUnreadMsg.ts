import { useCallback, useEffect } from 'react'
import { storeAction, useStore } from 'store';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'contexts';
import { IM } from 'utils';
import useIm from './useIm'

// 未读消息通知
const useUnreadMsg = (flag?: number | boolean) => {
  const dispatch = useDispatch();
  const { im } = useIm()
  const { t } = useTranslation();
  const setting = useStore(p => p.loginReducer.userInfo);
  const unReadMsg = useStore(p => p.loginReducer.unReadMsg);

  const getMessageBody = useCallback((newMsg) => {
    if (newMsg.message_at_me !== unReadMsg.message_at_me) {
      return t("Someone mentioned you")
    }
    if (newMsg.message_comment !== unReadMsg.message_comment) {
      return t("Someone left you a comment")
    }
    if (newMsg.message_like !== unReadMsg.message_like) {
      return t("Someone liked your post or comment")
    }
    if (newMsg.message_system !== unReadMsg.message_system) {
      return t("You have a system notification")
    }
    return t("You have a new message")
  }, [unReadMsg, t])

  const handleNewMsg = useCallback((event) => {
    const { data: { data } } = event
    dispatch(storeAction.setUserUnreadMsgNum(data))
    if (setting.msg_remind === 1) {
      try {
        const notice = new Notification(t("newsNoticeMenuTitle"), { body: getMessageBody(data) }); // 显示通知
      } catch (error) {
        console.error(error)
      }
    }
  }, [dispatch, t, setting.msg_remind])

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