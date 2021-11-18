import React, { useState, useEffect } from 'react';
import { ReportModal, ShieldModal, EditTwitterModal } from 'components';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux'
import { useTranslation } from 'contexts/Localization'
import {
  PopupWrapper,
  PopupContentWrapper
} from './style';

import { Api } from 'apis';
import { copyContent } from 'utils/copy';

export enum MoreOperatorEnum {
  SHIELD = 'SHIELD', // 屏蔽
  SETTOP = 'SETTOP',
  DELPOST = 'DELPOST',
  FOLLOW = 'FOLLOW',
  CANCEL_FOLLOW = 'CANCEL_FOLLOW'
}


type Iprops = {
  data: any;
  children: React.ReactElement;
  callback?: Function;
}

export const MorePopup = React.memo((props: Iprops) => {
  const { t } = useTranslation()
  const UID = useSelector((state: any) => state.loginReducer.userInfo.uid);

  const { children, data, callback = () => { } } = props
  const [visible, setVisible] = useState<boolean>(false);
  const [reportShow, setReportShow] = useState<boolean>(false);
  const [shieldShow, setShieldShow] = useState<boolean>(false);
  const [editShow, setEditShow] = useState<boolean>(false);
  const [isOwn, setIsOwn] = useState<boolean>(false);

  useEffect(() => {
    init()
  }, [])

  //  初始化
  const init = () => {
    // UID === data.post.user_id ? setIsOwn(true) : setIsOwn(false)
    UID === data.post.user_id ? setIsOwn(true) : setIsOwn(false)
  }

  // 收藏
  const onFavAgreeRequest = async (post_id: number) => {
    const res = await Api.ContentApi.onFavAgree(post_id);
    if (Api.isSuccess(res)) {
      callback({
        ...data,
        post: {
          ...data.post,
          is_fav: 1
        }
      })
      toast.success(t('moreCollectionSuccess'))
    } else {
      toast.error(res.msg || t('moreCollectionError'))
    }
    setVisible(false)
  }

  // 取消收藏
  const onFavCancelRequest = async (post_id: number) => {
    const res = await Api.ContentApi.onFavCancel(post_id);
    if (Api.isSuccess(res)) {
      callback({
        ...data,
        post: {
          ...data.post,
          is_fav: 0
        }
      })
      toast.success(t('moreCancelCollectionSuccess'))
    } else {
      toast.error(res.msg || t('moreCancelCollectionError'))
    }
    setVisible(false)
  }

  // 分享到Twitter
  const onShareTwitterClick = () => {
    window.open('http://twitter.com/home/?status='.concat(encodeURIComponent('share')).concat(' ').concat(encodeURIComponent(process.env.REACT_APP_WEB_URL + '/articleDetils/' + data.post.post_id)))
    setVisible(false)
  }

  // 置顶
  const onTopPostRequest = async (pid: number) => {
    const res = await Api.AttentionApi.setTopPost(pid);
    if (Api.isSuccess(res)) {
      callback(data, MoreOperatorEnum.SETTOP)
      toast.success(t('moreTopSuccess'))
    } else {
      toast.error(res.data || t('moreTopError'))
    }
    setVisible(false)
  }

  // 删除
  const onPostDelRequest = async (pid: number) => {
    const res = await Api.AttentionApi.delPost(pid);
    if (Api.isSuccess(res)) {
      callback(data, MoreOperatorEnum.DELPOST)
      toast.success(t('moreDeleteSuccess'))
    } else {
      toast.error(res.data || t('moreDeleteError'))
    }
    setVisible(false)
  }

  return (
    <>
      <PopupWrapper onMouseOver={(e: any) => {
        e.nativeEvent.stopImmediatePropagation() //阻止冒泡
        setVisible(true)
      }} onMouseLeave={(e: any) => {
        e.nativeEvent.stopImmediatePropagation() //阻止冒泡
        setVisible(false)
      }} onClick={(e: any) => {
        e.nativeEvent.stopImmediatePropagation() //阻止冒泡
        setVisible(false)
      }}>
        {children}
        {
          visible ? (
            <PopupContentWrapper onMouseLeave={(e: any) => {
              e.nativeEvent.stopImmediatePropagation() //阻止冒泡
              setVisible(false)
            }}>
              {
                isOwn ? (
                  <>
                    {/* <p onClick={() => {
                      setVisible(false)
                      setEditShow(true)
                    }}>{t('moreEdit')}</p> */}
                    <p onClick={() => {
                      onPostDelRequest(data.post.post_id)
                    }}>{t('moreDelete')}</p>
                    <p onClick={() => {
                      onTopPostRequest(data.post.post_id)
                    }}>{t('moreTop')}</p>
                  </>
                ) : null
              }

              <p onClick={() => {
                onShareTwitterClick()
              }}>{t('moreShareTwitter')}</p>
              <p onClick={() => {
                copyContent(process.env.REACT_APP_WEB_URL + '/articleDetils/' + data.post.post_id || '')
              }}>{t('moreCopyAddress')}</p>

              {
                !isOwn ? (
                  <>
                    <p onClick={() => {
                      data.post.is_fav === 1 ? onFavCancelRequest(data.post.post_id) : onFavAgreeRequest(data.post.post_id)
                    }}>{data.post.is_fav === 1 ? t('moreCancelCollection') : t('moreCollection')}</p>
                    <p onClick={() => {
                      setVisible(false)
                      setReportShow(true)
                    }}>{t('moreReport')}</p>
                    <p onClick={() => {
                      setVisible(false)
                      setShieldShow(true)
                    }}>{t('moreShield')}</p>
                  </>
                ) : null
              }

            </PopupContentWrapper>
          ) : null
        }
      </PopupWrapper>
      {/* 举报 */}
      <ReportModal
        show={reportShow}
        pid={data.post.post_id}
        onClose={() => {
          setVisible(false)
          setReportShow(false)
        }}
        onQuery={() => {
          setReportShow(false)
          callback(data)
          setVisible(false)
        }}
      ></ReportModal>
      {/* 屏蔽推特 */}
      <ShieldModal
        show={shieldShow}
        pid={data.post.post_id}
        onClose={() => {
          setShieldShow(false)
          setVisible(false)
        }}
        onQuery={() => {
          setShieldShow(false)
          callback(data, MoreOperatorEnum.SHIELD)
          setVisible(false)
        }}
      ></ShieldModal>
      {/* 编辑twitter */}
      <EditTwitterModal
        show={editShow}
        content={data.post.content}
        onClose={() => {
          setEditShow(false)
        }}
      ></EditTwitterModal>
    </>
  )
});
