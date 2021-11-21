import React, { useState, useEffect } from 'react';
import { Icon } from 'components';
import { toast } from 'react-toastify';
import { useTranslation } from 'contexts/Localization'
import { ModalOperator } from '../ShieldModal';
import {
  ModalWrapper,
  ModalTitleWrapper,
  ReportModalWrapper
} from 'components/ModalWrapper/ReportModal/style';

import {
  ShieldContentWrapper
} from './style';

import { Api } from 'apis';

type IProp = {
  show: boolean;
  type: string;
  onClose: Function;
  onQuery: Function;
}

export const CommonInquiryModal = React.memo((props: IProp) => {
  const { t } = useTranslation()
  const { show, onClose, onQuery, type } = props

  return (
    <>
      {
        show ? (
          <>
            <ModalWrapper onClick={() => {
              onClose()
            }}></ModalWrapper>
            <ReportModalWrapper>
              <ModalTitleWrapper>
                <h4>{t(type + 'ModalTitle')}</h4>
              </ModalTitleWrapper>
              <ShieldContentWrapper>
                <div className="des-box">{t(type + 'ModalDes')}</div>
              </ShieldContentWrapper>
              <ModalOperator onClose={() => { onClose() }} onQuery={() => {
                onQuery()
              }}></ModalOperator>
            </ReportModalWrapper>
          </>
        ) : null
      }
    </>
  )
});
