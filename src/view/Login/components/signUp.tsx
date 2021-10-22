import React from 'react';
import styled from 'styled-components';
import { useImmer } from 'use-immer';
import { Box, Flex, Text, Button } from 'uikit';
import { SignUpSetName } from './signUpSetName';
import { SignUpcomplete } from './signUpComplete';

import { mediaQueriesSize } from 'uikit/theme/base';

const LoginWarpper = styled(Box)`
  width: 600px;
  height: 700px;
  background: ${({ theme }) => theme.colors.backgroundCard};
  box-shadow: 0px 0px 25px 0px rgba(180, 200, 169, 0.3);
  border-radius: ${({ theme }) => theme.radii.card};
  padding: 43px 45px 0;
  margin-top: 20px;
`

const SignUpWarpper = styled(Flex)`
  padding-top: 35px;
  padding-bottom: 100px;
  flex-direction: column;
  align-items: center;
`
const WalletBody = styled(Flex)`
  justify-content: center;
  align-items: center;
  width: 510px;
  height: 74px;
  background: #292D34;
  border-radius: ${({ theme }) => theme.radii.card};
  margin-bottom: 30px;
`
const SubTitle = styled(Text)`
  color: ${({ theme }) => theme.colors.textSubtle};
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
    <Flex justifyContent="center" flexDirection="column" alignItems="center">
      <FailButton scale="ld" variant="tertiary" disabled>创建账户</FailButton>
      <SubTitle>您的账户中未持有对应的NFT，无法注册</SubTitle>
    </Flex>
  )
})

export const WalletAddress = (() => {
  return (
    <WalletBody>
      <Text fontSize="18px" fontWeight="bold">0x18592.....9w5999w</Text>
    </WalletBody>
  )
})

export const SignUp: React.FC<{
  isSignup?: boolean
}> = (({ isSignup }) => {
  
  const [state, setState] = useImmer({
    setp: 4
  })

  return (
    <LoginWarpper>
      {state.setp === 1 &&
        <React.Fragment>
          <Text fontSize="34px" marginBottom="29px" bold>欢迎加入恐龙社区</Text>
          <SubTitle>平台beta 版本试运营中，目前仅限持有恐龙创世NFT的用户可以注册</SubTitle>
          <SignUpWarpper>
            <WalletAddress />
            {
              isSignup ?
              <Button scale="ld" style={{width: '205px', fontSize: '18px'}}
               onClick={() => setState(state => { state.setp = 2 })}>钱包签名</Button>
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
          <WalletAddress />
          <Flex flexDirection="column" justifyContent="center" alignItems="center">
            <img width="237px" src={require('../images/login_right_images.png').default} />
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
    </LoginWarpper>
  )
})