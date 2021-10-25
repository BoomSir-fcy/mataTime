import React, { useCallback } from 'react';
import styled from 'styled-components';
import random from 'lodash/random';
import { useDispatch } from "react-redux";
import { useStore, storeAction, Dispatch } from 'store';
import { Box, Flex, Text, Button } from 'uikit';
import { ConnectWalletButton } from 'components'
import { useLogin } from '../hooks'

import { Logo } from 'components';

import { mediaQueriesSize } from 'uikit/theme/base';

// interface 

const LoginWarpper = styled(Box)`
  width: 600px;
  height: 700px;
  background: ${({ theme }) => theme.colors.backgroundCard};
  border-radius: ${({ theme }) => theme.radii.card};
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
  const { loginCallback } = useLogin();

  const loginHandle = useCallback(async () => {
    // const signMessage = {
    //   network: 1,
    //   sign_time: Math.floor(new Date().getTime() / 1000),
    //   operation_type: 1,
    //   nonce: random(0xFFFF_FFFF, 0xFFFF_FFFF_FFFF),
    // }
    const res = await loginCallback(1)
    console.log(res)
    // dispatch(storeAction.changeSignUp({isSignup: true}))
  }, [dispatch, loginCallback])
  return (
    <LoginWarpper>
      <LogoWarpper>
        <Logo url="/" src={require('../images/logo.svg').default} />
      </LogoWarpper>
      <Text fontSize="34px" marginBottom="29px" bold>欢迎加入恐龙社区</Text>
      <SubTitle>平台beta 版本试运营中，目前仅限持有恐龙创世NFT的用户可以注册</SubTitle>
      <ConnectWallet>
        <img width="40%" src={require('../images/login_right_images.png').default} />
        <ConnectWalletButton>
          Connerct Wallet
        </ConnectWalletButton>
        <LoginButton scale="ld" variant="primary"
          onClick={loginHandle}>
          Login
        </LoginButton>
      </ConnectWallet>
      <TextTips>使用您的数字钱包账号即可免费创建并登录恐龙社区，平台不会保存您的任何钱包敏感数据，请妥善保管您的钱包，丢失钱包则无法登录平台</TextTips>
    </LoginWarpper>
  )
})