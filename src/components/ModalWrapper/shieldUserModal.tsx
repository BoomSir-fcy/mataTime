import React from 'react';
import styled from 'styled-components';
import { Flex, Box, Text, Button } from 'uikit';
import { ModalWrapper } from 'components';
import { useTranslation } from 'contexts/Localization';

const Content = styled(Box)`
  width: 100%;
  padding: 25px 0;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 500px;
    padding-left: 28px;
  }
`;

const Footer = styled(Flex)`
  justify-content: space-between;
  align-content: center;
`;

export const ShiledUserModal: React.FC<{
  visible: boolean;
  onClose: () => void;
}> = React.memo(({ visible, onClose }) => {
  const { t } = useTranslation();

  return (
    <ModalWrapper
      visible={visible}
      title={t('shieldUserModalTitle')}
      setVisible={onClose}
    >
      <Content>
        <Text color='white_black'>{t('shieldUserModalDes')}</Text>
      </Content>
      <Footer>
        <Button variant='secondary'>{t('modalCancel')}</Button>
        <Button>{t('modalQuery')}</Button>
      </Footer>
    </ModalWrapper>
  );
});
