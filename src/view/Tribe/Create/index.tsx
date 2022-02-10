import { Crumbs, Icon, ModalWrapper } from 'components';
import { useTranslation } from 'contexts';
import React, { useCallback, useState } from 'react';
import { Box, Text, Divider, Flex } from 'uikit';
import SubHeader from '../components/SubHeader';
import { FormFlex, LogoIcon } from './style';
import { TribeFee } from './TribeFee';
import { TribeInfo } from './TribeInfo';
import { TribeNFT } from './TribeNft';

const Create = () => {
  const { t } = useTranslation();
  const infoForm = React.useRef<any>();
  const feeForm = React.useRef<any>();
  const [visible, setVisible] = useState(false);

  return (
    <Box>
      <Crumbs back />
      <form
        onSubmit={e => {
          e.preventDefault();
          const params = {
            ...infoForm.current.getInfoFrom(),
            ...feeForm.current.getFeeFrom(),
          };
          console.log('表单提交：', params);
          setVisible(true);
        }}
        action=''
      >
        <SubHeader title={t('Basic Information')} />
        <TribeInfo ref={infoForm} />
        <Divider />
        <SubHeader title={t('Type settings')} />
        <TribeFee ref={feeForm} actionType='save' />
        <FormFlex>
          <Text mb='20px' color='textTips' small>
            {t(
              '这是部落类型介绍/计费规则介绍Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus',
            )}
          </Text>
        </FormFlex>
        <Divider />
        <SubHeader title={t('Pay for tickets')} />
        <TribeNFT />
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
            {t('To cancel this transaction, please reject it in your wallet')}
          </Text>
          {/* <Icon name='icon-complete' size={160} color='#2BEC93' />
          <Text mt='30px'>{t('Create Successfully')}</Text> */}
        </Flex>
      </ModalWrapper>
    </Box>
  );
};

export default Create;
