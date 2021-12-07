import React from 'react';
import styled from 'styled-components';
import { Card, Flex, Box, Text, Button } from 'uikit';

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
  justify-content: space-between;
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
`;

export const Tabs = React.memo(() => {
  return (
    <React.Fragment>
      <TabsBox isBoxShadow>
        <Button variant="text">今日收益</Button>
        <Button variant="text" className="active">
          累计收益
        </Button>
      </TabsBox>
      <TabsContent>
        {[...new Array(6)].map(item => (
          <CoinCols key={item}>
            <img
              src="/images/tokens/TIME.svg"
              style={{ width: '40px', height: '40px' }}
              alt=""
            />
            <Flex
              ml="20px"
              flexDirection="column"
              justifyContent="space-between"
            >
              <Text color="textTips">Time</Text>
              <Text fontSize="18px" fontWeight="bold">
                82,226,226
              </Text>
            </Flex>
          </CoinCols>
        ))}
      </TabsContent>
    </React.Fragment>
  );
});
