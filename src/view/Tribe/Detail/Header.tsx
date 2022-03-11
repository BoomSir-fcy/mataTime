import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useWeb3React } from '@web3-react/core';
import { Flex, Heading, Text, Box, Button } from 'uikit';
import { useTranslation } from 'contexts';
import { useStore, storeAction } from 'store';
import { TribeInfo, NftStatus, TribeNftStatus } from 'store/tribe/type';
import { fetchTribeInfoAsync } from 'store/mapModule/reducer';
import { Icon } from 'components';

import TradeLogo from '../components/TradeCard/TradeLogo';
import BtnIcon from '../components/BtnIcon';
import TopicsIcon from '../components/TopicsIcon';
import TagList from 'view/Me/Tribe/components/TagList';
import useParsedQueryString from 'hooks/useParsedQueryString';
import useConnectWallet from 'hooks/useConnectWallet';
import { getEncodeValue } from 'utils/urlQueryPath';

import { StakeButton } from 'view/Me/Tribe/components/actionNft';

const InfoFlex = styled(Flex)`
  width: 100%;
  align-items: flex-start;
  ${({ theme }) => theme.mediaQueriesSize.marginb}
  ${({ theme }) => theme.mediaQueries.md} {
    align-items: normal;
  }
`;

const RightFlex = styled(Flex)`
  /* min-WminWidth: 100px; */
  margin-left: 18px;
  ${({ theme }) => theme.mediaQueries.md} {
    margin-left: 32px;
  }
`;

const NumberFlex = styled(Flex)`
  width: 100%;
  margin-top: 10px;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 70%;
    margin-top: 28px;
  }
`;

const UserImg = styled.img`
  display: block;
  border-radius: 50%;
  object-fit: cover;
  width: 24px;
  wminwidth: 24px;
`;

const TribeUserOwnerContent = styled(Flex)`
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  ${({ theme }) => theme.mediaQueries.md} {
    margin-top: 0;
  }
`;

interface HeaderProps {
  TribeInfo: TribeInfo;
  TopicId: number;
}
const DetailHeader: React.FC<HeaderProps> = ({ TribeInfo, TopicId }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { replace } = useHistory();
  const { pathname } = useLocation();
  const qsValue = useParsedQueryString();

  const Topic = [
    {
      id: TopicId,
      topic: qsValue.topicName,
    },
  ];

  const ShowNumInfo = [
    {
      num: TribeInfo?.member_count,
      title: t('Member'),
      display: 1,
    },
    {
      num: TribeInfo?.post_count,
      title: t('Post'),
    },
    {
      num: TribeInfo?.selected_count,
      title: t('Featured'),
    },
  ];

  return (
    <>
      {/* {!TopicId ? (
        <InfoFlex flexDirection='column'>
          <Flex>
            <TradeLogo
              scales='sm'
              logo={TribeInfo?.tribe?.logo}
              pro={TribeInfo?.tribe?.type === 2}
            />
            <RightFlex
              flex='1'
              flexDirection='column'
              justifyContent='space-between'
            >
              <Heading scale='lg'>{TribeInfo?.tribe?.name}</Heading>
              <Box paddingBottom='14px'>
                <TribeOwner TribeInfo={TribeInfo} />
              </Box>
            </RightFlex>
          </Flex>
          <Flex
            paddingTop='26px'
            alignItems='center'
            justifyContent='space-between'
          >
            <Flex
              alignItems='center'
              width='60%'
              justifyContent='space-between'
            >
              <TopicsIcon />
              <TagList
                mr='0'
                mb='0'
                list={Topic}
                onDelete={id => {
                  replace(
                    `${pathname}?id=${qsValue.id}&active=${
                      qsValue.active || 0
                    }`,
                  );
                }}
              />
              <Flex width='40%' justifyContent='space-between'>
                {ShowNumInfo.map(item => (
                  <>{!item.display && <TribeNumInfo item={item} />}</>
                ))}
              </Flex>
            </Flex>
            <Send_joinBtn TribeInfo={TribeInfo} t={t} dispatch={dispatch} />
          </Flex>
        </InfoFlex>
      ) : (
        <InfoFlex>
          <TradeLogo
            logo={TribeInfo?.tribe?.logo}
            pro={TribeInfo?.tribe?.type === 2}
          />
          <RightFlex
            flex='1'
            flexDirection='column'
            justifyContent='space-between'
          >
            <Box>
              <Heading scale='lg'>{TribeInfo?.tribe?.name}</Heading>
              <NumberFlex justifyContent='space-between'>
                {ShowNumInfo.map(item => (
                  <TribeNumInfo item={item} />
                ))}
              </NumberFlex>
            </Box>
            <TribeUserOwnerContent>
              <TribeOwner TribeInfo={TribeInfo} />
              <Send_joinBtn TribeInfo={TribeInfo} t={t} dispatch={dispatch} />
            </TribeUserOwnerContent>
          </RightFlex>
        </InfoFlex>
      )} */}
      <InfoFlex>
        <TradeLogo
          logo={TribeInfo?.tribe?.logo}
          pro={TribeInfo?.tribe?.type === 2}
        />
        <RightFlex
          flex='1'
          flexDirection='column'
          justifyContent='space-between'
        >
          <Box>
            <Heading scale='lg'>{TribeInfo?.tribe?.name}</Heading>
            <NumberFlex justifyContent='space-between'>
              {ShowNumInfo.map(item => (
                <TribeNumInfo item={item} />
              ))}
            </NumberFlex>
          </Box>
          <TribeUserOwnerContent>
            <TribeOwner TribeInfo={TribeInfo} />
            <Send_joinBtn TribeInfo={TribeInfo} t={t} dispatch={dispatch} />
          </TribeUserOwnerContent>
        </RightFlex>
      </InfoFlex>
      {TopicId && (
        <Flex alignItems='center' justifyContent='flex-start'>
          <TopicsIcon />
          <TagList
            mr='0'
            mb='0'
            ml='16px'
            list={Topic}
            onDelete={id => {
              replace(
                `${pathname}?id=${qsValue.id}&active=${qsValue.active || 0}`,
              );
            }}
          />
        </Flex>
      )}
    </>
  );
};

const TribeNumInfo = ({ item }) => {
  return (
    <Box>
      <Text bold>{item.num}</Text>
      <Text fontSize='14px' color='textTips'>
        {item.title}
      </Text>
    </Box>
  );
};

const TribeOwner = ({ TribeInfo }) => {
  return (
    <Box
      style={{
        minWidth: '0',
      }}
    >
      <Flex alignItems='center'>
        <UserImg src={TribeInfo?.tribe?.nft_image} alt='' />
        <Text ml='10px' bold ellipsis>
          {TribeInfo?.tribe?.nick_name}
        </Text>
      </Flex>
    </Box>
  );
};

const Send_joinBtn = ({ TribeInfo, t, dispatch }) => {
  const { account } = useWeb3React();
  const { onConnectWallet } = useConnectWallet();
  const { userInfo } = useStore(p => p.loginReducer);

  return (
    <Box
      style={{
        flexShrink: 0,
      }}
    >
      {!account ? (
        <Button
          onClick={e => {
            e.stopPropagation();
            e.preventDefault();
            onConnectWallet();
          }}
        >
          {t('Connect Wallet')}
        </Button>
      ) : (
        <>
          {userInfo.address !== TribeInfo?.tribe?.owner_address &&
            (TribeInfo?.status === 0 || TribeInfo?.status === 6) && (
              <BtnIcon
                disabled={!Boolean(TribeInfo?.baseInfo?.feeToken)}
                name='icon-wodebula'
                text={t('tribeJoin')}
                onClick={() => {
                  dispatch(storeAction.setJoinTribeVisibleModal(true));
                }}
              />
            )}

          {(TribeInfo?.status === 2 || TribeInfo?.status === 3) &&
            TribeInfo?.detail?.nft_id !== 0 && (
              <StakeButton
                tribeId={TribeInfo?.tribe_id}
                nftId={TribeInfo?.detail?.nft_id}
                nftType={
                  userInfo.address === TribeInfo?.tribe?.owner_address ? 1 : 2
                }
                callback={() => {
                  dispatch(fetchTribeInfoAsync(TribeInfo?.tribe_id));
                }}
              />
            )}

          {TribeInfo?.status === NftStatus.Staked &&
            TribeInfo?.expire === TribeNftStatus.notExpired && (
              <Link
                to={`/tribe/post?i=${TribeInfo?.tribe_id}&n=${getEncodeValue(
                  TribeInfo?.tribe?.name,
                )}`}
              >
                <Button
                  startIcon={
                    <Icon
                      className='show-media-md'
                      margin='0 18px 0 0'
                      size={21}
                      color='white'
                      name='icon-zhifeiji'
                    />
                  }
                >
                  {t('sendBtnText')}
                </Button>
              </Link>
            )}
        </>
      )}
    </Box>
  );
};

export default DetailHeader;
