import React, { useState } from 'react';
import styled from 'styled-components';
import { useImmer } from 'use-immer';
import { useDispatch } from 'react-redux';
import { useWeb3React } from '@web3-react/core';
import { Box, Flex, Text, Button } from 'uikit';
import { mediaQueriesSize } from 'uikit/theme/base';
import { Api } from 'apis';
import { toast } from 'react-toastify';
import { useStore, storeAction } from 'store';
import { useSignIn } from '../hooks';
import { WalletAddress } from './signUp';
import { useTranslation } from 'contexts/Localization';

const InputItems = styled(Flex)`
  position: relative;
`;
const InputText = styled(Text)`
  width: 100px;
  min-width: 100px;
  ${mediaQueriesSize.marginr}
`;

const InputNftImg = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 10px;
  ${mediaQueriesSize.marginr}
`;

const InputNickName = styled.input`
  width: 381px;
  height: 50px;
  background: ${({ theme }) => theme.colors.backgroundTextArea};
  border-radius: 10px;
  padding-left: 25px;
  border: 0;
  outline: 0;
`;

const Submit = styled(Button)`
  width: 205px;
  text-transform: capitalize;
  ${mediaQueriesSize.margint}
`;
const NameVerify = styled(Text)`
  position: absolute;
  left: 150px;
  bottom: -22px;
`

export const SignUpSetName = React.memo(() => {
  const dispatch = useDispatch();
  const nft = useStore(p => p.loginReducer.nft);
  const [state, setState] = useImmer({
    nickName: ''
  });
  const [haveNickName, sethaveNickName] = useState(true)
  const { account } = useWeb3React();
  const { addNickName } = useSignIn();
  const { t } = useTranslation();

  const submitProfile = React.useCallback(async () => {
    if (!state.nickName) {
      sethaveNickName(false)
      return
    }
    const res = await addNickName(state.nickName);
    if (Api.isSuccess(res)) {
      dispatch(storeAction.changeSignUpStep({ singUpStep: 4 }));
    } else {
      if (res.code === 20106) {
        toast.error('昵称已存在!');
      } else {
        toast.error('设置昵称失败,请重试');
      }
    }
  }, [state]);

  return (
    <Box>
      <Text fontSize="34px" marginBottom="29px" bold style={{ textTransform: 'uppercase' }}>
        {t('loginWelcome')}
      </Text>
      <WalletAddress address={account} />
      <Box paddingTop="25px">
        <InputItems marginBottom="32px" alignItems="center">
          <InputText>{t('loginInputTitleAvatar')}</InputText>
          <Flex alignItems="flex-end">
            <InputNftImg src={nft.nftUrl} />
            <Text color="textTips">{t('loginInputValueAvatar')}</Text>
          </Flex>
        </InputItems>
        <InputItems alignItems="center">
          <InputText>{t('loginInputTitleNickname')}</InputText>
          <InputNickName
            onChange={event => {
              if (event.target.value.length < 1) {
                sethaveNickName(false)
              } else {
                sethaveNickName(true)
              }
              setState(p => {
                p.nickName = event.target.value;
              });
            }}
            maxLength={20}
            placeholder={t('loginInputValueNickname')}
          />
          {!haveNickName && <NameVerify small color='red'>请输入昵称</NameVerify>}
        </InputItems>
      </Box>
      <Flex justifyContent="center">
        <Submit scale="ld" onClick={submitProfile}>
          {t('loginSignUpNext')}
        </Submit>
      </Flex>
    </Box>
  );
});
