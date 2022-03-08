import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button, Flex, Heading, Text, Box, Image } from 'uikit';
import { useTranslation } from 'contexts';
import { useStore } from 'store';
import { TribeInfo } from 'store/tribe/type';

import TribeLogo from './tribeLogo';

const InfoFlex = styled(Flex)`
  width: 100%;
  padding: 15px 15px 0;
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
  width: 20px;
  height: 20px;
`;

interface HeaderProps {
  tribeInfo: TribeInfo;
}
const TribeInfoDetail: React.FC<HeaderProps> = ({ tribeInfo }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();
  const userInfo = useStore(p => p.loginReducer.userInfo);

  return (
    <Box>
      <InfoFlex>
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
              <Text fontSize='18px' fontWeight='bold'>
                {tribeInfo?.tribe?.name}
              </Text>
              {userInfo?.address === tribeInfo?.tribe?.owner_address && (
                <Text
                  color='textPrimary'
                  onClick={() =>
                    history.push(`/me/tribe/info?i=${tribeInfo?.tribe_id}`)
                  }
                  style={{
                    cursor: 'pointer',
                  }}
                >
                  {t('tribeInfoManager')}
                </Text>
              )}
            </Flex>
            <NumberFlex mt='15px' justifyContent='space-between'>
              <Box>
                <Text bold>{tribeInfo?.member_count}</Text>
                <Text fontSize='14px' color='textTips'>
                  成员
                </Text>
              </Box>
              <Box>
                <Text bold>{tribeInfo?.post_count}</Text>
                <Text fontSize='14px' color='textTips'>
                  帖子
                </Text>
              </Box>
              <Box>
                <Text bold>{tribeInfo?.selected_count}</Text>
                <Text fontSize='14px' color='textTips'>
                  {t('Featured')}
                </Text>
              </Box>
            </NumberFlex>
          </Box>
          <Flex justifyContent='space-between' alignItems='center'>
            <Flex alignItems='center'>
              <UserImg src={tribeInfo?.tribe?.nft_image} alt='' />
              <Text ml='10px' bold>
                {tribeInfo?.tribe?.nick_name}
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </InfoFlex>
      <Box padding='15px'>
        <Text>{tribeInfo?.detail?.summary}</Text>
      </Box>
    </Box>
  );
};

export default TribeInfoDetail;
