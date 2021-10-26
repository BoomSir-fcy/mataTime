import React from 'react';
import styled from 'styled-components';
import { useImmer } from 'use-immer';
import { useDispatch } from "react-redux";
import { useWeb3React } from '@web3-react/core';
import { Box, Flex, Text, Button, Card } from 'uikit';
import { Logo } from 'components';
import { SignUpSetName } from './signUpSetName';
import { SignUpcomplete } from './signUpComplete';

import { mediaQueriesSize } from 'uikit/theme/base';
import { shortenAddress } from 'utils/contract';
import { walletLocalStorageKey, walletIcon } from 'config/wallet';

import { useLogin } from '../hooks';

const Warpper = styled(Card)`
  width: 600px;
  height: 700px;
  padding: 25px 40px 0;
`
const LogoWarpper = styled(Box)`
  width: 337px;
  height: 60px;
  ${mediaQueriesSize.marginbmd}
`
const SignUpWarpper = styled(Flex)`
  padding-top: 50px;
  padding-bottom: 100px;
  flex-direction: column;
  align-items: center;
`
const WalletBody = styled(Flex)`
  justify-content: center;
  align-items: center;
  width: 510px;
  height: 70px;
  background: #292D34;
  border-radius: ${({ theme }) => theme.radii.card};
  margin-bottom: 30px;
`
const SubTitle = styled(Text)`
  color: ${({ theme }) => theme.colors.textOrigin};
`
const TextTips = styled(Text)`
  color: ${({ theme }) => theme.colors.textTips};
`
const FailButton = styled(Button)`
  width: 205px;
  margin-bottom: 23px;
`
const SignUpText = styled(Text)`
  font-size: 34px;
  font-weight: bold;
  ${mediaQueriesSize.marginUD}
`
const SignUpSubText = styled(Text)`
  font-size: 20px;
  ${mediaQueriesSize.marginb}
`

const SignUpFail = (() => {
  return (
    <Flex width="100%" flexDirection="column">
      <Flex justifyContent="space-between">
        <FailButton scale="ld" variant="tertiary">创建账户</FailButton>
        <FailButton scale="ld">获取NFT</FailButton>
      </Flex>
      <SubTitle>您的账户中未持有对应的NFT，无法注册</SubTitle>
    </Flex>
  )
})

export const WalletAddress: React.FC<{
  address?: string
}> = (({ address}) => {

  const connector = window.localStorage.getItem(walletLocalStorageKey);
  const Icon = walletIcon[connector];

  return (
    <WalletBody>
      <Icon width="40px" mr="30px" />
      <Text fontSize="18px" fontWeight="bold">{shortenAddress(address || "")}</Text>
    </WalletBody>
  )
})

export const SignUp: React.FC<{
  isSignup?: boolean
}> = (({ isSignup }) => {

  const dispatch = useDispatch();
  const { loginCallback } = useLogin();
  const { account } = useWeb3React();
  const [state, setState] = useImmer({
    setp: 1
  });

  const signHandle = React.useCallback(async () => {
    const res = await loginCallback(1);
    setState(state => { state.setp = 2 });
  }, [dispatch, loginCallback])

  return (
    <Warpper>
      {state.setp === 1 &&
        <React.Fragment>
          <LogoWarpper>
            <Logo url="/" src={require('../images/logo.svg').default} />
          </LogoWarpper>
          <Text fontSize="34px" marginBottom="29px" bold>欢迎加入恐龙社区</Text>
          <SubTitle>平台beta 版本试运营中，目前仅限持有恐龙创世NFT的用户可以注册</SubTitle>
          <SignUpWarpper>
            <WalletAddress address={account} />
            {
              isSignup ?
              <Button scale="ld" style={{width: '205px', fontSize: '18px'}}
               onClick={() => signHandle()}>钱包签名</Button>
              :
              <SignUpFail />
            }
          </SignUpWarpper>
          <TextTips>使用您的数字钱包账号即可免费创建并登录恐龙社区，平台不会保存您的任何钱包敏感数据，请妥善保管您的钱包，丢失钱包则无法登录平台</TextTips>
        </React.Fragment>
      }
      {
        state.setp === 2 && 
        <Box>
          <LogoWarpper>
            <Logo url="/" src={require('../images/logo.svg').default} />
          </LogoWarpper>
          <Text fontSize="34px" marginBottom="24px" bold>欢迎加入恐龙社区</Text>
          <WalletAddress address={account} />
          <Flex flexDirection="column" justifyContent="center" alignItems="center">
            <img width="230px" src={require('../images/login_right_images.png').default} />
            <SignUpText>注册成功！</SignUpText>
            <SignUpSubText>感谢您加入恐龙社交平台</SignUpSubText>
            <Button scale="ld" onClick={() => setState(state => { state.setp = 3 })}>下一步，个人信息</Button>
          </Flex>
        </Box>
      }
      {
        state.setp === 3 && 
        <SignUpSetName />
      }
      {
        state.setp === 4 && 
        <SignUpcomplete />
      }
    </Warpper>
  )
})