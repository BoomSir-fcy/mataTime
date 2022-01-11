import React from 'react';
import styled from 'styled-components';
import { useImmer } from 'use-immer';
import { useDispatch } from 'react-redux';
import { Flex, Card, Text, Button, Toggle } from 'uikit';
import { useStore, storeAction } from 'store';
import { Api } from 'apis';
import { shortenAddress } from 'utils/contract';
import { useTranslation } from 'contexts/Localization';

const SafeSetBox = styled(Card)`
  /* height: 700px; */
  padding: 27px 0;
  background-color: transparent;
`;
const Rows = styled(Flex)`
  justify-content: space-between;
  padding: 0 30px 24px;
  margin-bottom: 22px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
`;
const Title = styled.div`
  text-transform: capitalize;
  color: ${({ theme }) => theme.colors.white_black};
  font-weight: bold;
`;
const Column = styled(Flex)`
  flex-direction: column;
  justify-content: space-around;
`;

const SafeSet = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const userInfo = useStore(p => p.loginReducer.userInfo);
  const [state, setState] = useImmer({
    allow_watch_attention: true,
    allow_watch_fans: true,
  });

  // 更新邮箱
  const updateEmail = async (email: string) => {
    try {
      const res = await Api.SetApi.updateEmail(email);
    } catch (error) {
      console.error(error);
    }
  };

  const updateAllowStatus = async (filed: string) => {
    try {
      const res = await Api.UserApi.updateUserInfo({
        ...userInfo,
        [filed]: state[filed] ? 2 : 1,
      });
      if (Api.isSuccess(res)) {
        setState(p => {
          p[filed] = state[filed] ? false : true;
        });
        dispatch(
          storeAction.changeUpdateProfile({
            ...res.data,
          }),
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    // 1允许，2不允许
    setState(p => {
      p.allow_watch_attention =
        userInfo.allow_watch_attention === 1 ? true : false;
      p.allow_watch_fans = userInfo.allow_watch_fans === 1 ? true : false;
    });
  }, [userInfo]);

  return (
    <SafeSetBox isBoxShadow>
      <Rows>
        <Column>
          <Title>{t('setWalletAddress')}</Title>
          <Text color='textTips' mt='11px'>
            {t('setWalletAddressTips')}
          </Text>
        </Column>
        <Title>{shortenAddress(userInfo.address)}</Title>
      </Rows>
      <Rows>
        <Column>
          <Title>{t('allow_watch_attention')}</Title>
        </Column>
        <Toggle
          checked={state.allow_watch_attention}
          onChange={() => updateAllowStatus('allow_watch_attention')}
        />
      </Rows>
      <Rows>
        <Column>
          <Title>{t('allow_watch_fans')}</Title>
        </Column>
        <Toggle
          checked={state.allow_watch_fans}
          onChange={() => updateAllowStatus('allow_watch_fans')}
        />
      </Rows>
      {/* <Rows>
        <Column>
          <Title>邮箱设置</Title>
          <Text color="textTips">平台最新消息将发送至该邮箱</Text>
        </Column>
        <Button onClick={() => updateEmail('liujiaqi@qgx.com')}>立即绑定</Button>
      </Rows> */}
    </SafeSetBox>
  );
};

export default SafeSet;
