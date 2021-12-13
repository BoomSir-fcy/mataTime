import React from 'react';
import history from 'routerHistory';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useWeb3React } from '@web3-react/core';
import { Box, Flex, Text, Button, Card } from 'uikit';
import { useStore, storeAction } from 'store';
import { StakeNFT } from 'components/NftList';

import { SignUpSetName } from './signUpSetName';
import { SignUpcomplete } from './signUpComplete';

import { mediaQueriesSize } from 'uikit/theme/base';
import { shortenAddress } from 'utils/contract';
import { walletLocalStorageKey, walletIcon } from 'config/wallet';

import { useTranslation } from 'contexts/Localization';
import { useToast } from 'hooks';
import { GET_DSG_NFT_URL } from 'config';


const SignUpWarpper = styled(Flex)`
  padding-top: 50px;
  padding-bottom: 50px;
  flex-direction: column;
  align-items: center;
  ${({ theme }) => theme.mediaQueries.md} {
    padding-bottom: 100px;
  }
`;
const WalletBody = styled(Flex)`
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 70px;
  background: ${({ theme }) => theme.colors.backgroundDisabled};
  border-radius: ${({ theme }) => theme.radii.card};
  margin-bottom: 30px;
`;
const FailButton = styled(Button)`
  width: 45%;
  margin-bottom: 15px;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 205px;
    margin-bottom: 23px;
  }
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
const Nft = styled(Flex)`
  height: 100%;
  justify-content: center;
  flex-direction: column;
  margin-top: 15px;
  padding: 0 15px;
  ${({ theme }) => theme.mediaQueries.md} {
    margin-top: 0;
    padding: 0;
  }
`;
const NftTitle = styled(Text)`
font-weight: bold;
  ${mediaQueriesSize.marginr}
`;
const SignUpFail = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const goRouter = () => {
    dispatch(storeAction.changeReset);
    // history.push('/');
    window.open(GET_DSG_NFT_URL)
  };

  return (
    <Flex width="100%" flexDirection="column">
      <Flex justifyContent="space-between">
        <FailButton scale="ld" variant="tertiary" disabled>
          {t('loginCreatAccount')}
        </FailButton>
        <FailButton scale="ld" onClick={goRouter}>
          {t('loginGetNft')}
        </FailButton>
      </Flex>
      <Text color="textOrigin">{t('loginSignUpFail')}</Text>
    </Flex>
  );
};

export const WalletAddress: React.FC<{
  address?: string;
}> = ({ address }) => {
  const connector = window.localStorage.getItem(walletLocalStorageKey);
  const Icon = connector ? walletIcon[connector] : walletIcon.Metamask;

  return (
    <WalletBody>
      <Icon width="40px" mr="30px" />
      <Text fontSize="18px" fontWeight="bold">
        {address && shortenAddress(address, 4)}
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
  const { t } = useTranslation();
  const { toastWarning, toastError } = useToast();

  // 已经注册完成，跳转第4步
  const signHandle = React.useCallback(async () => {
    dispatch(storeAction.changeSignUpStep({ singUpStep: 4 }));
  }, [dispatch]);

  return (
    <Box width="100%">
      {/* 创建账户 */}
      {singUpStep === 0 && !signUpFail && (
        <React.Fragment>
          <Text
            fontSize="34px"
            marginBottom="29px"
            bold
            style={{ textTransform: 'capitalize' }}
          >
            {t('loginWelcome')}
          </Text>
          <Text color="textOrigin">{t('loginSubTitle')}</Text>
          <SignUpWarpper>
            <WalletAddress address={account} />
            <FailButton onClick={() => {
              dispatch(storeAction.changeSignUpStep({ singUpStep: 1 }));
            }}>{t('loginCreatAccount')}</FailButton>
          </SignUpWarpper>
          <Text color="textTips">{t('loginSubTips')}</Text>
        </React.Fragment>
      )}
      {/* 没有nft，不能注册，注册失败 */}
      {singUpStep === 0 && signUpFail && (
        <React.Fragment>
          <Text
            fontSize="34px"
            marginBottom="29px"
            bold
            style={{ textTransform: 'capitalize' }}
          >
            {t('loginWelcome')}
          </Text>
          <Text color="textOrigin">{t('loginSubTitle')}</Text>
          <SignUpWarpper>
            <WalletAddress address={account} />
            <SignUpFail />
          </SignUpWarpper>
          <Text color="textTips">{t('loginSubTips')}</Text>
        </React.Fragment>
      )}
      {/* <Button
        disabled={!isStakeNft}
        scale="ld"
        style={{ textTransform: 'capitalize' }}
        onClick={() => setNickName()}
      >
        {t('loginSignupSuccessNextText')}
      </Button> */}
      {/* 正常情况下走注册流程 */}
      {/* 选择头像 */}
      {singUpStep === 1 && !signUpFail &&
        <Nft>
          <Flex alignItems="baseline">
            <NftTitle fontSize="18px">{t('login Already have an NFT avatar')}</NftTitle>
            <Text fontSize="14px">{t('login After you hold and pledge your NFT avatar, you can register successfully')}</Text>
          </Flex>
          <StakeNFT status={1} />
          <Flex pt='20px' justifyContent='center'>
            <FailButton onClick={() => {
              if (!isStakeNft) {
                toastError(t('login Please approve and select an avatar'))
                return
              }
              dispatch(storeAction.changeSignUpStep({ singUpStep: 2 }));
            }}>{t('loginSignUpNext')}</FailButton>
          </Flex>
        </Nft>
      }
      {/* 设置昵称 */}
      {singUpStep === 2 && <SignUpSetName status={isStakeNft} />}
      {/* {singUpStep === 2 && <SignUpSetName />} */}
      {singUpStep === 3 && (
        <Box width="100%">
          {/* <Text
            fontSize="34px"
            marginBottom="24px"
            bold
            style={{ textTransform: 'capitalize' }}
          >
            {t('loginWelcome')}
          </Text> */}
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
