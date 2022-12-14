import React from 'react';
import styled from 'styled-components';
import { Card, Flex } from 'uikit';
import { useTranslation } from 'contexts/Localization';

const TabsBox = styled(Card)`
  display: flex;
  align-items: center;
  height: 60px;
  ${({ theme }) => theme.mediaQueriesSize.paddingxs}
  background-color: transparent;
  border-top: 1px solid ${({ theme }) => theme.colors.borderThemeColor};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderThemeColor};
`;
const TabItems = styled(Flex)`
  position: relative;
  padding: 0 20px;
  height: 100%;
  justify-content: center;
  align-items: center;
  margin-right: 17px;
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
      background: ${({ theme }) => theme.colors.backgroundPrimary};
    }
  }
`;

export const Tabs = React.memo(() => {
  const { t } = useTranslation();
  const menu = [
    {
      title: t('homeTabAll'),
      value: '0',
    },
  ];

  return (
    <TabsBox isBoxShadow>
      {menu.map((row, index: number) => (
        <TabItems key={index} className='active'>
          {row.title}
        </TabItems>
      ))}
    </TabsBox>
  );
});
