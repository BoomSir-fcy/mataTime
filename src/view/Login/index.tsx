import React from 'react';
import styled from 'styled-components';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { storeAction, useStore } from 'store';
import { useThemeManager } from 'store/app/hooks';
import { Flex, Card, Box } from 'uikit';
import { Logo, Footer } from 'components';
import { LoginJoin, SignUp } from './components';
import { mediaQueries, mediaQueriesSize } from 'uikit/theme/base';
import { StakeNFT } from './components/StakeNFT';

const LoginContainer = styled(Flex)`
  padding-top: 58px;
  ${mediaQueries.xxl} {
    padding-left: 160px;
    padding-right: 160px;
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

const Login: React.FC = React.memo((route: RouteComponentProps) => {
  const dispatch = useDispatch();
  const loginReduce = useStore(p => p.loginReducer);
  const { isSignup, signUpFail, isStakeNft } = loginReduce;
  const [isDark] = useThemeManager();

  const checkNetwork = async () => {
    const chainId: any = await window.ethereum.request({ method: 'eth_chainId' });
    dispatch(storeAction.setChainId({ chainId: parseInt(chainId) }));
  };

  React.useEffect(() => {
    checkNetwork();
    window.ethereum.on('chainChanged', (chainId: string) => {
      dispatch(storeAction.setChainId({ chainId: parseInt(chainId) }));
    });
    return () => {
      dispatch(storeAction.changeSignUp({ isSignup: false }));
      dispatch(storeAction.changeSignUpStep({ singUpStep: 1 }));
    };
  }, []);

  return (
    <React.Fragment>
      <LoginContainer>
        <Flex flex="1">
          <img src={require('./images/logo_left_images.png').default} />
        </Flex>
        <Content>
          <LogoWarpper>
            <Logo url="/" src={`${require(isDark ? './images/logo.svg' : './images/light_logo.svg').default}`} />
          </LogoWarpper>
          {isSignup ? <SignUp isSignup={signUpFail} isStakeNft={isStakeNft} /> : <LoginJoin />}
        </Content>
      </LoginContainer>
      <StakeNFT />
      <Footer />
    </React.Fragment>
  );
});

export default withRouter(Login);
