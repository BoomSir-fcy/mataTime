import React, { useCallback } from 'react';
import styled from 'styled-components';
import random from 'lodash/random';
import { useDispatch } from "react-redux";
import { useWeb3React } from '@web3-react/core';
import { useStore, storeAction, Dispatch } from 'store';
import { Box, Flex, Text, Button, Card } from 'uikit';
import { ConnectWalletButton } from 'components'
import { useLogin, useSignIn } from '../hooks'

import { Logo } from 'components';

import { mediaQueriesSize } from 'uikit/theme/base';

// interface 

const LoginWarpper = styled(Card)`
  width: 600px;
  height: 700px;
  padding: 25px 40px 0;
`
const LogoWarpper = styled(Box)`
  width: 337px;
  height: 60px;
  ${mediaQueriesSize.marginbmd}
`

const SubTitle = styled(Text)`
  color: ${({ theme }) => theme.colors.textSubtle};
`

const TextTips = styled(Text)`
  color: ${({ theme }) => theme.colors.textTips};
`

const ConnectWallet = styled(Flex)`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 70px 0 79px;
  position: relative;
`
const LoginButton = styled(Button)`
  position: absolute;
  bottom: 40px;
`

export const LoginJoin = React.memo(() => {
  const dispatch = useDispatch();
  // const { loginCallback } = useLogin();
  const { signInCallback } = useSignIn();
  const { account } = useWeb3React();

  // const loginHandle = useCallback(async () => {
  //   const res = await loginCallback(1)
  // }, [dispatch, loginCallback])

  const signUp = async() => {
    const res = await signInCallback();
    console.log(res);
    // dispatch(storeAction.changeSignUp({isSignup: true}))
  }

  React.useEffect(() => {
    Boolean(account) && signUp();
  }, [account]);
  
  return (
    <LoginWarpper>
      <LogoWarpper>
        <Logo url="/" src={require('../images/logo.svg').default} />
      </LogoWarpper>
      <Text fontSize="34px" marginBottom="29px" bold>欢迎加入恐龙社区</Text>
      <SubTitle>平台beta 版本试运营中，目前仅限持有恐龙创世NFT的用户可以注册</SubTitle>
      <ConnectWallet>
        <img width="40%" src={require('../images/login_right_images.png').default} />
        <ConnectWalletButton />
        {/* <LoginButton scale="ld" variant="primary"
          onClick={loginHandle}>
          Login
        </LoginButton> */}
      </ConnectWallet>
      <TextTips>使用您的数字钱包账号即可免费创建并登录恐龙社区，平台不会保存您的任何钱包敏感数据，请妥善保管您的钱包，丢失钱包则无法登录平台</TextTips>
    </LoginWarpper>
  )
})