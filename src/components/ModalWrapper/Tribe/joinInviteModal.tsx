import React from 'react';
import { ModalWrapper } from 'components';
import { Flex, Button, Text } from 'uikit';
import { useTranslation } from 'contexts';
import { useToast } from 'hooks';
import { useStore } from 'store';
import { shortenAddress } from 'utils/contract';
import { copyContent } from 'utils/copy';
import { useTribeInfoById } from 'store/mapModule/hooks';

import { Container, MaskInfo } from './styles';

export const JoinInviteModal: React.FC<{
  tribe_id: number;
  visible: boolean;
  onClose: () => void;
}> = React.memo(({ tribe_id, visible, onClose }) => {
  const { t } = useTranslation();
  const { toastSuccess } = useToast();
  const userInfo = useStore(p => p.loginReducer.userInfo);
  const tribeInfo = useTribeInfoById(tribe_id);

  return (
    <ModalWrapper
      title={t('TribeInvitatioTitle')}
      visible={visible}
      setVisible={onClose}
    >
      <Container>
        <MaskInfo style={{ textAlign: 'center', padding: '34px 0' }}>
          <Text fontSize='16px' fontWeight='bold' mb='19px'>
            {t('TribeInviteFriendsJoin', {
              value: tribeInfo?.tribe?.name || '',
            })}
          </Text>
          <Text mb='13px'>
            {t('TribeInviteFriendsJoinText1', {
              value: tribeInfo?.nftInfo?.invitationRate || 0,
            })}
          </Text>
          <Text color='textTips'>{t('TribeInviteFriendsJoinText2')}</Text>
        </MaskInfo>
        <MaskInfo mt='17px' style={{ textAlign: 'center' }}>
          <Text fontSize='16px' fontWeight='bold' mb='10px'>
            {t('My Address')} ：
          </Text>
          <Text>{shortenAddress(userInfo.address, 4)}</Text>
        </MaskInfo>
        <Flex mt='20px' justifyContent='center'>
          <Button
            onClick={() => {
              copyContent(userInfo.address);
              toastSuccess(t('copySuccess'));
            }}
          >
            {t('TribeCopyAddress')}
          </Button>
        </Flex>
      </Container>
    </ModalWrapper>
  );
});
