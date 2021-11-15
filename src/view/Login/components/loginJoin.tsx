import React from 'react';
import styled from 'styled-components';
import { useImmer } from 'use-immer';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useWeb3React } from '@web3-react/core';
import { Box, Flex, Text } from 'uikit';
import { storeAction } from 'store';
import { ConnectWalletButton } from 'components';
import { useLogin, useSignIn } from '../hooks';
import { Api } from 'apis';
import { useTranslation } from 'contexts/Localization';
import useAuth from 'hooks/useAuth';

const SubTitle = styled(Text)`
  color: ${({ theme }) => theme.colors.textOrigin};
`;
const TextTips = styled(Text)`
  color: ${({ theme }) => theme.colors.textTips};
  text-align: justify;
`;
const ConnectWallet = styled(Flex)`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 70px 0 79px;
  position: relative;
`;

export const LoginJoin: React.FC = React.memo(() => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { logout } = useAuth();
  const { loginCallback } = useLogin();
  const { siginInVerify, getUserName, getNftUrl } = useSignIn();
  const { account } = useWeb3React();
  const { t } = useTranslation();

  const redict = location?.state?.from;
  const [state, setState] = useImmer({
    isSignIn: false
  });

  const signIn = async () => {
    const res = await loginCallback(2);
    setState(p => {
      p.isSignIn = false;
    });
    if (res) {
      const user: any = await getUserName();
      // 20103 已注册未添加昵称
      if (Api.isSuccess(user)) {
        dispatch(storeAction.changeUpdateProfile({ ...user.data }));
        history.replace(`${redict || '/'}`);
      } else if (user.code === 20103) {
        dispatch(storeAction.changeSignUp({ isSignup: true }));
        dispatch(storeAction.changeSignUpStep({ singUpStep: 3 }));
      }
    } else {
      logout();
    }
  };

  const init = async () => {
    const [verify, nft] = await Promise.all([siginInVerify(account), getNftUrl(account)]);
    // 用户登录
    Boolean(verify) &&
      setState(p => {
        p.isSignIn = true;
      });
    if (!Boolean(verify)) {
      dispatch(storeAction.changeSignUp({ isSignup: true }));
      if (nft === 20104) {
        dispatch(storeAction.changeSignUpFail({ signUpFail: true }));
      }
    }
  };

  React.useEffect(() => {
    state.isSignIn && Boolean(account) && signIn();
  }, [state.isSignIn]);

  React.useEffect(() => {
    Boolean(account) && init();
    return () => {
      setState(p => {
        p.isSignIn = false;
      });
    };
  }, [account]);

  return (
    <Box>
      <Text fontSize="34px" marginBottom="29px" bold style={{ textTransform: 'uppercase' }}>
        {t('loginWelcome')}
      </Text>
      <SubTitle>{t('loginSubTitle')}</SubTitle>
      <ConnectWallet>
        <img width="40%" src={require('../images/login_right_images.png').default} />
        <ConnectWalletButton />
      </ConnectWallet>
      <TextTips>{t('loginSubTips')}</TextTips>
    </Box>
  );
});
