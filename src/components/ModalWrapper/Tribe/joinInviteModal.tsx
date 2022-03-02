import React from 'react';
import { useWeb3React } from '@web3-react/core';
import { ModalWrapper } from 'components';
import { Flex, Button, Text } from 'uikit';
import { useTranslation } from 'contexts';
import { useStore } from 'store';
import { shortenAddress } from 'utils/contract';
import { copyContent } from 'utils/copy';

import { Container, MaskInfo } from './styles';

export const JoinInviteModal: React.FC<{
  visible: boolean;
  onClose: () => void;
}> = React.memo(({ visible, onClose }) => {
  const { account } = useWeb3React();
  const { t } = useTranslation();
  const tribeInfo = useStore(p => p.tribe.tribeInfo);

  return (
    <ModalWrapper
      title={t('TribeInvitatioTitle')}
      visible={visible}
      setVisible={onClose}
    >
      <Container>
        <MaskInfo style={{ textAlign: 'center', padding: '34px 0' }}>
          <Text fontSize='16px' fontWeight='bold' mb='19px'>
            {t('TribeInviteFriendsJoin', { value: tribeInfo?.tribe?.name })}
          </Text>
          <Text mb='13px'>{t('TribeInviteFriendsJoinText1')}</Text>
          <Text color='textTips'>{t('TribeInviteFriendsJoinText2')}</Text>
        </MaskInfo>
        <MaskInfo mt='17px' style={{ textAlign: 'center' }}>
          <Text fontSize='16px' fontWeight='bold' mb='10px'>
            {t('My Address')} ：
          </Text>
          <Text>{shortenAddress(account, 4)}</Text>
        </MaskInfo>
        <Flex mt='20px' justifyContent='center'>
          <Button onClick={() => copyContent(account)}>
            {t('TribeCopyAddress')}
          </Button>
        </Flex>
      </Container>
    </ModalWrapper>
  );
});
