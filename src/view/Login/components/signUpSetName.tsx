import React, { useState } from 'react';
import styled from 'styled-components';
import { useImmer } from 'use-immer';
import { useDispatch } from 'react-redux';
import { useWeb3React } from '@web3-react/core';
import { useToast } from 'hooks';
import { Box, Flex, Text, Button } from 'uikit';
import { mediaQueriesSize } from 'uikit/theme/base';
import { Api } from 'apis';
import { useStore, storeAction } from 'store';
import { useLogin, useSignIn } from '../hooks';
import { FetchNftStakeType, useContract } from '../hook';
import { WalletAddress } from './signUp';
import { useTranslation } from 'contexts/Localization';
import { isAddress, shortenAddress } from 'utils/contract';
import Dots from 'components/Loader/Dots';
import { AddressZero } from '@ethersproject/constants';
import { getBLen } from 'utils';

const InputItems = styled(Flex)`
  position: relative;
  width: 100%;
`;
const InputText = styled(Text)`
  width: 120px;
  min-width: 104px;
  ${mediaQueriesSize.marginr}
`;
const InputNftImg = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 10px;
  ${mediaQueriesSize.marginr}
`;
const InputNickName = styled.input`
  max-width: 381px;
  width: 100%;
  height: 50px;
  color: ${({ theme }) => theme.colors.white_black};
  background: ${({ theme }) => theme.colors.backgroundTextArea};
  border-radius: 10px;
  padding-left: 25px;
  padding-right: 96px;
  border: 0;
  outline: 0;
  &::placeholder {
    color: ${({ theme }) => theme.colors.textTips};
  }
`;
const InputAddress = styled(InputNickName)`
  padding-right: 25px;
`;

const NickNameBox = styled.div`
  position: relative;
  width: 100%;
`;

const Submit = styled(Button)`
  width: 205px;
  text-transform: capitalize;
`;
const NameVerify = styled(Text)`
  width: 100%;
  position: absolute;
  left: 2px;
  top: 75px;
`;
const WalletAddr = styled.div`
  position: absolute;
  padding: 4px 8px;
  font-size: 14px;
  right: 10px;
  bottom: 12px;
  background: ${({ theme }) => theme.colors.tertiary};
  border-radius: 10px;
`;
export const SignUpSetName: React.FC<{
  status?: boolean;
}> = React.memo(({ status }) => {
  const dispatch = useDispatch();
  const { loginCallback } = useLogin();
  const { getUserName, siginInVerify } = useSignIn();
  const { toastWarning, toastError } = useToast();
  const [state, setState] = useImmer({
    isSignin: false,
    nickName: ''
  });
  const [inviteinfo, setinviteinfo] = useImmer({
    inviteAddr: '',
    isRightAdd: true,
    isActive: true
  });
  const [haveNickName, sethaveNickName] = useState(false);
  const { account } = useWeb3React();
  const { t } = useTranslation();
  const { checkNickname, createUser } = useContract();
  const nft = useStore(p => p.loginReducer.nft);
  const loading = useStore(p => p.loginReducer.signinLoading);
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
        dispatch(storeAction.changeSignUpStep({ singUpStep: 3 }));
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

    if (!inviteinfo.isRightAdd || !inviteinfo.isActive) {
      return;
    }
    const inviteAddr =
      inviteinfo.inviteAddr === '' ? AddressZero : inviteinfo.inviteAddr;

    dispatch(storeAction.setSigninLoading(true));
    const res = await checkNickname(state.nickName);
    if (!res[0] && res[1]) {
      const userInfo = await createUser(
        state.nickName,
        nft.properties?.token,
        nft.properties?.token_id,
        inviteAddr
      );
      if (Boolean(userInfo)) {
        verify();
      } else {
        dispatch(storeAction.setSigninLoading(false));
        toastError(t('loginSignupFail'));
      }
    } else if (!res[0] && !res[1]) {
      dispatch(storeAction.setSigninLoading(false));
      toastError(t('loginSetNickNameFail'));
    } else {
      dispatch(storeAction.setSigninLoading(false));
      toastError(t('loginSetNickNameRepeat'));
    }
  }, [state, nft, inviteinfo]);

  const getAddresQualifications = account => {
    const getIsActive = async addr => {
      // 查询地址是否有邀请资格
      const [{ isActive }] = await FetchNftStakeType(addr);
      setinviteinfo(p => {
        p.isActive = isActive;
        p.isRightAdd = true;
      });
    };
    if (isAddress(account)) {
      setinviteinfo(p => {
        p.inviteAddr = account;
        p.isRightAdd = true;
        p.isActive = true;
      });
      getIsActive(account);
    } else {
      setinviteinfo(p => {
        p.inviteAddr = account;
        p.isRightAdd = account === '' ? true : false;
        p.isActive = true;
      });
    }
  };

  // 邀请地址验证
  const handleChange = React.useCallback(e => {
    if (e.currentTarget.validity.valid) {
      // 是否为正确地址
      const addr = e.currentTarget.value;
      getAddresQualifications(addr);
      // if (isAddress(e.currentTarget.value)) {
      //   setinviteinfo(p => {
      //     p.inviteAddr = addr;
      //     p.isRightAdd = true;
      //     p.isActive = true
      //   })
      // } else {
      //   setinviteinfo(p => {
      //     p.inviteAddr = addr;
      //     p.isRightAdd = addr === '' ? true : false;
      //     p.isActive = true
      //   })
      // }
    }
  }, []);

  React.useEffect(() => {
    const InviteAddress = localStorage.getItem('InviteAddress');
    if (InviteAddress) {
      getAddresQualifications(InviteAddress);
    }
    return () => {
      timer && clearInterval(timer);
    };
  }, []);

  return (
    <Box>
      {/* <Text
        fontSize="34px"
        marginBottom="29px"
        bold
        style={{ textTransform: 'capitalize' }}
      >
        {t('loginWelcome')}
      </Text> */}
      {/* <WalletAddress address={account} /> */}
      <Box paddingTop="100px">
        <InputItems marginBottom="46px" alignItems="center">
          <InputText>{t('loginInputTitleNickname')}</InputText>
          <NickNameBox>
            <Box
              style={{
                position: 'relative'
              }}
            >
              <InputNickName
                onChange={event => {
                  if (event.target.value.length < 1) {
                    sethaveNickName(false);
                  } else {
                    sethaveNickName(true);
                  }
                  // if (getBLen(event.target.value) > 30) {
                  //   setState(p => {
                  //     p.nickName = p.nickName;
                  //   });
                  // } else {
                  // }
                  setState(p => {
                    p.nickName = event.target.value;
                  });
                }}
                value={state.nickName}
                maxLength={30}
                placeholder={t('loginSetNickNameEmpty')}
              />
              <WalletAddr>{shortenAddress(account)}</WalletAddr>
            </Box>
            <Text color={getBLen(state.nickName) > 30 ? 'failure' : 'textTips'} textAlign="right" ellipsis>
              {t('loginCountCharacters', { value: getBLen(state.nickName) })}
            </Text>
            <NameVerify small color="textTips" textAlign="right">
              {t('loginInputValueNickname')}
            </NameVerify>
          </NickNameBox>
        </InputItems>
        <InputItems marginBottom="36px" alignItems="center">
          <InputText>{t('loginInviteAddress')}</InputText>
          <NickNameBox>
            <InputAddress
              value={inviteinfo.inviteAddr}
              onChange={handleChange}
              placeholder={t('login Please enter the invitation address')}
            />
            {!inviteinfo.isRightAdd && (
              <NameVerify
                style={{ top: '55px' }}
                small
                color="failure"
                textAlign="right"
              >
                {t('login Please enter the correct address')}
              </NameVerify>
            )}
            {!inviteinfo.isActive && (
              <NameVerify style={{ left: '26px' }} small color="failure">
                {t('login This address is not eligible for invitation')}
              </NameVerify>
            )}
          </NickNameBox>
        </InputItems>
      </Box>
      <Flex justifyContent="center" pt="30px" pb='30px'>
        <Submit
          scale="ld"
          onClick={state.isSignin ? signIn : submitProfile}
          disabled={!status || !haveNickName || loading}
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
