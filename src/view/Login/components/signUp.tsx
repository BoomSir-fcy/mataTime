import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useWeb3React } from '@web3-react/core';
import { Box, Flex, Text, Button, Card } from 'uikit';
import { useStore, storeAction } from 'store';
import { Api } from 'apis';

import { SignUpSetName } from './signUpSetName';
import { SignUpcomplete } from './signUpComplete';

import { mediaQueriesSize } from 'uikit/theme/base';
import { shortenAddress } from 'utils/contract';
import { walletLocalStorageKey, walletIcon } from 'config/wallet';

import { useLogin, useSignIn } from '../hooks';

import { useTranslation } from 'contexts/Localization';

const SignUpWarpper = styled(Flex)`
  padding-top: 50px;
  padding-bottom: 100px;
  flex-direction: column;
  align-items: center;
`;
const WalletBody = styled(Flex)`
  justify-content: center;
  align-items: center;
  width: 510px;
  height: 70px;
  background: ${({ theme }) => theme.colors.backgroundTextArea};
  border-radius: ${({ theme }) => theme.radii.card};
  margin-bottom: 30px;
`;
const SubTitle = styled(Text)`
  color: ${({ theme }) => theme.colors.textOrigin};
`;
const TextTips = styled(Text)`
  color: ${({ theme }) => theme.colors.textTips};
`;
const FailButton = styled(Button)`
  width: 205px;
  margin-bottom: 23px;
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

const SignUpFail = () => {
  const { t } = useTranslation();
  return (
    <Flex width="100%" flexDirection="column">
      <Flex justifyContent="space-between">
        <FailButton scale="ld" variant="tertiary" disabled>
          {t('loginCreatAccount')}
        </FailButton>
        <FailButton scale="ld"> {t('loginGetNft')}</FailButton>
      </Flex>
      <SubTitle>{t('loginSignUpFail')}</SubTitle>
    </Flex>
  );
};

export const WalletAddress: React.FC<{
  address?: string;
}> = ({ address }) => {
  const connector = window.localStorage.getItem(walletLocalStorageKey);
  const Icon = walletIcon[connector];

  return (
    <WalletBody>
      <Icon width="40px" mr="30px" />
      <Text fontSize="18px" fontWeight="bold">
        {address && shortenAddress(address)}
      </Text>
    </WalletBody>
  );
};

export const SignUp: React.FC<{
  isSignup?: boolean;
}> = ({ isSignup }) => {
  const dispatch = useDispatch();
  const { singUpStep } = useStore(p => p.loginReducer);
  const { loginCallback } = useLogin();
  const { account } = useWeb3React();
  const { getNftUrl } = useSignIn();
  const { t } = useTranslation();

  const signHandle = React.useCallback(async () => {
    const res = await loginCallback(1);
    if (Api.isSuccess(res)) {
      dispatch(storeAction.changeSignUpStep({ singUpStep: 2 }));
    }
  }, [dispatch, loginCallback]);

  const changeNftUrl = React.useCallback(async () => {
    const res: number = await getNftUrl(account);
    if (Boolean(res)) {
      dispatch(storeAction.changeSignUpStep({ singUpStep: 3 }));
    }
  }, []);

  return (
    <Box>
      {singUpStep === 1 && (
        <React.Fragment>
          <Text fontSize="34px" marginBottom="29px" bold style={{ textTransform: 'uppercase' }}>
            {t('loginWelcome')}
          </Text>
          <SubTitle>{t('loginSubTitle')}</SubTitle>
          <SignUpWarpper>
            <WalletAddress address={account} />
            {!isSignup ? (
              <Button scale="ld" style={{ width: '205px', fontSize: '18px' }} onClick={() => signHandle()}>
                钱包签名
              </Button>
            ) : (
              <SignUpFail />
            )}
          </SignUpWarpper>
          <TextTips>{t('loginSubTips')}</TextTips>
        </React.Fragment>
      )}
      {singUpStep === 2 && (
        <Box>
          <Text fontSize="34px" marginBottom="24px" bold style={{ textTransform: 'uppercase' }}>
            {t('loginWelcome')}
          </Text>
          <WalletAddress address={account} />
          <Flex flexDirection="column" justifyContent="center" alignItems="center">
            <img width="230px" src={require('../images/login_right_images.png').default} />
            <SignUpText>{t('loginSignupSuccess')}</SignUpText>
            <SignUpSubText>{t('loginSignupSuccessText')}</SignUpSubText>
            <Button scale="ld" onClick={() => changeNftUrl()} style={{ textTransform: 'capitalize' }}>
              {t('loginSignupSuccessNextText')}
            </Button>
          </Flex>
        </Box>
      )}
      {singUpStep === 3 && <SignUpSetName />}
      {singUpStep === 4 && <SignUpcomplete />}
    </Box>
  );
};
