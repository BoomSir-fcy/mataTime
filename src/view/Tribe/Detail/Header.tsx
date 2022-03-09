import React, { useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button, Flex, Heading, Text, Box, Image } from 'uikit';
import styled from 'styled-components';
import TradeLogo from '../components/TradeCard/TradeLogo';
import BtnIcon from '../components/BtnIcon';
import { useTranslation } from 'contexts/Localization';
import { getEncodeValue } from 'utils/urlQueryPath';

import { storeAction } from 'store';
import { fetchTribeJoinBasicServiceAsync } from 'store/tribe';
import { TribeInfo, TribeType } from 'store/tribe/type';
import TopicsIcon from '../components/TopicsIcon';
import TagList from 'view/Me/Tribe/components/TagList';
import useParsedQueryString from 'hooks/useParsedQueryString';

const InfoFlex = styled(Flex)`
  padding: 26px 14px 26px 26px;
  flex-wrap: wrap;
`;

const RightFlex = styled(Flex)`
  /* min-height: 100px; */
  margin-left: 18px;
  ${({ theme }) => theme.mediaQueries.md} {
    margin-left: 32px;
  }
`;

const NumberFlex = styled(Flex)`
  ${({ theme }) => theme.mediaQueries.md} {
    width: 70%;
  }
`;

const UserImg = styled.img`
  display: block;
  border-radius: 50%;
  object-fit: cover;
  width: 24px;
  height: 24px;
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
      {TopicId ? (
        <InfoFlex flexDirection='column'>
          <Flex>
            <TradeLogo
              scales='sm'
              logo={TribeInfo?.tribe.logo}
              pro={TribeInfo?.tribe.type === 2}
            />
            <RightFlex
              flex='1'
              flexDirection='column'
              justifyContent='space-between'
            >
              <Heading scale='lg'>{TribeInfo?.tribe.name}</Heading>
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
                    `${pathname}?id=${qsValue.id}&active=${qsValue.active}`,
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
            logo={TribeInfo?.tribe.logo}
            pro={TribeInfo?.tribe.type === 2}
          />
          <RightFlex
            flex='1'
            flexDirection='column'
            justifyContent='space-between'
          >
            <Box>
              <Heading scale='lg'>{TribeInfo?.tribe.name}</Heading>
              <NumberFlex mt='28px' justifyContent='space-between'>
                {ShowNumInfo.map(item => (
                  <TribeNumInfo item={item} />
                ))}
              </NumberFlex>
            </Box>
            <Flex justifyContent='space-between' alignItems='center'>
              <TribeOwner TribeInfo={TribeInfo} />
              <Send_joinBtn TribeInfo={TribeInfo} t={t} dispatch={dispatch} />
            </Flex>
          </RightFlex>
        </InfoFlex>
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
    <>
      <Flex alignItems='center'>
        <UserImg src={TribeInfo?.tribe?.nft_image} alt='' />
        <Text ml='10px' bold>
          {TribeInfo?.tribe?.nick_name}
        </Text>
      </Flex>
    </>
  );
};

const Send_joinBtn = ({ TribeInfo, t, dispatch }) => {
  return (
    <>
      {TribeInfo?.status === 0 && (
        <BtnIcon
          name='icon-wodebula'
          text={t('tribeJoin')}
          onClick={() => {
            if (TribeInfo?.detail?.type === TribeType.BASIC) {
              dispatch(fetchTribeJoinBasicServiceAsync());
            }
            dispatch(storeAction.setJoinTribeVisibleModal(true));
          }}
        />
      )}

      {TribeInfo?.status === 4 && (
        <Link
          to={`/tribe/post?i=${TribeInfo?.tribe_id}&n=${getEncodeValue(
            TribeInfo?.tribe?.name,
          )}`}
        >
          <BtnIcon name='icon-zhifeiji' text={t('sendBtnText')} />
        </Link>
      )}
    </>
  );
};

export default DetailHeader;
