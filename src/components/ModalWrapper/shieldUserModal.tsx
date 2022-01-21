import React from 'react';
import styled from 'styled-components';
import { debounce } from 'lodash';
import { useDispatch } from 'react-redux';
import { useToast } from 'hooks';
import { Flex, Box, Text, Button } from 'uikit';
import { ModalWrapper, MoreOperatorEnum } from 'components';
import { shortenAddress } from 'utils/contract';
import { useTranslation } from 'contexts/Localization';
import { Api } from 'apis';

import useTheme from 'hooks/useTheme';
import { fetchPostDetailAsync } from 'store/mapModule/reducer';
import { addBlockUserId } from 'store/mapModule/actions';

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
  callback: (data: Api.Home.post, type?: MoreOperatorEnum) => void;
  onClose: (e?) => void;
}> = React.memo(({ userinfo, visible, callback, onClose }) => {
  const { t, getHTML } = useTranslation();
  const { theme } = useTheme();
  const { toastError, toastSuccess } = useToast();

  const dispatch = useDispatch();

  const shield = async () => {
    try {
      const res = await Api.MeApi.shieldUser(userinfo.user_id);
      // dispatch(fetchPostDetailAsync(userinfo.post_id));
      if (Api.isSuccess(res)) {
        dispatch(addBlockUserId(userinfo.user_id));
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
        <Text color='white_black'>
          {getHTML('shieldUserModalDes', {
            value: `<span style="color:${
              theme.colors.backgroundPrimary
            }">@${shortenAddress(userinfo?.user_address)}</span>`,
          })}
        </Text>
      </Content>
      <Footer>
        <ButtonAction variant='secondary' onClick={onClose}>
          {t('modalCancel')}
        </ButtonAction>
        {/* <ButtonAction onClick={debounce(() => shield(), 1000)}>
          {t('modalQuery')}
        </ButtonAction> */}
        <ButtonAction
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            shield();
          }}
        >
          {t('modalQuery')}
        </ButtonAction>
      </Footer>
    </ModalWrapper>
  );
});
