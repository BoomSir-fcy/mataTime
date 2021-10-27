import React from 'react';
import styled from 'styled-components';
import { useDispatch } from "react-redux";
import { useWeb3React } from '@web3-react/core';
import { Box, Flex, Text, Button } from 'uikit';
import { mediaQueriesSize } from 'uikit/theme/base';
import { Logo } from 'components';

import { useStore, storeAction } from 'store';

import { WalletAddress } from './signUp';

const LogoWarpper = styled(Box)`
  width: 337px;
  height: 60px;
  ${mediaQueriesSize.marginbmd}
`

const InputItems = styled(Flex)`

`
const InputText = styled(Text)`
  min-width: 85px;
  ${mediaQueriesSize.marginr}
`

const InputNftImg = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 10px;
  ${mediaQueriesSize.marginr}
`

const InputNickName = styled.input`
  width: 381px;
  height: 50px;
  background: #292D34;
  border-radius: 10px;
  padding-left: 25px;
  border: 0;
  outline: 0;
`

const Submit = styled(Button)`
  width: 205px;
  ${mediaQueriesSize.margint}
`

export const SignUpSetName = React.memo(() => {

  const dispatch = useDispatch();
  const { account } = useWeb3React();

  const setProfile = React.useCallback(async() => {
    dispatch(storeAction.changeSignUpStep({singUpStep: 4}));
  }, []);

  return(
    <Box>
      <LogoWarpper>
        <Logo url="/" src={require('../images/logo.svg').default} />
      </LogoWarpper>
      <Text fontSize="34px" marginBottom="29px" bold>欢迎加入恐龙社区</Text>
      <WalletAddress address={account} />
      <Box paddingTop="25px">
        <InputItems marginBottom="32px">
          <InputText>* NFT头像</InputText>
          <Flex alignItems="flex-end">
            <InputNftImg src="" />
            <Text color="#B5B5B5">默认展示您的恐龙NFT头像</Text>
          </Flex>
        </InputItems>
        <InputItems alignItems="center">
          <InputText>*设置昵称</InputText>
          <InputNickName placeholder="最多20个字符" />
        </InputItems>
      </Box>
      <Flex justifyContent="center">
        <Submit scale="ld" onClick={setProfile}>下一步</Submit>
      </Flex>
    </Box>
  )
})
