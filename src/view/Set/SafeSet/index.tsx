import React from 'react';
import styled from 'styled-components';
import { useImmer } from 'use-immer';
import { Flex, Card, Text, Button, Toggle } from 'uikit';
import { useStore } from 'store';
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

  console.log(userInfo.allow_watch_attention);
  console.log(userInfo.allow_watch_fans);

  // 1允许，2不允许
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
          <Title>别人观看我的关注</Title>
          <Text color='textTips' mt='11px'>
            {t('setWalletAddressTips')}
          </Text>
        </Column>
        <Toggle checked={true} />
      </Rows>
      <Rows>
        <Column>
          <Title>别人观看我的粉丝</Title>
          <Text color='textTips' mt='11px'>
            {t('setWalletAddressTips')}
          </Text>
        </Column>
        <Toggle checked={true} />
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
