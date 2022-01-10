import React from 'react';
import styled from 'styled-components';
import { debounce } from 'lodash';
import { useToast } from 'hooks';
import { Flex, Box, Text, Button } from 'uikit';
import { ModalWrapper, MoreOperatorEnum } from 'components';
import { useTranslation } from 'contexts/Localization';
import { Api } from 'apis';

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
  padding-bottom: 20px;
`;

const ButtonAction = styled(Button)`
  width: 100px;
  height: 35px;
`;

export const ShiledUserModal: React.FC<{
  userinfo: Api.Home.post;
  visible: boolean;
  callback: (data: Api.Home.post, type?: string) => void;
  onClose: () => void;
}> = React.memo(({ userinfo, visible, callback, onClose }) => {
  const { t } = useTranslation();
  const { toastError, toastSuccess } = useToast();

  const shield = async () => {
    try {
      const res = await Api.MeApi.shieldUser(userinfo.user_id);
      if (Api.isSuccess(res)) {
        onClose();
        callback(userinfo, MoreOperatorEnum.BLOCKUSER);
        toastSuccess(t('shieldUserSuccess'));
      } else {
        toastError(t(`http-error-${res.code}`));
      }
    } catch (error) {
      console.error(error);
    }
  };

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
        <ButtonAction variant='secondary' onClick={onClose}>
          {t('modalCancel')}
        </ButtonAction>
        <ButtonAction onClick={debounce(() => shield(), 1000)}>
          {t('modalQuery')}
        </ButtonAction>
      </Footer>
    </ModalWrapper>
  );
});
