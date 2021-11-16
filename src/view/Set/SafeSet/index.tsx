import React from 'react';
import styled from 'styled-components';
import { Flex, Card, Text, Button } from 'uikit';
import { Api } from 'apis';
import { shortenAddress } from 'utils/contract';

const SafeSetBox = styled(Card)`
  height: 700px;
  margin-top: 13px;
  padding: 27px 29px;
`;
const Rows = styled(Flex)`
  justify-content: space-between;
  padding-bottom: 23px;
  margin-bottom: 22px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.tertiary};
`;
const Title = styled.div`
  color: ${({ theme }) => theme.colors.white_black};
  font-weight: bold;
`;
const Column = styled(Flex)`
  flex-direction: column;
  justify-content: space-around;
`;

const SafeSet = () => {
  // 更新邮箱
  const updateEmail = async (email: string) => {
    try {
      const res = await Api.SetApi.updateEmail(email);
      console.log('更新邮箱', res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeSetBox>
      <Rows>
        <Column>
          <Title>钱包地址</Title>
          <Text color="textTips" mt="11px">
            登录该账号的钱包地址，无法更改
          </Text>
        </Column>
        <Title>{shortenAddress('')}</Title>
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
