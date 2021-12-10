import React, { useState } from 'react';
import styled from 'styled-components';
import { debounce } from 'lodash';
import { useTranslation } from 'contexts/Localization';
import { Flex, Button, Box, Card } from 'uikit';
import { mediaQueriesSize } from 'uikit/theme/base';

export const TabsBox = styled(Card)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  background-color: transparent;
  /* border-top: 1px solid ${({ theme }) => theme.colors.borderThemeColor}; */
  /* TODO: 后期放入一个Header的公共组件, 方便统一管理 */
  position: sticky;
  top: 0;
  z-index: 1003;
  background: ${({ theme }) => theme.colors.background};
  border-top: 1px solid ${({ theme }) => theme.colors.borderThemeColor};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderThemeColor};
  ${mediaQueriesSize.paddingxs}
`;

const TableLeftBox = styled(Flex)`
  align-items: center;
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.textTips};
  & div {
    padding: 0 20px;
    cursor: pointer;
  }
  .leftActive {
    font-size: 18px;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.white_black};
  }
`;
const TableRightBox = styled(Flex)`
  font-size: 18px;
  font-weight: 400;
  color: #fff;
  font-weight: bold;
  align-items: center;
  & button {
    height: 35px;
    margin-right: 10px;
    // background-color: #4d535f;
  }
  .rightActive {
    // background-color: #4168ED;
  }
`;
interface propsType {
  defCurrentLeft?: number;
  defCurrentRight?: number;
  // tabLeftChange?: (item) => void
  // tabRightChange?: (item) => void
  tabsChange?: (item) => void;
  tabRightArr?: any[];
  tabLeftArr?: any[];
  isThrottle: boolean
}
export const Tabs = (props: propsType) => {
  const { t } = useTranslation();
  const {
    defCurrentLeft,
    defCurrentRight,
    tabsChange,
    tabRightArr = [],
    isThrottle,
    tabLeftArr = [
      {
        label: t('homeTabAll'),
        value: '1',
        paramsName: 'attention'
      },
      {
        label: t('homeTabLatest'),
        value: '1',
        paramsName: 'attention'
      },
      {
        label: t('homeTabFocus'),
        value: '2',
        paramsName: 'attention'
      }
    ]
  } = props;
  const [currentLeftIndex, setCurrentLeftIndex] = useState(defCurrentLeft || 0);
  const [currentRightIndex, setCurrentRightIndex] = useState(
    defCurrentRight || 0
  );
  const leftTabClick = (item, index) => {
    if (isThrottle && index === currentLeftIndex) return
    setCurrentLeftIndex(index);
    tabsChange(item);
  };
  const rightTabClick = (item, index) => {
    if (isThrottle && index === currentRightIndex) return
    setCurrentRightIndex(index);
    tabsChange(item);
  };
  return (
    <TabsBox isBoxShadow>
      {tabLeftArr.length > 0 && (
        <TableLeftBox>
          {tabLeftArr.map((item, index) => {
            return (
              <Box
                key={index}
                onClick={debounce(() => leftTabClick(item, index), 500)}
                className={currentLeftIndex === index ? 'leftActive' : ''}
              >
                {item.label}
              </Box>
            );
          })}
        </TableLeftBox>
      )}
      {tabRightArr.length > 0 && (
        <TableRightBox>
          {tabRightArr.map((item, index) => {
            return (
              <Button
                key={item.value}
                onClick={rightTabClick.bind(this, item, index)}
                className={currentRightIndex === index ? 'rightActive' : ''}
              >
                {item.label}
              </Button>
            );
          })}
        </TableRightBox>
      )}
    </TabsBox>
  );
};
Tabs.defaultProps = {
  currentLeft: 0,
  currentRight: 0,
  // tabLeftChange: () => { },
  isThrottle: true,
  // tabRightChange: () => { },
  tabsChange: () => { }
};
