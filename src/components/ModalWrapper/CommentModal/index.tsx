import React, { useState, useEffect } from 'react';
import { Icon } from 'components';
import { toast } from 'react-toastify';
import { useTranslation } from 'contexts/Localization'
import {
  ModalWrapper,
  ModalTitleWrapper,
  ReportModalWrapper
} from 'components/ModalWrapper/ReportModal/style';
import {ModalOperator} from '../ShieldModal'
import {
  ShieldContentWrapper
} from './style';

import { Api } from 'apis';

type IProp = {
  show: boolean;
  onClose?: Function;
  onQuery?: Function;
  titleText: string;
  contentText: string;
}

export const CommentModal = React.memo((props: IProp) => {
  const { t } = useTranslation()
  const { show, onClose=()=>{} ,onQuery=()=>{},titleText,contentText } = props

  return (
    <>
      {
        show ? (
          <ModalWrapper>
            <ReportModalWrapper>
              <ModalTitleWrapper>
                <h4>{titleText}</h4>
              </ModalTitleWrapper>
              <ShieldContentWrapper>
                {/* <div className="img-box"></div> */}
                <div className="des-box">{contentText}</div>
              </ShieldContentWrapper>
              <ModalOperator onClose={onClose} onQuery={onQuery}></ModalOperator>
            </ReportModalWrapper>
          </ModalWrapper>
        ) : null
      }
    </>
  )
})