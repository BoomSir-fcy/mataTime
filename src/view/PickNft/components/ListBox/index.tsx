import React, { useMemo, useCallback } from 'react';
import { useWeb3React } from '@web3-react/core';
import { Card, Text, Flex, Box, Image, Empty, SelectIcon, light } from 'uikit';
import { StuffElementRender } from 'store/types';
import styled from 'styled-components';
import useTheme from 'hooks/useTheme';
import { useTranslation } from 'contexts/Localization';
import { useDispatch } from 'react-redux';
import Container from 'components/Layout/Container';
import FlexAutoWarpper from 'components/Layout/FlexAutoWarpper';
import { updateSelectData } from 'store/picknft/actions';
import { useStore } from 'store';

const PageContainer = styled(Container)`
  /* padding-top: 0; */
  flex: 1;
  max-height: 50vh;
  overflow: auto;
  min-width: 100%;
  max-width: 600px;
  padding-left: 4px;
  padding-right: 4px;
  ${({ theme }) => theme.mediaQueries.xs} {
    min-width: 348px;
  }
  ${({ theme }) => theme.mediaQueries.md} {
    max-height: none;
    overflow: hidden;
  }
`;
const BoxStyled = styled(Box)<{ disabled?: boolean }>`
  background-color: ${({ theme, disabled }) =>
    disabled ? theme.colors.backgroundDisabled : theme.colors.backgroundLight};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  border-radius: ${({ theme }) => theme.radii.card};
  /* width: 30%; */
  min-width: 138px;
  position: relative;
`;
const TextBoxStyled = styled(Box)<{ disabled?: boolean }>`
  background-color: ${({ theme }) => theme.colors.background};
`;
const SelectIconStyled = styled(SelectIcon)`
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 99;
`;
const CardStyled = styled(Card)<{ showLimit?: boolean }>`
  /* ${({ theme }) => theme.mediaQueriesSize.margin} */
  margin: 8px;
  margin-bottom: 24px;
  width: 30%;
  min-width: 138px;
  overflow: visible;
  /* &::before{
    content: '';
    display: inline-block;
    padding-bottom: 30%;
  } */
  height: ${({ showLimit }) => (showLimit ? 'auto' : 'auto')};
`;

const LimitBox = styled(Box)`
  position: absolute;
  top: -26px;
  right: -36px;
  width: 125.55px;
  height: 86.4px;
  z-index: 20;
  background: url('/images/limit.png') no-repeat;
  background-size: 100%;
`;
const LimitBoxLable = styled(Text)`
  position: absolute;
  top: 36px;
  right: 36px;
`;
const LimitBoxText = styled(Text)`
  position: absolute;
  top: 20px;
  right: 54px;
  transform: rotateZ(-12deg);
`;

interface Props {
  data: StuffElementRender[];
  activeIndex: number;
}

const ListBox: React.FC<Props> = ({ data, activeIndex }) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const { account } = useWeb3React();
  const dispatch = useDispatch();
  const { selectData } = useStore(p => p.pickNft);
  const getLeftStuffNum = useCallback((item: StuffElementRender) => {
    if (!item.limitSize) return '';
    return item.limitSize - item?.createdSize;
  }, []);

  const selectHandle = useCallback(
    (pick: StuffElementRender) => {
      if (!pick.enable) return;
      dispatch(updateSelectData(pick));
    },
    [dispatch],
  );

  const checkSelctActiceId = useCallback(
    item => {
      return selectData.some(
        subItem => item.id === subItem.id && item.index === subItem.index,
      );
    },
    [selectData],
  );

  return (
    <PageContainer>
      <Flex justifyContent='space-around' flexWrap='wrap'>
        <FlexAutoWarpper>
          {data?.map((item, index) => {
            // if (item.isDefault) return null
            return (
              <CardStyled
                showLimit={!!item.limitSize}
                key={item.src}
                onClick={() => selectHandle(item)}
              >
                {!!item.limitSize && (
                  <LimitBox>
                    <LimitBoxText fontSize='12px' color='white'>
                      {getLeftStuffNum(item)}/{item.limitSize}
                    </LimitBoxText>
                    <LimitBoxLable fontSize='12px' color='white'>
                      {t('Limit')}
                    </LimitBoxLable>
                  </LimitBox>
                )}
                <BoxStyled disabled={!item.enable} theme={light}>
                  {checkSelctActiceId(item) && (
                    <SelectIconStyled color='primary' />
                  )}

                  <Image width={240} height={240} src={item.src} />
                  {/* <TextBoxStyled pt="4px" theme={light}>
                        {
                          !!item.limitSize && (
                          <Text theme={light} height="32px" ml="14px">
                            {t('Left')}{getLeftStuffNum(item)}
                          </Text>
                          )
                        }
                      </TextBoxStyled> */}
                </BoxStyled>
              </CardStyled>
            );
          })}
        </FlexAutoWarpper>
      </Flex>
      {!data?.length && <Empty />}
    </PageContainer>
  );
};

export default ListBox;
