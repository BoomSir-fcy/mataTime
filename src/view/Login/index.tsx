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
import { mediaQueries, mediaQueriesSize } from 'uikit/theme/base';
import { useFetchSupportNFT, useFetchNftList, FetchNftStakeType } from './hook';
import { StakeNFT } from 'components/NftList';
import { clear } from 'redux-localstorage-simple';
import useAuth from 'hooks/useAuth';

/* eslint-disable */

const LoginContainer = styled(Flex)`
  padding-top: 58px;
  justify-content: center;
  /* flex-wrap: wrap; */
  ${mediaQueries.xxl} {
    /* padding-left: 160px; */
    /* padding-right: 160px; */
  }
`;
const Content = styled(Card)`
  width: 600px;
  height: 700px;
  padding: 25px 40px 0;
`;
const LogoWarpper = styled(Box)`
  width: 337px;
  height: 60px;
  ${mediaQueriesSize.marginbmd}
`;
const Nft = styled(Box)`
  background:${({ theme }) => theme.colors.backgroundCard};
  padding:30px;
  border-radius: 10px;
  height: 100%;
`
const LeftBox = styled.div`
${mediaQueries.sm} {
  margin-right: 20px;
  }
margin-right: 40px;
width: 40vw;
min-width: 400px;
`


const Login: React.FC = React.memo((route: RouteComponentProps) => {
  useFetchSupportNFT()
  useFetchNftList()
  const { logout } = useAuth();
  const dispatch = useDispatch();
  const loginReduce = useStore(p => p.loginReducer);
  const { isSignup, signUpFail, isStakeNft, singUpStep } = loginReduce;
  const [showStakeNft, setshowStakeNft] = useState(false)
  const [isDark] = useThemeManager();
  const { account } = useWeb3React();
  const [ConnectAddr, setConnectAddr] = useState('0')
  // 自己的Nft列表
  const NftList = useStore(p => p.loginReducer.nftList);
  // 选择链
  const checkNetwork = async () => {
    const chainId: any = await window.ethereum.request({ method: 'eth_chainId' });
    dispatch(storeAction.setChainId({ chainId: parseInt(chainId) }));
  };

  // 查询是否有质押的NFT
  const getStakeType = async (account) => {
    const nftStake = await FetchNftStakeType(account)
    if (nftStake[0].token_id) {
      // 已经质押
      dispatch(storeAction.setUserNftStake({ isStakeNft: true }));
    } else {
      dispatch(storeAction.setUserNftStake({ isStakeNft: false }));
    }
  }
  const signOut = () => {
    logout()
    localStorage.clear()
    clear({ namespace: 'redux_localstorage_simple_loginReducer' })
    // dispatch(storeAction.changeSignUp({ isSignup: false }));
    // dispatch(storeAction.changeSignUpStep({ singUpStep: 1 }));
    // dispatch(storeAction.changeSignUpFail({ signUpFail: false }));
    // dispatch(storeAction.setUserNftStake({ isStakeNft: false }));
    location.reload()
    // history.push('/login')
  }
  // 查询是否切换账户
  const isChangeAddr = () => {
    if (ConnectAddr === '0') {
      // 赋值初始化地址
      setConnectAddr(account)
    } else if (ConnectAddr !== account) {
      // 切换了地址就清除数据 重新登陆
      signOut()
    }
  }
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
      // 1.1判断链接钱包后是否切换了钱包账户
      isChangeAddr()
      // 1.2查询是否有质押
      getStakeType(account)
    } else {
      console.log(ConnectAddr, account);
      if (ConnectAddr !== '0') {
        signOut()
      }
    }
    // 页面销毁清除登录状态数据
    return () => {
      // dispatch(storeAction.setUserNftStake({ isStakeNft: false }));
    }
  }, [account])
  useEffect(() => {
    // 2没有质押的情况下
    if (!NftList.length && !isStakeNft) {
      // 没有可用头像，不显示头像列表——注册失败，显示去获取Nft
      setshowStakeNft(false)
      dispatch(storeAction.changeSignUpFail({ signUpFail: true }));
    } else if (NftList.length && !isStakeNft) {
      // 有可用的头像 显示头像列表——可以注册，显示钱包签名
      setshowStakeNft(true)
      dispatch(storeAction.changeSignUpFail({ signUpFail: false }));
    }
    return () => {
      setshowStakeNft(false)
      dispatch(storeAction.changeSignUpFail({ signUpFail: false }));
    }
  }, [NftList, isStakeNft])
  return (
    <React.Fragment>
      <LoginContainer>
        <LeftBox>
          {
            showStakeNft && singUpStep === 1 && account ?
              <Nft>
                <Text fontSize='30px'>选择并质押头像</Text>
                <StakeNFT />
              </Nft>
              :
              <Flex style={{ height: '100%' }}>
                <img src={require('./images/logo_left_images.jpg').default} />
              </Flex>
          }
        </LeftBox>
        <Content>
          <LogoWarpper>
            <Logo url="/" src={`${require(isDark ? './images/logo.svg' : './images/light_logo.svg').default}`} />
          </LogoWarpper>
          {/* 登录或注册 */}
          {isSignup ? <SignUp signUpFail={signUpFail} isStakeNft={isStakeNft} /> : <LoginJoin />}
        </Content>
      </LoginContainer>
      <Footer />
    </React.Fragment>
  );
});

export default withRouter(Login);
