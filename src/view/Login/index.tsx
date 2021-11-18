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
  width: 40vw;
  min-width: 400px;
  height: 100%;
`
const LeftBox = styled.div`
${mediaQueries.sm} {
  margin-right: 20px;
  }
margin-right: 40px;
`


const Login: React.FC = React.memo((route: RouteComponentProps) => {
  useFetchSupportNFT()
  useFetchNftList()
  const dispatch = useDispatch();
  const loginReduce = useStore(p => p.loginReducer);
  const { isSignup, signUpFail, isStakeNft, singUpStep } = loginReduce;
  const [showStakeNft, setshowStakeNft] = useState(false)
  const [isDark] = useThemeManager();
  const { account } = useWeb3React();
  // 自己的Nft列表
  const NftList = useStore(p => p.loginReducer.nftList);

  // 查询是否有质押的NFT
  const getStakeType = async (account) => {
    const nftStake = await FetchNftStakeType(account)
    if (nftStake[0].token_id) {
      setshowStakeNft(false)
      dispatch(storeAction.setUserNftStake({ isStakeNft: true }));
      // dispatch(storeAction.changeSignUp({ isSignup: true }));
    } else {
      setshowStakeNft(true)
    }
  }

  const checkNetwork = async () => {
    const chainId: any = await window.ethereum.request({ method: 'eth_chainId' });
    dispatch(storeAction.setChainId({ chainId: parseInt(chainId) }));
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
  useEffect(() => {
    if (!NftList.length) {
      dispatch(storeAction.changeSignUpFail({ signUpFail: true }));
    } else {
      dispatch(storeAction.changeSignUpFail({ signUpFail: false }));
    }
  }, [NftList])
  useEffect(() => {
    Boolean(account) && getStakeType(account)
  }, [account])
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
