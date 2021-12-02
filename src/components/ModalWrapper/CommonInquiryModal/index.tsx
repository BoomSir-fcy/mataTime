import React from 'react';
import { ModalWrapper } from 'components';
import { Box, Text } from 'uikit';
import { useTranslation } from 'contexts/Localization';

import { ModalOperator } from '../ShieldModal';
import { ReportModalWrapper } from 'components/ModalWrapper/ReportModal/style';

import styled from 'styled-components';

type IProp = {
  show: boolean;
  type: string;
  onClose: () => void;
  onQuery: () => void;
};

const Content = styled(Box)`
  padding: 25px 0;
`;

export const CommonInquiryModal = React.memo((props: IProp) => {
  const { t } = useTranslation();
  const { show, onClose, onQuery, type } = props;

  return (
    <ModalWrapper
      creactOnUse
      title={t(`${type}ModalTitle`)}
      visible={show}
      setVisible={onClose}
    >
      <ReportModalWrapper>
        <Content>
          <Text>{t(`${type}ModalDes`)}</Text>
        </Content>
        <ModalOperator onClose={() => onClose()} onQuery={() => onQuery()} />
      </ReportModalWrapper>
    </ModalWrapper>
  );
});
