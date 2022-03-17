import React from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Flex, Text, Box } from 'uikit';
import { Icon } from 'components';
import { useTranslation } from 'contexts';
import { useStore } from 'store';
import {
  TribeInfo,
  TribeType,
  NftStatus,
  TribeNftStatus,
  TribeBelongNft,
} from 'store/tribe/type';

import TribeLogo from './tribeLogo';

const Container = styled(Box)`
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
  padding: 15px 15px 0;
`;

const TribeName = styled(Text)`
  min-width: 0;
  width: 150px;
  font-weight: bold;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const UserImg = styled.img`
  display: block;
  border-radius: 50%;
  object-fit: cover;
  width: 20px;
  height: 20px;
`;

const Desc = styled(Text)`
  word-wrap: break-word;
  word-break: break-word;
  white-space: pre-wrap;
`;

interface HeaderProps {
  tribeInfo: TribeInfo;
  openInvite: () => void;
}
const TribeInfoDetail: React.FC<HeaderProps> = ({ tribeInfo, openInvite }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();
  const userInfo = useStore(p => p.loginReducer.userInfo);
  const { detail } = tribeInfo || {};

  return (
    <Box>
      <Container>
        <Flex>
          <TribeLogo
            logo={tribeInfo?.tribe?.logo}
            pro={tribeInfo?.tribe?.type === 2}
          />
          <Flex
            flex='1'
            flexDirection='column'
            justifyContent='space-between'
            ml='15px'
          >
            <Box>
              <Flex justifyContent='space-between' alignItems='flex-end'>
                <TribeName>{tribeInfo?.tribe?.name}</TribeName>
                {userInfo?.address === tribeInfo?.tribe?.owner_address && (
                  <Text
                    color='textPrimary'
                    onClick={() =>
                      history.push(`/me/tribe/info?i=${tribeInfo?.tribe_id}`)
                    }
                    style={{
                      textAlign: 'right',
                      cursor: 'pointer',
                      flex: 1,
                    }}
                  >
                    {t('tribeInfoManager')}
                  </Text>
                )}
              </Flex>
              <Flex margin='10px 0' justifyContent='space-between'>
                <Box>
                  <Text bold>{tribeInfo?.member_count}</Text>
                  <Text color='textTips'>{t('Member')}</Text>
                </Box>
                <Box>
                  <Text bold>{tribeInfo?.post_count}</Text>
                  <Text color='textTips'>{t('Post')}</Text>
                </Box>
                <Box>
                  <Text bold>{tribeInfo?.selected_count}</Text>
                  <Text color='textTips'>{t('Featured')}</Text>
                </Box>
              </Flex>
            </Box>
            <Flex justifyContent='space-between' alignItems='center'>
              <Flex alignItems='center'>
                <UserImg src={tribeInfo?.tribe?.nft_image} alt='' />
                <Text ml='10px' bold ellipsis>
                  {tribeInfo?.tribe?.nick_name}
                </Text>
              </Flex>
              <Flex alignItems='center'>
                <Text ml='10px'>
                  {t('ValidityDaysUnit', {
                    value: dayjs().diff(
                      dayjs(tribeInfo?.tribe?.create_time * 1000),
                      'days',
                    ),
                  })}
                </Text>
                {tribeInfo?.status === NftStatus.Staked &&
                  tribeInfo?.expire !== TribeNftStatus.expire && (
                    <Icon
                      name='icon-fenxiang'
                      color='textPrimary'
                      size={18}
                      margin={'0 0 0 10px'}
                      current
                      onClick={openInvite}
                    />
                  )}
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Container>
      <Box padding='15px'>
        <Desc>{tribeInfo?.detail?.summary}</Desc>
      </Box>
    </Box>
  );
};

export default TribeInfoDetail;
