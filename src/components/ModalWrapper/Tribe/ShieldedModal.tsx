import React, { useEffect, useState } from 'react';
import { useTranslation } from 'contexts';
import { TribeBelongNft, TribeInfo, TribeStatus } from 'store/tribe/type';
import { Box, Button, Flex, Text } from 'uikit';
import { ModalWrapper } from '..';
import { useHistory } from 'react-router';

export const ShieldedModal: React.FC<{ tribeInfo: TribeInfo }> = ({
  tribeInfo,
}) => {
  const { t } = useTranslation();
  const { goBack } = useHistory();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (
      tribeInfo?.detail?.nft_type === TribeBelongNft.Member &&
      tribeInfo?.tribe?.tribe_status === TribeStatus.Shield
    ) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [tribeInfo?.tribe?.tribe_status, tribeInfo?.detail?.nft_type]);
  return (
    <ModalWrapper
      creactOnUse
      customizeTitle
      shouldCloseOnOverlayClick={false}
      visible={visible}
    >
      <Flex flexDirection='column' justifyContent='center' alignItems='center'>
        <Text style={{ lineHeight: 'inherit' }}>
          {t('The tribe is undergoing rectification')}
        </Text>
        <Button mt='30px' onClick={goBack}>
          {t('Confirm')}
        </Button>
      </Flex>
    </ModalWrapper>
  );
};
