import React, { useEffect, useCallback, useMemo, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { Heading, Text, Flex, Spinner, Box, LinkExternal } from 'uikit';
import styled from 'styled-components';
import { useFetchStuffAllInfo } from 'store/picknft/hooks';
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
  /* ${({ theme }) => theme.mediaQueries.md} {
    max-width: 984px;
  } */
  color: ${({ theme }) => theme.colors.white};
`;
const StepBox = styled(Box)`
  padding: 0 20px;
  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 0 40px;
  }
`;

const PickNft: React.FC = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const { account } = useWeb3React();
  const [activeIndex, setActiveIndex] = useState(0);
  const dispatch = useDispatch();

  useFetchStuffAllInfo();
  const { selectData, stuffRes, loaded } = useStore(p => p.pickNft);

  const randomPickHandle = useCallback(
    () => dispatch(randomPick()),
    [dispatch],
  );

  useEffect(() => {
    if (loaded && selectData.length === 0) {
      randomPickHandle();
    }
  }, [loaded, selectData, randomPickHandle]);
  // const {
  //   user: { data: userData, loaded: userBagLoaded },
  // } = useNfts();

  // const avatarNfts = useMemo(() => {
  //   const avatarNftAddress = getTicketNftAddress()?.toLowerCase()
  //   return userData.filter((item) => item.properties.token?.toLowerCase() === avatarNftAddress && item.properties.owner_status === NftOwnerState.NORMAL)
  // }, [userData])
  // const avatarBalance = useMemo(() => {
  //   const avatarNftAddress = getDsgAvatarNftAddress()?.toLowerCase()
  //   return userData.filter((item) => item.properties.token?.toLowerCase() === avatarNftAddress)
  // }, [userData])
  const avatarBalance = [];
  const avatarNfts = [];

  const renderList = useMemo(
    () => stuffRes[activeIndex],
    [stuffRes, activeIndex],
  );

  return (
    <Box>
      {/* <Heading as='h1' scale='xl' mb='16px'>
        {t('Pick your Avatars')}
      </Heading>
      <Flex flexWrap='wrap' alignItems='center'>
        <Text mr='8px' fontSize='14px' color='textSubtle'>
          {t(
            'Users who hold Drawing boards can freely create their own personalized avatars!',
          )}
        </Text>
        <LinkExternal href='https://medium.com/@dinosaureggs/an-invitation-to-dsg-socialfi-metatime-b7b842232c91'>
          {t('How to pick my Avatar NFT?')}
        </LinkExternal>
      </Flex> */}
      {/* <Divider /> */}
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
            <Box>
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
                  <StepBox>
                    <Step noTitle />
                  </StepBox>
                  <ShowCard
                    balance={avatarBalance?.length}
                    avatarNft={avatarNfts}
                  />
                </MobileShow>
                <Flex flexWrap='wrap' flex='1'>
                  <Flex flexDirection='column'>
                    <MobileHide>
                      <StepBox>
                        <Step noTitle />
                      </StepBox>
                    </MobileHide>
                    <ListBox activeIndex={activeIndex} data={renderList} />
                  </Flex>
                  <MobileHide>
                    <ShowCard
                      balance={avatarBalance?.length}
                      avatarNft={avatarNfts}
                    />
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
