import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  useHistory,
  useLocation,
  withRouter,
  RouteComponentProps,
} from 'react-router-dom';
import useAuth from 'hooks/useAuth';
import { useDispatch } from 'react-redux';
import { useWeb3React } from '@web3-react/core';
import { storeAction, useStore } from 'store';
import { useToast } from 'hooks';
import { useThemeManager } from 'store/app/hooks';
import { Flex, Card, Box, Text, Button } from 'uikit';
import { Logo, Footer } from 'components';
import { StakeNFT } from 'components/NftList';
import { LoginJoin, SignUp, Step, WalletAddress } from './components';
import { mediaQueriesSize } from 'uikit/theme/base';
import { useLogin, useSignIn } from './hooks';
import { useFetchSupportNFT, useFetchNftList, FetchNftStakeType } from './hook';
import { useTranslation } from 'contexts/Localization';

import { Api } from 'apis';

import sloganImg from 'assets/images/login_slogan_img.png';
import HomeBanner from 'components/Cirde/HomeBanner';
import { SignUpcomplete } from './components/signUpComplete';
import { SignFinished } from './components/finished';

/* eslint-disable */
const LoginContainer = styled(Flex)`
  max-width: 100vw;
  height: 100vh;
  /* background: ${({ theme }) => theme.colors.gradients.signinBackground}; */
  flex-direction: column;
  height: auto;
  min-height: 100vh;
  overflow: hidden;
  ${({ theme }) => theme.mediaQueries.md} {
    max-width: 100vw;
    height: 100vh;
    flex-direction: row;
  }
`;
const LeftBox = styled(Box)`
  width: 100%;
  /* background-image: url(${sloganImg});
  background-size: 100% auto;
  background-repeat: no-repeat;
  background-position: center bottom; */
  ${({ theme }) => theme.mediaQueries.md} {
    width: 63vw;
  }
`;
const Content = styled(Card)`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  align-items: baseline;
  border-radius: 0;
  border-left: 1px solid ${({ theme }) => theme.colors.borderThemeColor};
  background-color: ${({ theme }) => theme.colors.background};
  ${({ theme }) => theme.mediaQueries.md} {
    align-items: flex-end;
    width: 37vw;
  }
`;
const LogoWarpper = styled(Box)`
  width: 337px;
  /* height: 60px; */
  ${mediaQueriesSize.marginbmd}
`;
const Container = styled(Box)`
  width: 100%;
  /* height: calc(100vh - 125px); */
  padding: 20px 15px 0;
  overflow-y: auto;
  ${({ theme }) => theme.mediaQueries.md} {
    height: 100%;
    padding: 55px 45px 0;
  }
`;
const Nft = styled(Flex)`
  height: 100%;
  justify-content: center;
  flex-direction: column;
  margin-top: 15px;
  padding: 0 15px;
  ${({ theme }) => theme.mediaQueries.md} {
    padding: 0 100px;
    margin-top: 0;
  }
`;
const FailButton = styled(Button)`
  width: 45%;
  margin-bottom: 15px;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 205px;
    margin-bottom: 23px;
  }
`;
const SignUpWarpper = styled(Flex)`
  padding-top: 50px;
  flex-direction: column;
  align-items: center;
  padding-bottom: 50px;
  ${({ theme }) => theme.mediaQueries.md} {
    padding-bottom: 100px;
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

const SignInBox = () => {
  const { account } = useWeb3React();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const location = useLocation();
  const { loginCallback } = useLogin();
  const { getUserName } = useSignIn();
  const history = useHistory();
  const { logout, login } = useAuth();
  const { toastError } = useToast();
  const redict = (location?.state as any)?.from?.pathname;
  const [Pending, setPending] = useState(false);

  const signIn = async () => {
    setPending(true);
    //2.1 ????????????????????????????????????
    // await window.ethereum.enable();
    const res = await loginCallback(2);
    if (Api.isSuccess(res)) {
      //2.2 ??????????????????
      const user: any = await getUserName();
      //2.3
      dispatch(storeAction.setSigninLoading(false));
      if (Api.isSuccess(user)) {
        // ??????userinfo ????????????
        dispatch(storeAction.changeUpdateProfile({ ...user.data }));
        history.replace(`${redict || '/'}`);
      }
    } else {
      // logout();
      // dispatch(storeAction.changeReset());
      toastError(t('loginSigninFail') || res?.msg);
    }
    setPending(false);
  };

  return (
    <React.Fragment>
      <Text
        fontSize='34px'
        marginBottom='29px'
        bold
        style={{ textTransform: 'capitalize' }}
      >
        {t('loginWelcome')}
      </Text>
      <Text color='textOrigin'>{t('loginSubTitle')}</Text>
      <SignUpWarpper>
        <WalletAddress address={account} />
        <FailButton disabled={Pending} onClick={() => signIn()}>
          {t('login Log in')}
        </FailButton>
      </SignUpWarpper>
      <Text color='textTips'>{t('loginSubTips')}</Text>
    </React.Fragment>
  );
};
const Login: React.FC<RouteComponentProps> = React.memo(route => {
  useFetchSupportNFT();
  useFetchNftList();

  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const loginReduce = useStore(p => p.loginReducer);
  const NftList = useStore(p => p.loginReducer.nftList);
  const { t } = useTranslation();
  const { logout, login } = useAuth();
  const { toastError } = useToast();
  const {
    isSignup,
    isSignin,
    isGetStake,
    nftStatus,
    signUpFail,
    isStakeNft,
    singUpStep,
  } = loginReduce;
  const { account } = useWeb3React();
  const { loginCallback } = useLogin();
  const { getUserName } = useSignIn();
  const [showStakeNft, setshowStakeNft] = useState(false);
  const [isDark] = useThemeManager();

  const [InviteCode, setInviteCode] = useState('');
  const [IsFinished, setIsFinished] = useState(false);

  // const nftBoolean = showStakeNft && singUpStep === 1 && account;

  // ?????????
  // const checkNetwork = async () => {
  //   const chainId: any = await window.ethereum.request({
  //     method: 'eth_chainId'
  //   });
  //   dispatch(storeAction.setChainId({ chainId: parseInt(chainId) }));
  // };

  // ????????????????????????NFT
  const getStakeType = async account => {
    const nftStake = await FetchNftStakeType(account);
    // ?????????????????????

    if (nftStake.length > 0 && nftStake[0].token_id) {
      dispatch(storeAction.changeSignin({ isSignin: true }));
    } else {
      dispatch(storeAction.changeGetStake({ isGetStake: true }));
      dispatch(storeAction.setUserNftStake({ isStakeNft: false }));
    }
  };

  // ???????????????????????????code???
  const getInviteAddress = () => {
    // ??????????????????
    const search = route.location.search;
    const myQuery = search => {
      return new URLSearchParams(search);
    };

    // ??????????????????
    const Finished = myQuery(search).get('finished');
    if (Finished) {
      setIsFinished(Boolean(Finished));
    }

    // ??????????????????
    const InviteAddress = myQuery(search).get('InviteAddress');
    if (InviteAddress) {
      localStorage.setItem('InviteAddress', InviteAddress);
    }

    // ??????code???
    const Code_c = myQuery(search).get('c');
    const Code_h = myQuery(search).get('h');
    const Code_l = myQuery(search).get('l');
    if (Code_c && Code_h && Code_l) {
      setInviteCode(route.location.search);
    }
  };
  useEffect(() => {
    if (!isDark) {
      document.getElementById('particles').style.background = '#000';
    }
  }, [isDark]);
  useEffect(() => {
    getInviteAddress();
    return () => {
      dispatch(storeAction.changeReset());
    };
  }, []);

  // 1??????????????? ???????????????????????????
  useEffect(() => {
    if (account) {
      // 1.1?????????????????????
      setshowStakeNft(false);
      dispatch(storeAction.changeSignin({ isSignin: false }));
      dispatch(storeAction.setSigninLoading(true));
      getStakeType(account);
    }
  }, [account]);

  useEffect(() => {
    // 2????????????????????????
    if (isGetStake && nftStatus && !isSignin) {
      if (!NftList.length && !isStakeNft) {
        // ??????????????????????????????????????????????????????????????????????????????Nft
        setshowStakeNft(false);
        dispatch(storeAction.changeSignUp({ isSignup: true }));
        dispatch(storeAction.changeSignUpFail({ signUpFail: true }));
      } else if (NftList.length && !isStakeNft) {
        // ?????????????????? ?????????????????????????????????????????????????????????
        setshowStakeNft(true);
        dispatch(storeAction.changeSignUp({ isSignup: true }));
        dispatch(storeAction.changeSignUpFail({ signUpFail: false }));
      }
      dispatch(storeAction.setSigninLoading(false));
    }
  }, [isGetStake, isSignin, nftStatus, NftList, isStakeNft]);

  return (
    <LoginContainer>
      <LeftBox>
        <HomeBanner />
      </LeftBox>
      <Content>
        {IsFinished && singUpStep >= 3 ? (
          <Container>
            <Step />
            <SignFinished />
          </Container>
        ) : (
          <Container>
            {singUpStep === 0 && (
              <LogoWarpper>
                <Logo
                  style={{ marginLeft: '-10px' }}
                  url='/'
                  src={`${
                    require(isDark
                      ? 'assets/images/logo.svg'
                      : 'assets/images/light_logo.svg').default
                  }`}
                />
              </LogoWarpper>
            )}
            {/* ??????????????? */}
            {isSignin ? (
              <SignInBox />
            ) : (
              <>
                {!signUpFail && singUpStep > 0 && account && <Step />}
                {isSignup ? (
                  <SignUp
                    InviteCode={InviteCode}
                    signUpFail={signUpFail}
                    isStakeNft={isStakeNft}
                  />
                ) : (
                  <LoginJoin />
                )}
              </>
            )}
          </Container>
        )}
        <Footer />
      </Content>
    </LoginContainer>
  );
});

export default withRouter(Login);
