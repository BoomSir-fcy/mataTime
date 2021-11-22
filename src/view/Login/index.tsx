import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useWeb3React } from '@web3-react/core';
import { storeAction, useStore } from 'store';
import { useThemeManager } from 'store/app/hooks';
import { Flex, Card, Box, Text } from 'uikit';
import { Logo, Footer } from 'components';
import { LoginJoin, SignUp } from './components';
import { mediaQueriesSize } from 'uikit/theme/base';
import { useFetchSupportNFT, useFetchNftList, FetchNftStakeType } from './hook';
import { StakeNFT } from 'components/NftList';

import sloganImg from 'assets/images/login_slogan_img.png';

/* eslint-disable */
const LoginContainer = styled(Flex)`
  width: 100vw;
  height: 100vh;
  background: ${({ theme }) => theme.colors.gradients.signinBackground};
  @media screen and (max-width: 768px) {
    height: auto;
    min-height: 100vh;
  }
`;
const LeftBox = styled(Box)<{
  isbackground: boolean;
}>`
  width: 62.5vw;
  background-image: url(${({ isbackground }) => !isbackground && sloganImg});
  background-size: 100% auto;
  background-repeat: no-repeat;
  background-position: center bottom;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;
const Content = styled(Card)`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  width: 37.5vw;
  border-radius: 0;
  background-color: ${({ theme }) => theme.colors.backgroundCard};
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;
const LogoWarpper = styled(Box)`
  width: 337px;
  height: 60px;
  ${mediaQueriesSize.marginbmd}
`;
const Container = styled(Box)`
  height: calc(100vh - 125px);
  padding: 55px 45px 0;
  @media screen and (max-width: 768px) {
    overflow: scroll;
  }
`;
const Nft = styled(Flex)`
  height: 100%;
  justify-content: center;
  flex-direction: column;
  padding: 0 100px;
`;

const Login: React.FC = React.memo((route: RouteComponentProps) => {
  useFetchSupportNFT();
  useFetchNftList();

  const dispatch = useDispatch();
  const loginReduce = useStore(p => p.loginReducer);
  const { isSignup, signUpFail, isStakeNft, singUpStep } = loginReduce;
  const [showStakeNft, setshowStakeNft] = useState(false);
  const [isDark] = useThemeManager();
  const { account } = useWeb3React();
  const [ConnectAddr, setConnectAddr] = useState('0');
  const nftBoolean = Boolean(showStakeNft && singUpStep === 1 && account);

  // 自己的Nft列表
  const NftList = useStore(p => p.loginReducer.nftList);
  // 选择链
  const checkNetwork = async () => {
    const chainId: any = await window.ethereum.request({
      method: 'eth_chainId'
    });
    dispatch(storeAction.setChainId({ chainId: parseInt(chainId) }));
  };

  // 查询是否有质押的NFT
  const getStakeType = async account => {
    const nftStake = await FetchNftStakeType(account);
    if (nftStake[0].token_id) {
      // 已经质押
      dispatch(storeAction.setUserNftStake({ isStakeNft: true }));
    } else {
      dispatch(storeAction.setUserNftStake({ isStakeNft: false }));
    }
  };

  useEffect(() => {
    checkNetwork();
    window.ethereum.on('chainChanged', (chainId: string) => {
      dispatch(storeAction.setChainId({ chainId: parseInt(chainId) }));
    });
    return () => {
      dispatch(storeAction.changeSignUp({ isSignup: false }));
      dispatch(storeAction.changeSignUpStep({ singUpStep: 1 }));
    };
  }, []);

  // 1链接钱包后 首先查询是否有质押
  useEffect(() => {
    if (account) {
      // 1.1查询是否有质押
      getStakeType(account);
    }
    // 页面销毁清除登录状态数据
    return () => {
      // dispatch(storeAction.setUserNftStake({ isStakeNft: false }));
    };
  }, [account]);

  useEffect(() => {
    // 2没有质押的情况下
    if (!NftList.length && !isStakeNft) {
      // 没有可用头像，不显示头像列表——注册失败，显示去获取Nft
      setshowStakeNft(false);
      dispatch(storeAction.changeSignUpFail({ signUpFail: true }));
    } else if (NftList.length && !isStakeNft) {
      // 有可用的头像 显示头像列表——可以注册，显示钱包签名
      setshowStakeNft(true);
      dispatch(storeAction.changeSignUpFail({ signUpFail: false }));
    }
    return () => {
      setshowStakeNft(false);
      dispatch(storeAction.changeSignUpFail({ signUpFail: false }));
    };
  }, [NftList, isStakeNft]);

  console.log(nftBoolean);
  return (
    <LoginContainer>
      <LeftBox isbackground={nftBoolean}>
        {nftBoolean && (
          <Nft>
            <Text fontSize="30px">选择并质押头像</Text>
            <StakeNFT />
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
