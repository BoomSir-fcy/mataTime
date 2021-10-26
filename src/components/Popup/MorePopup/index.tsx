import React, { useState, useEffect } from 'react';
import { ReportModal } from 'components';
import {
  PopupWrapper,
  PopupContentWrapper
} from './style';

type Iprops = {
  children: React.ReactElement;
}

export const MorePopup = React.memo((props: Iprops) => {
  const { children } = props
  const [visible, setVisible] = useState<boolean>(false);
  const [reportShow, setReportShow] = useState<boolean>(false);

  useEffect(() => {
    addEventListener()
  }, [])

  const addEventListener = () => {
    document.addEventListener('click', (e) => {
      setVisible(false)
    })
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
            <p>复制内容地址</p>
            <p>收藏</p>
            <p onClick={() => { setReportShow(true) }}>举报该条</p>
            <p>屏蔽作者</p>
          </PopupContentWrapper>
        ) : null
      }
      {/* 举报 */}
      <ReportModal show={reportShow} onClose={() => { setReportShow(false) }}></ReportModal>
    </PopupWrapper>
  )
});