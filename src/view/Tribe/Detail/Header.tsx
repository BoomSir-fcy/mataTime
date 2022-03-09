import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Flex, Heading, Text, Box } from 'uikit';
import { useTranslation } from 'contexts';
import { useStore, storeAction } from 'store';
import { fetchTribeJoinBasicServiceAsync } from 'store/tribe';
import { TribeInfo, TribeType } from 'store/tribe/type';

import TradeLogo from '../components/TradeCard/TradeLogo';
import BtnIcon from '../components/BtnIcon';

import { getEncodeValue } from 'utils/urlQueryPath';

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
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { userInfo } = useStore(p => p.loginReducer);

  return (
    <InfoFlex>
      <TradeLogo
        logo={TribeInfo?.tribe?.logo}
        pro={TribeInfo?.tribe?.type === 2}
      />
      <RightFlex flex='1' flexDirection='column' justifyContent='space-between'>
        <Box>
          <Heading scale='lg'>{TribeInfo?.tribe.name}</Heading>
          <NumberFlex mt='28px' justifyContent='space-between'>
            <Box>
              <Text bold>{TribeInfo?.member_count}</Text>
              <Text fontSize='14px' color='textTips'>
                {t('Member')}
              </Text>
            </Box>
            <Box>
              <Text bold>{TribeInfo?.post_count}</Text>
              <Text fontSize='14px' color='textTips'>
                {t('Post')}
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
          {userInfo.address !== TribeInfo?.tribe?.owner_address &&
            TribeInfo?.status === 0 && (
              <BtnIcon
                disabled={!Boolean(TribeInfo?.baseInfo?.feeToken)}
                name='icon-wodebula'
                text={t('tribeJoin')}
                onClick={() => {
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
