import React, { useState, useEffect } from 'react';
import { Icon } from 'components';
import { toast } from 'react-toastify';
import { useTranslation } from 'contexts/Localization'
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
  const { t } = useTranslation()
  const { show, onClose, pid, onQuery } = props

  // 屏蔽
  const onShieldRequest = async () => {
    const res = await Api.AttentionApi.addShield(pid);
    if (Api.isSuccess(res)) {
      toast.success(t('shieldModalShieldSuccess'))
      onQuery()
    } else {
      toast.error(res.data || t('shieldModalShieldError'))
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
                <h4>{t('shieldModalTitle')}</h4>
              </ModalTitleWrapper>
              <ShieldContentWrapper>
                {/* <div className="img-box"></div> */}
                <div className="des-box">{t('shieldModalDes')}</div>
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
  const { t } = useTranslation()
  const { onQuery, onClose } = props
  return (
    <ModalOperatorWrapper>
      <ModalOperatorQueryWrapper onClick={() => { onClose() }}>{t('modalCancel')}</ModalOperatorQueryWrapper>
      <ModalOperatorCancerWrapper onClick={() => { onQuery() }}>{t('modalQuery')}</ModalOperatorCancerWrapper>
    </ModalOperatorWrapper>
  )
})