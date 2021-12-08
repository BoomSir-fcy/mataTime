import React from 'react';
import styled from 'styled-components';
import classnames from 'classnames';
import { useImmer } from 'use-immer';
import { useStore } from 'store';
import { Card, Flex, Box, Text, Button } from 'uikit';
import { TokenImage } from 'components';

const TabsBox = styled(Card)`
  display: flex;
  align-items: center;
  height: 60px;
  background-color: transparent;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderThemeColor};
  button {
    color: ${({ theme }) => theme.colors.textTips};
  }
  .active {
    font-size: 18px;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.white_black};
  }
`;
const TabsContent = styled(Flex)`
  justify-content: flex-start;
  flex-wrap: wrap;
  padding: 29px 18px 7px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderThemeColor};
`;
const CoinCols = styled(Flex)`
  align-items: center;
  width: 30%;
  padding: 15px 27px;
  margin-bottom: 16px;
  background: ${({ theme }) => theme.colors.backgroundMenu};
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.35);
  border-radius: ${({ theme }) => theme.radii.card};
  &:nth-child(2),
  &:nth-child(5) {
    margin-left: 5%;
    margin-right: 5%;
  }
`;

export const Tabs: React.FC<{
  data: any;
}> = React.memo(({ data }) => {
  const tokenList = useStore(p => p.appReducer.supportTokenViews);

  const [state, setState] = useImmer({
    checked: 1,
    tabs: [
      { label: '今日收益', val: 1 },
      { label: '累计收益', val: 2 }
    ]
  });
  const { checked, tabs } = state;
  const income = checked === 1 ? data.today : data.total;

  return (
    <React.Fragment>
      <TabsBox isBoxShadow>
        {tabs.map((row, index) => (
          <Button
            key={index}
            onClick={() =>
              setState(p => {
                p.checked = row.val;
              })
            }
            className={classnames(checked === row.val ? 'active' : '')}
            variant="text"
          >
            {row.label}
          </Button>
        ))}
      </TabsBox>
      <TabsContent>
        {income?.map(item => {
          let token = tokenList.find(
            row => row[0].toLowerCase() === item.token
          );
          return (
            <CoinCols key={item.token}>
              <TokenImage tokenAddress={item.token} width={40} height={40} />
              <Flex
                ml="20px"
                flexDirection="column"
                justifyContent="space-between"
              >
                <Text color="textTips">{token.length && token[2]}</Text>
                <Text fontSize="18px" fontWeight="bold">
                  {item.amount}
                </Text>
              </Flex>
            </CoinCols>
          );
        })}
      </TabsContent>
    </React.Fragment>
  );
});
