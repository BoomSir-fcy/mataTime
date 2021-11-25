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
import { toast } from 'react-toastify';
import { useWeb3React } from '@web3-react/core';
import { storeAction, useStore } from 'store';
import { useThemeManager } from 'store/app/hooks';
import { Flex, Card, Box, Text } from 'uikit';
import { Logo, Footer } from 'components';
import { StakeNFT } from 'components/NftList';
import { LoginJoin, SignUp } from './components';
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
const LeftBox = styled(Box)<{
  isbackground?: boolean;
}>`
  width: 62.5vw;
  background-image: url(${({ isbackground }) => !isbackground && sloganImg});
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

const Login: React.FC = React.memo((route: RouteComponentProps) => {
  useFetchSupportNFT();
  useFetchNftList();

  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const loginReduce = useStore(p => p.loginReducer);
  const NftList = useStore(p => p.loginReducer.nftList);
  const { t } = useTranslation();
  const { logout } = useAuth();
  const { isSignup, isSignin, signUpFail, isStakeNft, singUpStep, nftStatus } =
    loginReduce;
  const { account } = useWeb3React();
  const { loginCallback } = useLogin();
  const { getUserName } = useSignIn();
  const [showStakeNft, setshowStakeNft] = useState(false);
  const [isDark] = useThemeManager();
  const redict = location?.state?.from?.pathname;
  const nftBoolean = showStakeNft && singUpStep === 1 && account;

  // 选择链
  // const checkNetwork = async () => {
  //   const chainId: any = await window.ethereum.request({
  //     method: 'eth_chainId'
  //   });
  //   dispatch(storeAction.setChainId({ chainId: parseInt(chainId) }));
  // };

  const signIn = async () => {
    //2.1 用户已经注册登录钱包签名
    const res = await loginCallback(2);
    dispatch(storeAction.setSigninLoading(false));
    if (Api.isSuccess(res)) {
      //2.2 获取用户信息
      const user: any = await getUserName();
      //2.3
      if (Api.isSuccess(user)) {
        // 存储userinfo 跳转首页
        dispatch(storeAction.changeUpdateProfile({ ...user.data }));
        history.replace(`${redict || '/'}`);
      }
    } else {
      logout();
      dispatch(storeAction.changeReset());
      toast.error(t('loginSigninFail') || res?.msg);
    }
  };

  // 查询是否有质押的NFT
  const getStakeType = async account => {
    const nftStake = await FetchNftStakeType(account);
    // 已经质押走登录
    console.log('质押:', nftStake);
    if (nftStake.length > 0 && nftStake[0].token_id) {
      dispatch(storeAction.changeSignin({ isSignin: true }));
    } else {
      dispatch(storeAction.setUserNftStake({ isStakeNft: false }));
    }
  };

  useEffect(() => {
    return () => {
      dispatch(storeAction.changeReset());
    };
  }, []);

  useEffect(() => {
    if (isSignin) {
      signIn();
    }
  }, [isSignin]);

  // 1链接钱包后 首先查询是否有质押
  useEffect(() => {
    console.log(account);
    if (account) {
      // 1.1查询是否有质押
      dispatch(storeAction.setSigninLoading(true));
      getStakeType(account);
    }
  }, [account]);

  useEffect(() => {
    // 2没有质押的情况下
    if (account && nftStatus && !isSignin) {
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
  }, [account, nftStatus, isSignin, NftList, isStakeNft]);

  return (
    <LoginContainer>
      <LeftBox isbackground={Boolean(nftBoolean)}>
        {nftBoolean && (
          <Nft>
            <Text fontSize="30px">选择并质押头像</Text>
            <StakeNFT status={1} />
          </Nft>
        )}
      </LeftBox>
      <Content>
        <Container>
          <LogoWarpper>
            <Logo
              url="/"
              src={`${
                require(isDark
                  ? './images/logo.svg'
                  : './images/light_logo.svg').default
              }`}
            />
          </LogoWarpper>
          {/* 登录或注册 */}
          {isSignup ? (
            <SignUp signUpFail={signUpFail} isStakeNft={isStakeNft} />
          ) : (
            <LoginJoin />
          )}
        </Container>
        <Footer />
      </Content>
    </LoginContainer>
  );
});

export default withRouter(Login);
