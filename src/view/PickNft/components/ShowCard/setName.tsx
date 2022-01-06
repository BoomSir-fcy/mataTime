/* eslint-disable */
import React, { useCallback, useState, useEffect } from 'react';
import BigNumber from 'bignumber.js';
import history from 'routerHistory';
import { Flex, Box, Text, Button, InputPanel, Input } from 'uikit';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useWeb3React } from '@web3-react/core';
import { BIG_TEN } from 'utils/bigNumber';
import Dots from 'components/Loader/Dots';
import { Api } from 'apis';
import { useStore, storeAction } from 'store';
import { useTranslation } from 'contexts/Localization';
import { shortenAddress } from 'utils/contract';
import { useImmer } from 'use-immer';
import { getBLen } from 'utils';
import { useContract } from 'view/Login/hook';
import { useToast } from 'hooks';
import { useLogin, useSignIn } from 'view/Login/hooks';

const CountBox = styled(Box)``;

const Submit = styled(Button)`
  width: 100%;
  text-transform: capitalize;
`;

const InputItems = styled(Flex)`
  position: relative;
  width: 100%;
`;
const MyInput = styled(Input)`
  border-radius: 10px;
  padding: 12px 16px;
  height: 50px;
  background: ${({ theme }) => theme.colors.backgroundTextArea};
  color: ${({ theme }) => theme.colors.white_black};
  &::placeholder {
    color: ${({ theme }) => theme.colors.textTips};
  }
`;

const WalletAddr = styled.div`
  padding: 4px 8px;
  font-size: 14px;
  background: ${({ theme }) => theme.colors.tertiary};
  border-radius: 10px;
`;

const NameVerify = styled(Text)`
  width: 100%;
  position: absolute;
  left: 2px;
  top: 75px;
`;

const BtnBox = styled(Flex)`
  padding: 16px 0;
`;

interface init {
  onComplete: (name: string) => void;
}

const SetNickName: React.FC<init> = ({ onComplete }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { account } = useWeb3React();
  const [val, setVal] = useState('');
  const [pending, setpending] = useState(false);
  const [haveNickName, sethaveNickName] = useState(false);
  const [state, setState] = useImmer({
    isSignin: false,
    nickName: '',
  });
  const { checkNickname } = useContract();
  const { siginInVerify, getUserName } = useSignIn();
  const { toastSuccess, toastWarning, toastError } = useToast();
  const { loginCallback } = useLogin();

  let timer: any = 0;
  // 轮询查找用户是否注册
  const verify = () => {
    timer = setInterval(async () => {
      toastWarning(t('loginSigninSearch'));
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
        dispatch(storeAction.changeSignUp({ isSignup: true }));
        dispatch(storeAction.changeSignUpStep({ singUpStep: 3 }));
        history.push('/login');
      }
    } else {
      toastError(res.data);
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
    setpending(true);
    const res = await checkNickname(state.nickName);
    if (!res[0] && res[1]) {
      try {
        const userInfo = await onComplete(state.nickName);
        if (Boolean(userInfo)) {
          verify();
        } else {
          dispatch(storeAction.setSigninLoading(false));
          toastError(t('loginSignupFail'));
        }
      } catch (error) {
        toastError(t('loginSignupFail'));
        console.log(error);
      } finally {
        setpending(false);
      }
    } else if (!res[0] && !res[1]) {
      toastError(t('loginSetNickNameFail'));
    } else {
      toastError(t('loginSetNickNameRepeat'));
    }
    setpending(false);
  }, [state]);

  return (
    <CountBox>
      <Flex mb='16px' justifyContent='space-between' alignItems='center'>
        <Text>{t('loginInputTitleNickname')}</Text>
        <WalletAddr>{shortenAddress(account, 3)}</WalletAddr>
      </Flex>
      <InputItems marginBottom='30px' alignItems='center'>
        <Box width='100%'>
          <MyInput
            onChange={event => {
              const { value } = event.target;
              if (event.target.value.length < 1) {
                sethaveNickName(false);
              } else {
                sethaveNickName(true);
              }
              let nick_name = value
                .replace(/(^\s*)|(\s*$)/g, '')
                .replace(/\s+/g, ' ');
              setState(p => {
                p.nickName = nick_name;
              });
            }}
            value={state.nickName}
            maxLength={30}
            placeholder={t('loginSetNickNameEmpty')}
          />
          <Text
            color={getBLen(state.nickName) > 30 ? 'failure' : 'textTips'}
            textAlign='right'
            ellipsis
          >
            {t('loginCountCharacters', { value: getBLen(state.nickName) })}
          </Text>
          <NameVerify small color='textTips' textAlign='right'>
            {t('loginInputValueNickname')}
          </NameVerify>
        </Box>
      </InputItems>
      <BtnBox justifyContent='center'>
        <Submit
          scale='ld'
          onClick={state.isSignin ? signIn : submitProfile}
          disabled={!haveNickName || pending}
        >
          {Boolean(pending) ? (
            <Dots>{t('loginSignUpComplete')}</Dots>
          ) : (
            t('loginSignUpComplete')
          )}
        </Submit>
      </BtnBox>
    </CountBox>
  );
};

export default SetNickName;
