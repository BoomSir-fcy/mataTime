import React, { useEffect } from 'react';
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
import { FetchNftStakeType } from '../hook';

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
  signUpFail?: boolean;
  isStakeNft?: boolean;
}> = ({ signUpFail, isStakeNft }) => {
  const dispatch = useDispatch();
  const { singUpStep } = useStore(p => p.loginReducer);
  const { account } = useWeb3React();
  const { getNftUrl } = useSignIn();
  const { t } = useTranslation();
  // 已经注册完成，跳转第4步
  const signHandle = React.useCallback(async () => {
    dispatch(storeAction.changeSignUpStep({ singUpStep: 4 }));
  }, [dispatch]);
  // 去注册、设置昵称
  const setNickName = React.useCallback(async () => {
    const res: number = await getNftUrl(account);
    if (Boolean(res)) {
      dispatch(storeAction.changeSignUpStep({ singUpStep: 2 }));
    }
  }, [account]);

  return (
    <Box>
      {singUpStep === 1 && (
        <React.Fragment>
          <Text
            fontSize="34px"
            marginBottom="29px"
            bold
            style={{ textTransform: 'uppercase' }}
          >
            {t('loginWelcome')}
          </Text>
          <SubTitle>{t('loginSubTitle')}</SubTitle>
          <SignUpWarpper>
            <WalletAddress address={account} />
            {signUpFail ? (
              // 注册失败
              <SignUpFail />
            ) : (
              // 可以注册
              <Button
                disabled={!isStakeNft}
                scale="ld"
                style={{ textTransform: 'capitalize' }}
                onClick={() => setNickName()}
              >
                {t('loginSignupSuccessNextText')}
              </Button>
            )}
          </SignUpWarpper>
          <TextTips>{t('loginSubTips')}</TextTips>
        </React.Fragment>
      )}
      {singUpStep === 2 && <SignUpSetName />}
      {singUpStep === 3 && (
        <Box>
          <Text
            fontSize="34px"
            marginBottom="24px"
            bold
            style={{ textTransform: 'uppercase' }}
          >
            {t('loginWelcome')}
          </Text>
          <WalletAddress address={account} />
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <img
              width="230px"
              src={require('../images/login_right_images.png').default}
            />
            <SignUpText>{t('loginSignupSuccess')}</SignUpText>
            <SignUpSubText>{t('loginSignupSuccessText')}</SignUpSubText>
            <Button
              scale="ld"
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
