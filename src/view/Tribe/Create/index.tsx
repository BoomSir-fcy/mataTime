import { Crumbs, Icon, ModalWrapper } from 'components';
import { useTranslation } from 'contexts';
import React, { useCallback, useState } from 'react';
import { Box, Text, Divider, Flex } from 'uikit';
import SubHeader from '../components/SubHeader';
import { LogoIcon } from './style';
import { TribeCreateBtn } from './TribeCreateBtn';
import TribeFee from './TribeFee';
import TribeInfo from './TribeInfo';
import { TribeNFT } from './TribeNft';

const Create = () => {
  const { t } = useTranslation();
  const form = React.useRef<any>();
  const [visible, setVisible] = useState(false);

  const createTribe = () => {
    const info = form.current.getInfoFrom();
    console.log(info);
  };
  return (
    <Box>
      <Crumbs back />
      <form
        onSubmit={e => {
          e.preventDefault();
          console.log('表单提交：', e);
          setVisible(true);
        }}
        action=''
      >
        <SubHeader title={t('基础信息')} />
        <TribeInfo ref={form} />
        <Divider />
        <SubHeader title={t('类型设置')} />
        <TribeFee ref={form} />
        <Divider />
        <SubHeader title={t('支付门票')} />
        <TribeNFT />
        <TribeCreateBtn hasNft />
      </form>

      <ModalWrapper
        creactOnUse
        customizeTitle
        shouldCloseOnOverlayClick={false}
        visible={visible}
      >
        <Flex
          flexDirection='column'
          justifyContent='center'
          alignItems='center'
        >
          <LogoIcon>
            <Icon name='icon-LOGO3' size={80} color='white_black' />
          </LogoIcon>
          <Text mt='30px'>{t('Waiting For Confirmation')}</Text>
          <Text mt='10px' small color='textTips'>
            {t('如需取消此交易，请在钱包拒绝')}
          </Text>
          {/* <Icon name='icon-complete' size={160} color='#2BEC93' />
          <Text mt='30px'>{t('Create Successfully')}</Text> */}
        </Flex>
      </ModalWrapper>
    </Box>
  );
};

export default Create;
