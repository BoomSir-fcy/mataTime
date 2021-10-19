import React from 'react';
import styled from 'styled-components';
import { Box, Flex, Text, Button } from 'uikit';

const LoginWarpper = styled(Box)`
  width: 600px;
  height: 558px;
  background: #191F2D;
  box-shadow: 0px 0px 25px 0px rgba(180, 200, 169, 0.3);
  border-radius: 10px;
  padding: 43px 45px 0;
  margin-top: 20px;
`

const SignUpWarpper = styled(Flex)`
  padding-top: 35px;
  padding-bottom: 120px;
  flex-direction: column;
  align-items: center;
`
const WalletBody = styled(Flex)`
  justify-content: center;
  align-items: center;
  width: 510px;
  height: 74px;
  background: #292D34;
  border-radius: 10px;
  margin-bottom: 30px;
`

export const SignUp = (() => {
  return (
    <LoginWarpper>
      <Text fontSize="34px" marginBottom="29px" bold>欢迎加入恐龙社区</Text>
      <Text color="rgba(236, 97, 43, 1)">平台beta 版本试运营中，目前仅限持有恐龙创世NFT的用户可以注册</Text>
      <SignUpWarpper>
        <WalletBody>
          <Text fontSize="18px" fontWeight="bold">0x18592.....9w5999w</Text>
        </WalletBody>
        <Button scale="ld" style={{width: '205px', fontSize: '18px'}}>钱包签名</Button>
      </SignUpWarpper>
      <Text color="rgba(181, 181, 181, 1)">使用您的数字钱包账号即可免费创建并登录恐龙社区，平台不会保存您的任何钱包敏感数据，请妥善保管您的钱包，丢失钱包则无法登录平台</Text>
    </LoginWarpper>
  )
})