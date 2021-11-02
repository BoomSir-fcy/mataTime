import React, { useState, useEffect } from 'react';
import { ReportModal, ShieldModal } from 'components';
import {
  PopupWrapper,
  PopupContentWrapper
} from './style';

import { Api } from 'apis';
import { copyContent } from 'utils/copy';

type Iprops = {
  children: React.ReactElement;
}

export const MorePopup = React.memo((props: Iprops) => {
  const { children } = props
  const [visible, setVisible] = useState<boolean>(false);
  const [reportShow, setReportShow] = useState<boolean>(false);
  const [shieldShow, setShieldShow] = useState<boolean>(false);

  useEffect(() => {
    addEventListener()
  }, [])

  const addEventListener = () => {
    document.addEventListener('click', (e) => {
      setVisible(false)
    })
  }

  // 收藏
  const onFavAgreeRequest = async () => {
    const res = await Api.ContentApi.onFavAgree(1);
    if (res.code === 1) {

    }
  }

  // 取消收藏
  const onFavCancelRequest = async () => {
    const res = await Api.ContentApi.onFavCancel(1);
    if (res.code === 1) {

    }
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
            <p>分享到Twitter</p>
            <p onClick={() => {
              copyContent('这是复制的内容！')
            }}>复制内容地址</p>
            <p onClick={() => {
              onFavAgreeRequest()
            }}>收藏</p>
            <p onClick={() => { setReportShow(true) }}>举报该条</p>
            <p onClick={() => { setShieldShow(true) }}>屏蔽作者</p>
          </PopupContentWrapper>
        ) : null
      }
      {/* 举报 */}
      <ReportModal show={reportShow} onClose={() => { setReportShow(false) }}></ReportModal>
      {/* 屏蔽作者 */}
      <ShieldModal show={shieldShow} onClose={() => { setShieldShow(false) }}></ShieldModal>
    </PopupWrapper>
  )
});