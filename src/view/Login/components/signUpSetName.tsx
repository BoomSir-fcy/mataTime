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
import { useLogin, useSignIn } from '../hooks';
import { useContract } from '../hook';
import { WalletAddress } from './signUp';
import { useTranslation } from 'contexts/Localization';

import Dots from 'components/Loader/Dots';

const InputItems = styled(Flex)`
  position: relative;
`;
const InputText = styled(Text)`
  width: 120px;
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
  color: ${({ theme }) => theme.colors.white_black};
  background: ${({ theme }) => theme.colors.backgroundTextArea};
  border-radius: 10px;
  padding-left: 25px;
  border: 0;
  outline: 0;
  &::placeholder {
    color: ${({ theme }) => theme.colors.textTips};
  }
`;
const Submit = styled(Button)`
  width: 205px;
  text-transform: capitalize;
`;
const NameVerify = styled(Text)`
  position: absolute;
  left: 150px;
  bottom: -22px;
`;

export const SignUpSetName: React.FC<{
  status?: boolean;
}> = React.memo(({ status }) => {
  const dispatch = useDispatch();
  const { loginCallback } = useLogin();
  const { getUserName, siginInVerify } = useSignIn();
  const [state, setState] = useImmer({
    isSignin: false,
    nickName: ''
  });
  const [haveNickName, sethaveNickName] = useState(true);
  const { account } = useWeb3React();
  const { t } = useTranslation();
  const { checkNickname, createUser } = useContract();
  const nft = useStore(p => p.loginReducer.nft);
  const loading = useStore(p => p.loginReducer.signinLoading);
  let timer: any = 0;

  // 轮询查找用户是否注册
  const verify = () => {
    timer = setInterval(async () => {
      toast.warning(t('loginSigninSearch'));
      const res = await siginInVerify(account.toLowerCase());
      if (Boolean(res)) {
        timer && clearInterval(timer);
        signIn();
      }
    }, 6000);
  };

  const signIn = async () => {
    timer && clearInterval(timer);
    const res = await loginCallback(2);
    dispatch(storeAction.setSigninLoading(false));
    if (Api.isSuccess(res)) {
      const user: any = await getUserName();
      if (Api.isSuccess(user)) {
        dispatch(storeAction.changeUpdateProfile({ ...user.data }));
        dispatch(storeAction.changeSignUpStep({ singUpStep: 3 }));
      }
    } else {
      toast.error(res.data);
      setState(p => {
        p.isSignin = true;
      });
    }
  };

  const submitProfile = React.useCallback(async () => {
    if (!state.nickName) {
      sethaveNickName(false);
      return;
    }
    dispatch(storeAction.setSigninLoading(true));
    const res = await checkNickname(state.nickName);
    if (!res[0] && res[1]) {
      const userInfo = await createUser(
        state.nickName,
        nft.properties.token,
        nft.properties.token_id
      );
      if (Boolean(userInfo)) {
        verify();
      } else {
        dispatch(storeAction.setSigninLoading(false));
        toast.error(t('loginSignupFail'));
      }
    } else if (!res[0] && !res[1]) {
      dispatch(storeAction.setSigninLoading(false));
      toast.error(t('loginSetNickNameFail'));
    } else {
      dispatch(storeAction.setSigninLoading(false));
      toast.error(t('loginSetNickNameRepeat'));
    }
  }, [state]);

  React.useEffect(() => {
    return () => {
      timer && clearInterval(timer);
    };
  }, []);

  return (
    <Box>
      <Text
        fontSize="34px"
        marginBottom="29px"
        bold
        style={{ textTransform: 'capitalize' }}
      >
        {t('loginWelcome')}
      </Text>
      <WalletAddress address={account} />
      <Box paddingTop="25px">
        <InputItems marginBottom="32px" alignItems="center">
          <InputText>{t('loginInputTitleAvatar')}</InputText>
          <Flex alignItems="flex-end">
            {nft.image && <InputNftImg src={nft.image} />}
            <Text color="textTips">{t('loginInputValueAvatar')}</Text>
          </Flex>
        </InputItems>
        <InputItems marginBottom="27px" alignItems="center">
          <InputText>{t('loginInputTitleNickname')}</InputText>
          <InputNickName
            onChange={event => {
              if (event.target.value.length < 1) {
                sethaveNickName(false);
              } else {
                sethaveNickName(true);
              }
              setState(p => {
                p.nickName = event.target.value;
              });
            }}
            minLength={6}
            maxLength={20}
            placeholder={t('loginInputValueNickname')}
          />
          {!haveNickName && (
            <NameVerify small color="red">
              {t('loginSetNickNameEmpty')}
            </NameVerify>
          )}
        </InputItems>
      </Box>
      <Flex justifyContent="center">
        <Submit
          scale="ld"
          onClick={state.isSignin ? signIn : submitProfile}
          disabled={!status}
        >
          {Boolean(loading) ? (
            <Dots>{t('loginSignUpNext')}</Dots>
          ) : (
            t('loginSignUpNext')
          )}
        </Submit>
      </Flex>
    </Box>
  );
});
