import React from 'react';
import history from 'routerHistory';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useWeb3React } from '@web3-react/core';
import { Box, Flex, Text, Button, Card } from 'uikit';
import { useStore, storeAction } from 'store';
import { SignUpcomplete } from './signUpComplete';
import { mediaQueriesSize } from 'uikit/theme/base';
import { shortenAddress } from 'utils/contract';
import { walletLocalStorageKey, walletIcon } from 'config/wallet';
import { useTranslation } from 'contexts/Localization';

const WalletBody = styled(Flex)`
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 70px;
  background: ${({ theme }) => theme.colors.backgroundDisabled};
  border-radius: ${({ theme }) => theme.radii.card};
  margin-bottom: 30px;
`;
const SignUpText = styled(Text)`
  font-size: 34px;
  font-weight: bold;
  text-transform: capitalize;
  ${mediaQueriesSize.marginUD}
`;
const SignUpSubText = styled(Text)`
  font-size: 20px;
  ${mediaQueriesSize.marginb}
`;

export const WalletAddress: React.FC<{
  address?: string;
}> = ({ address }) => {
  const connector = window.localStorage.getItem(walletLocalStorageKey);
  const Icon = connector ? walletIcon[connector] : walletIcon.Metamask;

  return (
    <WalletBody>
      <Icon width='40px' mr='30px' />
      <Text fontSize='18px' fontWeight='bold'>
        {address && shortenAddress(address, 4)}
      </Text>
    </WalletBody>
  );
};

export const SignFinished: React.FC = ({}) => {
  const dispatch = useDispatch();
  const { singUpStep } = useStore(p => p.loginReducer);
  const { account } = useWeb3React();
  const { t } = useTranslation();

  // 已经注册完成，跳转第4步
  const signHandle = React.useCallback(async () => {
    dispatch(storeAction.changeSignUpStep({ singUpStep: 4 }));
  }, [dispatch]);

  return (
    <Box width='100%'>
      {singUpStep === 3 && (
        <Box paddingTop='30px' width='100%'>
          <WalletAddress address={account} />
          <Flex
            flexDirection='column'
            justifyContent='center'
            alignItems='center'
          >
            <img
              width='230px'
              src={require('../images/login_right_images.png').default}
            />
            <SignUpText>{t('loginSignupSuccess')}</SignUpText>
            <SignUpSubText>{t('loginSignupSuccessText')}</SignUpSubText>
            <Button
              scale='ld'
              onClick={() => signHandle()}
              style={{ textTransform: 'capitalize' }}
            >
              {t('loginSignUpNext')}
            </Button>
          </Flex>
        </Box>
      )}
      {singUpStep === 4 && <SignUpcomplete />}
    </Box>
  );
};
