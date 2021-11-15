import React from 'react';
import styled from 'styled-components';
import { Card, Flex } from 'uikit';

const TabsBox = styled(Card)`
  display: flex;
  align-items: center;
  height: 60px;
  margin: 13px 0;
  padding: 0 26px;
  border-radius: ${({ theme }) => theme.radii.card};
`;
const TabItems = styled(Flex)`
  position: relative;
  width: 60px;
  height: 100%;
  justify-content: center;
  align-items: center;
  margin: 0 17px;
  color: ${({ theme }) => theme.colors.textgrey};
  &.active {
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.white_black};
    &::after {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      content: '';
      display: block;
      width: 100%;
      height: 3px;
      background: #4168ed;
    }
  }
`;

export const Tabs = React.memo(() => {
  const menu = [
    {
      title: '全部',
      value: '0'
    }
  ];

  return (
    <TabsBox>
      {menu.map((row, index: number) => (
        <TabItems key={index} className="active">
          {row.title}
        </TabItems>
      ))}
    </TabsBox>
  );
});
