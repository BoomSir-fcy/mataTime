import React, { useState } from 'react';
import styled from 'styled-components';
import { debounce } from 'lodash';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'contexts/Localization';
import { Flex, Button, Box, Card, Text } from 'uikit';
import { useStore, storeAction, fetchThunk } from 'store';
import { mediaQueriesSize } from 'uikit/theme/base';

import { MAX_SPEND_TIME_PAGE_TATOL } from 'config';

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
    padding-right: 20px;
    ${({ theme }) => theme.mediaQueries.md} {
      padding: 0 20px;
    }
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

const ExploreCol = styled(Flex)``;

const ExploreButton = styled(Button)`
  min-width: 100px;
  font-weight: bold;
  margin-right: 20px;
  padding: 0 25px;
  margin-bottom: 25px;
`;

const ExploreRadioButton = styled(Button)`
  min-width: 76px;
  height: 27px;
  font-weight: bold;
  margin-right: 20px;
  margin-bottom: 20px;
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
  const dispatch = useDispatch();
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
        label: t('homeTabFocus'),
        value: '2',
        paramsName: 'attention',
      },
      {
        label: t('homeTabExplore'),
        value: '3',
        tabs: 'explore',
        paramsName: 'attention',
      },
      {
        label: t('homeTabAll'),
        value: '1',
        paramsName: 'attention',
      },
    ],
  }: propsType = props;

  const userTag = useStore(p => p.post);
  const { user_tags1, user_tags2 } = userTag;
  const [currentLeftIndex, setCurrentLeftIndex] = useState(defCurrentLeft || 0);
  const [currentRightIndex, setCurrentRightIndex] = useState(
    defCurrentRight || 0,
  );
  const pageSize = MAX_SPEND_TIME_PAGE_TATOL;

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
    if (tags.length > 0 && Number(currentLeftIndex) === 3) {
      dispatch(
        storeAction.postSetParamsTag({
          user_tags1: [...tags?.[0].map(row => row.id)],
          user_tags2: [...tags?.[1].map(row => row.id)],
        }),
      );
    }
  }, [tags, currentLeftIndex]);

  return (
    <React.Fragment>
      <TabsBox isBoxShadow>
        <TableLeftBox>
          {(tabLeftArr ?? []).map((item, index) => {
            let curretnIndex = index + 1;
            return (
              <Box
                key={curretnIndex}
                onClick={debounce(() => leftTabClick(item, item.value), 500)}
                className={
                  (!params &&
                    Number(currentLeftIndex) === Number(item.value)) ||
                  (params && params === item.tabs)
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
      {((params === 'explore' && Number(currentLeftIndex) === 3) ||
        Number(currentLeftIndex) === 3) && (
        <ExploreContent>
          {(tags?.[0] ?? []).map((item, key) => (
            <ExploreButton
              key={`${item.name}_${key}`}
              onClick={() => {
                let tag = [...user_tags1];
                const index = tag.findIndex(it => it === item.id);
                index !== -1 ? tag.splice(index, 1) : (tag = [...tag, item.id]);
                dispatch(
                  storeAction.postSetParamsTag({
                    user_tags1: tag,
                    user_tags2,
                  }),
                );
              }}
              variant={
                user_tags1.indexOf(item.id) > -1 ? 'primary' : 'tertiary'
              }
            >
              {item.name}
            </ExploreButton>
          ))}
          <ExploreCol>
            <Text color='textTips' width='60px'>
              {t('tagsFilter')}
            </Text>
            <Flex font-size='14px' flexWrap='wrap'>
              {(tags?.[1] ?? []).map((item, keys) => (
                <ExploreRadioButton
                  key={`${item.name}_${keys}`}
                  onClick={() => {
                    let tag = [...user_tags2];
                    const index = tag.findIndex(it => it === item.id);
                    index !== -1
                      ? tag.splice(index, 1)
                      : (tag = [...tag, item.id]);
                    dispatch(
                      storeAction.postSetParamsTag({
                        user_tags1,
                        user_tags2: tag,
                      }),
                    );
                  }}
                  variant={
                    user_tags2.indexOf(item.id) > -1 ? 'primary' : 'text'
                  }
                >
                  <Text
                    color={
                      user_tags2.indexOf(item.id) > -1 ? 'primary' : 'text'
                    }
                  >
                    {item.name}
                  </Text>
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
