import React from 'react';
import styled from 'styled-components';
import { AnimationRingIcon, Box, Flex, Text } from 'uikit';
import { useStore } from 'store';
import { ConnectWalletButton } from 'components';
import { useTranslation } from 'contexts/Localization';
import Dots from 'components/Loader/Dots';
import useConnectWallet from 'hooks/useConnectWallet';

const ConnectWallet = styled(Flex)`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 100px 0;
  position: relative;
`;
const DataBox = styled.div`
  width: max-content;
`;
export const LoginJoin: React.FC = React.memo(() => {
  const { t } = useTranslation();
  const loading = useStore(p => p.loginReducer.signinLoading);
  const { onConnectWallet } = useConnectWallet();
  return (
    <Box>
      <Text
        fontSize='34px'
        marginBottom='29px'
        bold
        style={{ textTransform: 'capitalize' }}
      >
        {t('loginWelcome')}
      </Text>
      <Text color='textOrigin'>{t('loginSubTitle')}</Text>
      <ConnectWallet>
        {/* <img
          width="35%"
          src={require('../images/login_right_images.png').default}
        /> */}
        {/* <ConnectWalletButton loading={loading ? 1 : 0} /> */}
        <AnimationRingIcon
          color='white_black'
          style={{ cursor: 'pointer' }}
          onClick={onConnectWallet}
          active2
          isRotate
          width='10.5rem'
        >
          <DataBox style={{ cursor: 'pointer' }} onClick={onConnectWallet}>
            <Text fontSize='28px' bold>
              {Boolean(loading) ? (
                <Dots>{t('Connect Wallet')}</Dots>
              ) : (
                t('Connect Wallet')
              )}
            </Text>
          </DataBox>
        </AnimationRingIcon>
      </ConnectWallet>
      <Text color='textTips'>{t('loginSubTips')}</Text>
    </Box>
  );
});
