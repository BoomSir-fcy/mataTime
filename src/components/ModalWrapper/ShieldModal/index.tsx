import React, { useState, useEffect } from 'react';
import { ModalWrapper } from 'components';
import { toast } from 'react-toastify';
import { useTranslation } from 'contexts/Localization';
import {
  // ModalWrapper,
  ModalTitleWrapper,
  ReportModalWrapper,
} from 'components/ModalWrapper/ReportModal/style';

import {
  ShieldContentWrapper,
  ModalOperatorWrapper,
  ModalOperatorQueryWrapper,
  ModalOperatorCancerWrapper,
} from './style';

import { Api } from 'apis';

type IProp = {
  show: boolean;
  pid: number;
  onClose: () => void;
  onQuery: () => void;
};

export const ShieldModal = React.memo((props: IProp) => {
  const { t } = useTranslation();
  const { show, onClose, pid, onQuery } = props;

  // 屏蔽
  const onShieldRequest = async () => {
    const res = await Api.AttentionApi.addShield(pid);
    if (Api.isSuccess(res)) {
      toast.success(t('shieldModalShieldSuccess'));
      onQuery();
    } else {
      onClose();
    }
  };

  return (
    <ModalWrapper
      visible={show}
      title={t('shieldModalTitle')}
      setVisible={onClose}
    >
      <ReportModalWrapper>
        <ModalTitleWrapper>
          <h4>{t('shieldModalTitle')}</h4>
        </ModalTitleWrapper>
        <ShieldContentWrapper>
          <div className='des-box'>{t('shieldModalDes')}</div>
        </ShieldContentWrapper>
        <ModalOperator
          onClose={onClose}
          onQuery={() => {
            onShieldRequest();
          }}
        ></ModalOperator>
      </ReportModalWrapper>
    </ModalWrapper>
  );
});

type OperatorIprop = {
  onQuery: () => void;
  onClose: () => void;
  queryText?: string;
  disabled?: boolean;
};
export const ModalOperator = React.memo((props: OperatorIprop) => {
  const { t } = useTranslation();
  const { onQuery, onClose, queryText, disabled } = props;
  return (
    <ModalOperatorWrapper>
      <ModalOperatorQueryWrapper
        onClick={() => {
          onClose();
        }}
      >
        {t('modalCancel')}
      </ModalOperatorQueryWrapper>
      <ModalOperatorCancerWrapper
        disabled={disabled}
        onClick={() => {
          onQuery();
        }}
      >
        {queryText || t('modalQuery')}
      </ModalOperatorCancerWrapper>
    </ModalOperatorWrapper>
  );
});
