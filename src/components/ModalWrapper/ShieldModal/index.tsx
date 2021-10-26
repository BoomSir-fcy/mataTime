import React, { useState, useEffect } from 'react';
import { Icon } from 'components';
import {
  ModalWrapper,
  ModalTitleWrapper,
  ReportModalWrapper
} from 'components/ModalWrapper/ReportModal/style';

import {
  ShieldContentWrapper,
  ModalOperatorWrapper,
  ModalOperatorQueryWrapper,
  ModalOperatorCancerWrapper
} from './style';

type IProp = {
  show: boolean;
  onClose: Function;
}

export const ShieldModal = React.memo((props: IProp) => {
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
              <ShieldContentWrapper>
                <div className="img-box"></div>
                <div className="des-box">屏蔽用户<a>@0x5...684</a>，将无法获取查看Ta的最新动态、信息，屏蔽后可在“个人主页”取消屏蔽</div>
              </ShieldContentWrapper>
              <ModalOperator onClose={onClose} onQuery={() => { }}></ModalOperator>
            </ReportModalWrapper>
          </ModalWrapper>
        ) : null
      }
    </>
  )
});


type OperatorIprop = {
  onQuery: Function;
  onClose: Function;
}
export const ModalOperator = React.memo((props: OperatorIprop) => {
  const { onQuery, onClose } = props
  return (
    <ModalOperatorWrapper>
      <ModalOperatorQueryWrapper>确认</ModalOperatorQueryWrapper>
      <ModalOperatorCancerWrapper onClick={() => { onClose() }}>取消</ModalOperatorCancerWrapper>
    </ModalOperatorWrapper>
  )
})