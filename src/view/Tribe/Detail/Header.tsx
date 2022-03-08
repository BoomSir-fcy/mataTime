import React from 'react';
import { Link } from 'react-router-dom';
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
}
const DetailHeader: React.FC<HeaderProps> = ({ TribeInfo }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  return (
    <InfoFlex>
      <TradeLogo
        logo={TribeInfo?.tribe.logo}
        pro={TribeInfo?.tribe.type === 2}
      />
      <RightFlex flex='1' flexDirection='column' justifyContent='space-between'>
        <Box>
          <Heading scale='lg'>{TribeInfo?.tribe.name}</Heading>
          <NumberFlex mt='28px' justifyContent='space-between'>
            <Box>
              <Text bold>{TribeInfo?.member_count}</Text>
              <Text fontSize='14px' color='textTips'>
                成员
              </Text>
            </Box>
            <Box>
              <Text bold>{TribeInfo?.post_count}</Text>
              <Text fontSize='14px' color='textTips'>
                帖子
              </Text>
            </Box>
            <Box>
              <Text bold>{TribeInfo?.selected_count}</Text>
              <Text fontSize='14px' color='textTips'>
                {t('Featured')}
              </Text>
            </Box>
          </NumberFlex>
        </Box>
        <Flex justifyContent='space-between' alignItems='center'>
          <Flex alignItems='center'>
            <UserImg src={TribeInfo?.tribe?.nft_image} alt='' />
            <Text ml='10px' bold>
              {TribeInfo?.tribe?.nick_name}
            </Text>
          </Flex>
          {TribeInfo?.status === 0 && (
            <BtnIcon
              name='icon-wodebula'
              text={t('加入部落')}
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
        </Flex>
      </RightFlex>
    </InfoFlex>
  );
};

export default DetailHeader;
