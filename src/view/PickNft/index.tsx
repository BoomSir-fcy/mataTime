import React, { useEffect, useCallback, useMemo, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { Heading, Text, Flex, Spinner, Box, LinkExternal } from 'uikit';
import styled from 'styled-components';
import { useFetchCodeUsed, useFetchStuffAllInfo } from 'store/picknft/hooks';
import { useDispatch } from 'react-redux';
import { randomPick } from 'store/picknft/actions';
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

const CennerBox = styled(Container)`
  width: 100%;
  padding: 0;
  background: ${({ theme }) => theme.colors.primaryDark};
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

const PickNft: React.FC = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const { account } = useWeb3React();
  const [activeIndex, setActiveIndex] = useState(0);
  const dispatch = useDispatch();
  const InviteCode = localStorage.getItem('InviteCode');

  useFetchCodeUsed(InviteCode);
  useFetchStuffAllInfo();
  const { selectData, stuffRes, codeUsed, loaded } = useStore(p => p.pickNft);

  const randomPickHandle = useCallback(
    () => dispatch(randomPick()),
    [dispatch],
  );

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
    <Box>
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
                    {t('创建无聊猴NFT头像')}
                  </Text>
                  <Text fontSize='14px' color='textTips'>
                    {t('特殊邀请者才能拥有的专属无聊猴NFT头像')}
                  </Text>
                </Flex>
              </Crumbs>
              <Flex justifyContent='center' flexWrap='wrap'>
                <MobileShow width='100%'>
                  <StepBoxMobile>
                    <Step noTitle />
                  </StepBoxMobile>
                  <ShowCard InviteCode={InviteCode} />
                </MobileShow>
                <Flex flex='1'>
                  <LeftBox flexDirection='column'>
                    <StepBox>
                      <Step noTitle />
                    </StepBox>
                    <ListBox activeIndex={activeIndex} data={renderList} />
                  </LeftBox>
                  <MobileHide>
                    <ShowCard InviteCode={InviteCode} />
                  </MobileHide>
                </Flex>
              </Flex>
            </Box>
          </Flex>
        </CennerBox>
      )}
    </Box>
  );
};

export default PickNft;
