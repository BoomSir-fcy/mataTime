import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Box, Flex, Text, LinkExternal } from 'uikit';
import { NftStatus, TribeNftStatus } from 'store/tribe/type';
import ChatRoom from '../components/chatRoom';
import { useFetchTribeInfoById, useTribeInfoById } from 'store/mapModule/hooks';
import useParsedQueryString from 'hooks/useParsedQueryString';
import { useTranslation } from 'contexts';
import { Crumbs } from 'components';
import { isApp } from 'utils/client';

const AppChatRoom: React.FC = () => {
  const { t } = useTranslation();

  const parsedQs = useParsedQueryString();
  const [TribeId, setTribeId] = useState(Number(parsedQs.id));
  useFetchTribeInfoById(TribeId);
  const tribeDetailInfo = useTribeInfoById(parsedQs.id);

  useEffect(() => {
    if (isApp()) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      if (isApp()) {
        document.body.style.overflow = 'auto';
      }
    };
  }, [isApp()]);

  return (
    <Box>
      <Crumbs back />
      {tribeDetailInfo?.status === NftStatus.Staked &&
      tribeDetailInfo?.expire !== TribeNftStatus.expire ? (
        <ChatRoom
          tribe_id={TribeId}
          tribeHost={tribeDetailInfo?.tribe?.owner_address}
          isMember={tribeDetailInfo?.status === NftStatus.Staked}
          mb='15px'
        />
      ) : (
        <>
          <Flex
            height='200px'
            alignItems='center'
            flexDirection='column'
            justifyContent='center'
          >
            <Text mb='20px'>{t('加入部落即可进入聊天室')}</Text>
            <LinkExternal
              color='textPrimary'
              href={`/tribe/detail?id=${TribeId}`}
              external
            >
              {t('To join / pledge')}
            </LinkExternal>
          </Flex>
        </>
      )}
    </Box>
  );
};
export default AppChatRoom;
