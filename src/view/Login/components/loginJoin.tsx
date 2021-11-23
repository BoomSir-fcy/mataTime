import React from 'react';
import styled from 'styled-components';
import { useImmer } from 'use-immer';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useWeb3React } from '@web3-react/core';
import { Box, Flex, Text } from 'uikit';
import { storeAction, useStore } from 'store';
import { ConnectWalletButton } from 'components';
import { useLogin, useSignIn } from '../hooks';
import { Api } from 'apis';
import { useTranslation } from 'contexts/Localization';
import useAuth from 'hooks/useAuth';

const ConnectWallet = styled(Flex)`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 100px 0;
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
  const loading = useStore(p => p.loginReducer.signinLoading);

  // const init = async () => {
  //   dispatch(storeAction.setSigninLoading(true));
  //   //1.1 验证是否注册
  //   const [verify] = await Promise.all([siginInVerify(account)]);
  //   if (Boolean(verify)) {
  //     //1.2 已经注册过了 去登录
  //     setState(p => {
  //       p.isSignIn = true;
  //     });
  //   }
  //   // if (!Boolean(verify)) {
  //   //   //1.2 未注册——设置成需要注册
  //   //   dispatch(storeAction.changeSignUp({ isSignup: true }));
  //   // }
  // };

  // React.useEffect(() => {
  //   // 2.已经注册过并且链接了钱包——去登录
  //   state.isSignIn && Boolean(account) && signIn();
  // }, [state.isSignIn]);

  // React.useEffect(() => {
  //   // 1.链接钱包后
  //   Boolean(account) && init();
  //   return () => {
  //     setState(p => {
  //       p.isSignIn = false;
  //     });
  //   };
  // }, [account]);

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
      <Text color="textOrigin">{t('loginSubTitle')}</Text>
      <ConnectWallet>
        <img
          width="35%"
          src={require('../images/login_right_images.png').default}
        />
        <ConnectWalletButton loading={loading ? 1 : 0} />
      </ConnectWallet>
      <Text color="textTips">{t('loginSubTips')}</Text>
    </Box>
  );
});
