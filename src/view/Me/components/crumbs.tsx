import React from 'react';
import styled from 'styled-components';
import { Card, Box, Text } from 'uikit';

const Header = styled(Card)`
  width: 100%;
  height: 60px;
  padding: 0 16px;
  margin-bottom: 13px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CrumbsHead: React.FC<{
  text?: '';
}> = React.memo(({ text, children }) => {
  return (
    <Header>
      <Text fontWeight="bold">{text || '个人主页'}</Text>
      <Box>{children}</Box>
    </Header>
  );
});
