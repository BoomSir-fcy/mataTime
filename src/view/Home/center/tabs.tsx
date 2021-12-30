import React, { useState } from 'react';
import styled from 'styled-components';
import { debounce } from 'lodash';
import { useTranslation } from 'contexts/Localization';
import { Flex, Button, Box, Card, Text } from 'uikit';
import { mediaQueriesSize } from 'uikit/theme/base';

export const TabsBox = styled(Card)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  background-color: transparent;
  /* border-top: 1px solid ${({ theme }) => theme.colors.borderThemeColor}; 
  position: sticky;
  top: 0;
  z-index: 1003; */
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

const ExploreContent = styled(Box)`
  padding: 27px 27px 10px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderThemeColor};
`;

const ExploreCol = styled(Flex)`
  margin-top: 25px;
`;

const ExploreButton = styled(Button)`
  min-width: 100px;
  font-weight: bold;
  margin-right: 20px;
  padding: 0 25px;
`;

const ExploreRadioButton = styled(Button)`
  min-width: 76px;
  height: 27px;
  font-weight: bold;
  margin-right: 20px;
  padding: 0 5px;
  border-radius: 14px;
`;

interface propsType {
  tags?: any[];
  params?: string;
  defCurrentLeft?: number;
  defCurrentRight?: number;
  // tabLeftChange?: (item) => void
  // tabRightChange?: (item) => void
  tabsChange?: (item) => void;
  tabRightArr?: any[];
  tabLeftArr?: any[];
  isThrottle: boolean;
}

const TabsComponent = (props, ref) => {
  const { t } = useTranslation();
  const {
    tags,
    params,
    defCurrentLeft,
    defCurrentRight,
    tabsChange,
    tabRightArr,
    isThrottle,
    tabLeftArr = [
      {
        label: t('homeTabAll'),
        value: '1',
        paramsName: 'attention',
      },
      {
        label: t('homeTabExplore'),
        value: '1',
        tabs: 'explore',
        paramsName: 'attention',
      },
      {
        label: t('homeTabFocus'),
        value: '2',
        paramsName: 'attention',
      },
    ],
  }: propsType = props;

  const [currentLeftIndex, setCurrentLeftIndex] = useState(defCurrentLeft || 0);
  const [currentRightIndex, setCurrentRightIndex] = useState(
    defCurrentRight || 0,
  );
  const [state, setState] = useState({
    useTag1: [],
    useTag2: [],
  });

  const leftTabClick = (item, index) => {
    if (isThrottle && index === currentLeftIndex) return;
    setCurrentLeftIndex(index);
    tabsChange(item);
  };
  const rightTabClick = (item, index) => {
    if (isThrottle && index === currentRightIndex) return;
    setCurrentRightIndex(index);
    tabsChange(item);
  };

  React.useEffect(() => {
    if (tags.length > 0) {
      setState({
        ...state,
        useTag1: [tags?.[0][0]?.ID],
        useTag2: [tags?.[1][0]?.ID],
      });
    }
  }, [tags]);

  React.useImperativeHandle(ref, () => ({
    getTags() {
      return state;
    },
  }));

  return (
    <React.Fragment>
      <TabsBox isBoxShadow>
        <TableLeftBox>
          {(tabLeftArr ?? []).map((item, index) => {
            let curretnIndex = index + 1;
            console.log(params, item.tabs, currentLeftIndex);
            return (
              <Box
                key={curretnIndex}
                onClick={debounce(() => leftTabClick(item, curretnIndex), 500)}
                className={
                  (currentLeftIndex === curretnIndex && !params) ||
                  params === item?.tabs
                    ? 'leftActive'
                    : ''
                }
              >
                {item.label}
              </Box>
            );
          })}
        </TableLeftBox>
        {tabRightArr?.length > 0 && (
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

      {params === 'explore' && (
        <ExploreContent>
          {(tags?.[0] ?? []).map((item, key) => (
            <ExploreButton
              key={`${item.Name}_${key}`}
              onClick={() => {
                const tag = state.useTag1;
                const index = tag.indexOf(item.ID);
                index > -1 ? tag.splice(index, 1) : tag.push(item.ID);
                setState({ ...state, useTag1: tag });
              }}
              variant={
                state.useTag1.indexOf(item.ID) > -1 ? 'primary' : 'tertiary'
              }
            >
              {item.Name}
            </ExploreButton>
          ))}
          <ExploreCol>
            <Text color='textTips'>{t('tagsFilter')}</Text>
            <Flex ml='30px' font-size='14px'>
              {(tags?.[1] ?? []).map((item, keys) => (
                <ExploreRadioButton
                  key={`${item.Name}_${keys}`}
                  onClick={() => {
                    const tag = state.useTag2;
                    const index = tag.indexOf(item.ID);
                    index > -1 ? tag.splice(index, 1) : tag.push(item.ID);
                    setState({ ...state, useTag1: tag });
                  }}
                  variant={
                    state.useTag2.indexOf(item.ID) > -1 ? 'primary' : 'text'
                  }
                >
                  {item.Name}
                </ExploreRadioButton>
              ))}
            </Flex>
          </ExploreCol>
        </ExploreContent>
      )}
    </React.Fragment>
  );
};

export const Tabs = React.forwardRef(TabsComponent);

// TabsComponent.defaultProps = {
//   currentLeft: 0,
//   currentRight: 0,
//   // tabLeftChange: () => { },
//   isThrottle: true,
//   // tabRightChange: () => { },
//   tabsChange: () => {},
// };
