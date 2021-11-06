import React, { useState, useEffect } from 'react';
import { ReportModal, ShieldModal } from 'components';
import { toast } from 'react-toastify';
import {
  PopupWrapper,
  PopupContentWrapper
} from './style';

import { Api } from 'apis';
import { copyContent } from 'utils/copy';

export enum MoreOperatorEnum {
  SHIELD, // 屏蔽
}


type Iprops = {
  data: any;
  children: React.ReactElement;
  callback?: Function;
}

export const MorePopup = React.memo((props: Iprops) => {
  const { children, data, callback = () => { } } = props
  const [visible, setVisible] = useState<boolean>(false);
  const [reportShow, setReportShow] = useState<boolean>(false);
  const [shieldShow, setShieldShow] = useState<boolean>(false);
  const [isOwn, setIsOwn] = useState<boolean>(false);

  useEffect(() => {
    addEventListener()
  }, [])

  const addEventListener = () => {
    document.addEventListener('click', (e) => {
      setVisible(false)
    })
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
      toast.success('收藏成功！')
    } else {
      toast.error(res.msg || '收藏失败！')
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
      toast.success('取消收藏成功！')
    } else {
      toast.error(res.msg || '取消收藏失败！')
    }
    setVisible(false)
  }

  // 分享到Twitter
  const onShareTwitterClick = () => {
    window.open('http://twitter.com/home/?status='.concat(encodeURIComponent('分享title')).concat(' ').concat(encodeURIComponent('https://www.baidu.com')))
    setVisible(false)
  }

  return (
    <PopupWrapper onClick={(e: any) => {
      e.nativeEvent.stopImmediatePropagation() //阻止冒泡
      setVisible(true)
    }}>
      {children}
      {
        visible ? (
          <PopupContentWrapper>
            {
              isOwn ? (
                <>
                  <p onClick={() => {

                  }}>编辑</p>
                  <p onClick={() => {

                  }}>删除</p>
                  <p onClick={() => {

                  }}>置顶</p>
                </>
              ) : null
            }

            <p onClick={() => {
              onShareTwitterClick()
            }}>分享到Twitter</p>
            <p onClick={() => {
              copyContent(data.post.post_id || '无可复制到内容！')
            }}>复制内容地址</p>
            <p onClick={() => {
              data.post.is_fav === 1 ? onFavCancelRequest(data.post.post_id) : onFavAgreeRequest(data.post.post_id)
            }}>{data.post.is_fav === 1 ? '取消收藏' : '收藏'}</p>
            {
              !isOwn ? (
                <>
                  <p onClick={() => {
                    setVisible(false)
                    setReportShow(true)
                  }}>举报该条</p>
                  <p onClick={() => {
                    setVisible(false)
                    setShieldShow(true)
                  }}>屏蔽</p>
                </>
              ) : null
            }

          </PopupContentWrapper>
        ) : null
      }
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
    </PopupWrapper>
  )
});