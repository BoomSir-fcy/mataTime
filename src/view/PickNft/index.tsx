import React, { useEffect, useCallback, useMemo, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import {
  Heading,
  Text,
  Flex,
  Spinner,
  Box,
  LinkExternal,
  useMatchBreakpoints,
} from 'uikit';
import styled from 'styled-components';
import {
  useFetchCodeInfo,
  useFetchInviteInfo,
  useFetchStuffAllInfo,
  usePickNftState,
} from 'store/picknft/hooks';
import { useDispatch } from 'react-redux';
import { randomPick, setInviteCodes } from 'store/picknft/actions';
import useTheme from 'hooks/useTheme';
import { useTranslation } from 'contexts/Localization';
import Tabbar from './components/Tabbar';
import ListBox from './components/ListBox';
import ShowCard from './components/ShowCard';
import { MobileHide, MobileShow } from './components/Styled';
import { useStore } from 'store';
import Container from 'components/Layout/Container';
import MenuNav from 'components/MenuNav';
import { Crumbs } from 'components';
import { Step } from 'view/Login/components';
import useParsedQueryString from 'hooks/useParsedQueryString';
import { useThemeManager } from 'store/app/hooks';

const CennerBox = styled(Container)`
  width: 100%;
  padding: 0;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.white};
`;
const StepBox = styled(Box)`
  padding: 10px 20px;
  display: none;
  ${({ theme }) => theme.mediaQueries.md} {
    padding: 20px 40px;
    display: block;
  }
`;
const StepBoxMobile = styled(Box)`
  padding: 10px 20px;
  display: block;
  ${({ theme }) => theme.mediaQueries.md} {
    display: none;
  }
`;
const LeftBox = styled(Flex)`
  flex: 1;
`;

const PinkBox = styled(Box)`
  /* background: ${({ theme }) => theme.colors.editorBoxBg};
  max-height: max-content;
  min-height: 100vh; */
`;

/* 
  TODO:
  1.用户未锁定
  2.用户已锁定
  3.锁定用户不是自己
  4.已使用
*/

const PickNft: React.FC = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const { account } = useWeb3React();
  const [activeIndex, setActiveIndex] = useState(0);
  const dispatch = useDispatch();
  const { codes, codeInfo, selectData, stuffRes, loaded } = usePickNftState();
  const { isLg, isXl, isXxl } = useMatchBreakpoints();
  const isMd = isLg === false && isXl === false && isXxl === false;
  const [isDark] = useThemeManager();

  const parsedQs = useParsedQueryString();
  useEffect(() => {
    if (parsedQs.c && parsedQs.l && parsedQs.h) {
      dispatch(
        setInviteCodes({
          code: parsedQs.c,
          lock_hash: parsedQs.l,
          code_hash: parsedQs.h,
        }),
      );
    }
  }, [parsedQs]);

  useFetchCodeInfo();
  useFetchInviteInfo();
  useFetchStuffAllInfo();

  const randomPickHandle = useCallback(
    () => dispatch(randomPick()),
    [dispatch],
  );

  useEffect(() => {
    if (!isDark) {
      document.getElementById('particles').style.background = '#fff';
    }
  }, [isDark]);

  useEffect(() => {
    if (loaded && selectData.length === 0) {
      randomPickHandle();
    }
  }, [loaded, selectData, randomPickHandle]);

  const renderList = useMemo(
    () => stuffRes[activeIndex],
    [stuffRes, activeIndex],
  );

  return (
    <PinkBox>
      {!loaded ? (
        <Flex justifyContent='center'>
          <Spinner />
        </Flex>
      ) : (
        <CennerBox>
          <Flex>
            <MenuNav PickNft>
              <Tabbar onClick={setActiveIndex} activeIndex={activeIndex} />
            </MenuNav>
            <Box style={{ flex: 1 }}>
              <Crumbs zIndex={9} title={t(' ')} justifyContent='start'>
                <Flex alignItems='baseline' flexWrap='wrap'>
                  <Text mr='20px' fontSize='18px' fontWeight='bold'>
                    {t('Customize your METAYC style')}
                  </Text>
                </Flex>
              </Crumbs>
              <Flex justifyContent='center' flexWrap='wrap'>
                <MobileShow width='100%'>{isMd && <ShowCard />}</MobileShow>
                <Flex flex='1'>
                  <LeftBox flexDirection='column'>
                    {/* <StepBox>
                      <Step noTitle />
                    </StepBox> */}
                    <ListBox activeIndex={activeIndex} data={renderList} />
                  </LeftBox>
                  <MobileHide>{!isMd && <ShowCard />}</MobileHide>
                </Flex>
              </Flex>
            </Box>
          </Flex>
        </CennerBox>
      )}
    </PinkBox>
  );
};

export default PickNft;
