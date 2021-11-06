import React, { useState, useEffect } from 'react';
import { Icon } from 'components';
import { toast } from 'react-toastify';
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

import { Api } from 'apis';

type IProp = {
  show: boolean;
  pid: number;
  onClose: Function;
  onQuery: Function;
}

export const ShieldModal = React.memo((props: IProp) => {
  const { show, onClose, pid, onQuery } = props

  // 屏蔽
  const onShieldRequest = async () => {
    const res = await Api.AttentionApi.addShield(pid);
    if (Api.isSuccess(res)) {
      toast.success('屏蔽成功！')
      onQuery()
    } else {
      toast.error(res.data || '屏蔽失败！')
      onClose()
    }
  }


  return (
    <>
      {
        show ? (
          <ModalWrapper>
            <ReportModalWrapper>
              <ModalTitleWrapper>
                <h4>是否屏蔽这条推特?</h4>
              </ModalTitleWrapper>
              <ShieldContentWrapper>
                {/* <div className="img-box"></div> */}
                <div className="des-box">屏蔽该推特后，该推特将不会出现在你的推特列表中！</div>
              </ShieldContentWrapper>
              <ModalOperator onClose={onClose} onQuery={() => {
                onShieldRequest()
              }}></ModalOperator>
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
      <ModalOperatorQueryWrapper onClick={() => { onQuery() }}>确认</ModalOperatorQueryWrapper>
      <ModalOperatorCancerWrapper onClick={() => { onClose() }}>取消</ModalOperatorCancerWrapper>
    </ModalOperatorWrapper>
  )
})