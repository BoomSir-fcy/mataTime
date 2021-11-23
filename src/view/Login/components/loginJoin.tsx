import React from 'react';
import styled from 'styled-components';
import { Box, Flex, Text } from 'uikit';
import { useStore } from 'store';
import { ConnectWalletButton } from 'components';
import { useTranslation } from 'contexts/Localization';

const ConnectWallet = styled(Flex)`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 100px 0;
  position: relative;
`;

export const LoginJoin: React.FC = React.memo(() => {
  const { t } = useTranslation();
  const loading = useStore(p => p.loginReducer.signinLoading);

  return (
    <Box>
      <Text
        fontSize="34px"
        marginBottom="29px"
        bold
        style={{ textTransform: 'capitalize' }}
      >
        {t('loginWelcome')}
      </Text>
      <Text color="textOrigin">{t('loginSubTitle')}</Text>
      <ConnectWallet>
        <img
          width="35%"
          src={require('../images/login_right_images.png').default}
        />
        <ConnectWalletButton loading={loading ? 1 : 0} />
      </ConnectWallet>
      <Text color="textTips">{t('loginSubTips')}</Text>
    </Box>
  );
});
