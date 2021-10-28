import React, { useState, useEffect } from 'react';
import { ModalOperator } from 'components';
import {
  ModalWrapper,
  ModalTitleWrapper,
  ReportModalWrapper
} from 'components/ModalWrapper/ReportModal/style';

import {
  CancelAttentionContentWrapper
} from './style';

type IProp = {
  show: boolean;
  onClose: Function;
}

export const CancelAttentionModal = React.memo((props: IProp) => {
  const { show, onClose } = props
  return (
    <>
      {
        show ? (
          <ModalWrapper>
            <ReportModalWrapper>
              <ModalTitleWrapper>
                <h4>是否屏蔽Ta?</h4>
              </ModalTitleWrapper>
              <CancelAttentionContentWrapper>
                <div className="img-box"></div>
                <div className="des-box">取消关注用户<a>@0x5...684</a>，将无法获取Ta的最新动态、信息</div>
              </CancelAttentionContentWrapper>
              <ModalOperator onClose={onClose} onQuery={() => { }}></ModalOperator>
            </ReportModalWrapper>
          </ModalWrapper>
        ) : null
      }
    </>
  )
});
