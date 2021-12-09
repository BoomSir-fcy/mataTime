import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  useHistory,
  useLocation,
  withRouter,
  RouteComponentProps
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

/* eslint-disable */
const LoginContainer = styled(Flex)`
  width: 100vw;
  height: 100vh;
  background: ${({ theme }) => theme.colors.gradients.signinBackground};
  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: column-reverse;
    height: auto;
    min-height: 100vh;
  }
`;
const LeftBox = styled(Box)`
  width: 62.5vw;
  background-image: url(${sloganImg});
  background-size: 100% auto;
  background-repeat: no-repeat;
  background-position: center bottom;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 100%;
  }
`;
const Content = styled(Card)`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  width: 37.5vw;
  border-radius: 0;
  background-color: ${({ theme }) => theme.colors.backgroundCard};
  ${({ theme }) => theme.mediaQueries.md} {
    width: 100%;
    align-items: baseline;
  }
`;
const LogoWarpper = styled(Box)`
  width: 337px;
  height: 60px;
  ${mediaQueriesSize.marginbmd}
`;
const Container = styled(Box)`
  width: 100%;
  height: calc(100vh - 125px);
  padding: 55px 45px 0;
  overflow-y: auto;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 100%;
    height: 100%;
    padding: 20px 15px 0;
  }
`;
const Nft = styled(Flex)`
  height: 100%;
  justify-content: center;
  flex-direction: column;
  padding: 0 100px;
  ${({ theme }) => theme.mediaQueries.md} {
    margin-top: 15px;
    padding: 0 15px;
  }
`;
const FailButton = styled(Button)`
  width: 205px;
  margin-bottom: 23px;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 45%;
    margin-bottom: 15px;
  }
`;
const SignUpWarpper = styled(Flex)`
  padding-top: 50px;
  padding-bottom: 100px;
  flex-direction: column;
  align-items: center;
  ${({ theme }) => theme.mediaQueries.md} {
    padding-bottom: 50px;
  }
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
  const redict = location?.state?.from?.pathname;
  const [Pending, setPending] = useState(false)

  const signIn = async () => {
    setPending(true)
    //2.1 用户已经注册登录钱包签名
    await window.ethereum.enable();
    const res = await loginCallback(2);
    if (Api.isSuccess(res)) {
      //2.2 获取用户信息
      const user: any = await getUserName();
      //2.3
      dispatch(storeAction.setSigninLoading(false));
      if (Api.isSuccess(user)) {
        // 存储userinfo 跳转首页
        dispatch(storeAction.changeUpdateProfile({ ...user.data }));
        history.replace(`${redict || '/'}`);
      }
    } else {
      // logout();
      // dispatch(storeAction.changeReset());
      toastError(t('loginSigninFail') || res?.msg);
    }
    setPending(false)
  };

  return (
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
        <FailButton disabled={Pending} onClick={() => signIn()}>{t('login Log in')}</FailButton>
      </SignUpWarpper>
      <Text color="textTips">{t('loginSubTips')}</Text>
    </React.Fragment>
  );
};
const Login: React.FC = React.memo((route: RouteComponentProps) => {
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
    singUpStep
  } = loginReduce;
  const { account } = useWeb3React();
  const { loginCallback } = useLogin();
  const { getUserName } = useSignIn();
  const [showStakeNft, setshowStakeNft] = useState(false);
  const [isDark] = useThemeManager();
  const redict = location?.state?.from?.pathname;
  // const nftBoolean = showStakeNft && singUpStep === 1 && account;

  // 选择链
  // const checkNetwork = async () => {
  //   const chainId: any = await window.ethereum.request({
  //     method: 'eth_chainId'
  //   });
  //   dispatch(storeAction.setChainId({ chainId: parseInt(chainId) }));
  // };


  // 查询是否有质押的NFT
  const getStakeType = async account => {
    const nftStake = await FetchNftStakeType(account);
    // 已经质押走登录
    console.log('质押:', nftStake[0], account);

    if (nftStake.length > 0 && nftStake[0].token_id) {
      dispatch(storeAction.changeSignin({ isSignin: true }));
    } else {
      dispatch(storeAction.changeGetStake({ isGetStake: true }));
      dispatch(storeAction.setUserNftStake({ isStakeNft: false }));
    }
  };

  const getInviteAddress = () => {
    // 获取邀请地址
    const search = route.location.search
    const myQuery = (search) => {
      return new URLSearchParams(search);
    }
    const InviteAddress = myQuery(search).get("InviteAddress");
    if (InviteAddress) {
      localStorage.setItem("InviteAddress", InviteAddress);
    }
    console.log(InviteAddress, "InviteAddress");
  }

  useEffect(() => {
    getInviteAddress()
    return () => {
      dispatch(storeAction.changeReset());
    };
  }, []);

  // useEffect(() => {
  //   if (isSignin) {
  //     signIn();
  //   }
  // }, [isSignin]);

  // 1链接钱包后 首先查询是否有质押
  useEffect(() => {
    if (account) {
      // 1.1查询是否有质押
      setshowStakeNft(false);
      dispatch(storeAction.changeSignin({ isSignin: false }));
      dispatch(storeAction.setSigninLoading(true));
      getStakeType(account);
    }
  }, [account]);

  useEffect(() => {
    // 2没有质押的情况下
    if (isGetStake && nftStatus && !isSignin) {
      if (!NftList.length && !isStakeNft) {
        // 没有可用头像，不显示头像列表——注册失败，显示去获取Nft
        setshowStakeNft(false);
        dispatch(storeAction.changeSignUp({ isSignup: true }));
        dispatch(storeAction.changeSignUpFail({ signUpFail: true }));
      } else if (NftList.length && !isStakeNft) {
        // 有可用的头像 显示头像列表——可以注册，显示钱包签名
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
        {/* {nftBoolean && (
          <Nft>
            <Text fontSize="30px">{t('setCheangeNftAvatar')}</Text>
            <StakeNFT status={1} />
          </Nft>
        )} */}
      </LeftBox>
      <Content>
        <Container>
          {singUpStep === 0 && <LogoWarpper>
            <Logo
              url="/"
              src={`${require(isDark
                ? './images/LOGO2.svg'
                : './images/light_logo.svg').default
                }`}
            />
          </LogoWarpper>}
          {/* 登录或注册 */}
          {isSignin ?
            <SignInBox /> :
            <>
              {!signUpFail && singUpStep > 0 && account && <Step />}
              {isSignup ? (
                <SignUp signUpFail={signUpFail} isStakeNft={isStakeNft} />
              ) : (
                <LoginJoin />
              )}
            </>
          }
        </Container>
        <Footer />
      </Content>
    </LoginContainer>
  );
});

export default withRouter(Login);
