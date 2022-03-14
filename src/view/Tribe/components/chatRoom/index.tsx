import React, { useMemo, useState } from 'react';
import { useImmer } from 'use-immer';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { Box, Card, Flex, Text } from 'uikit';
import { useTranslation } from 'contexts';
import { Avatar, List } from 'components';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import SendInput from './Input';
import useIm from 'hooks/imHooks/useIm';

const ChatRoomBox = styled(Box)`
  background-color: ${({ theme }) => theme.colors.backgroundThemeCard};
  /* padding: 16px; */
  border-radius: 10px;
`;

const ChatList = styled(Box)`
  padding: 10px 0;
`;

const MsgContent = styled(Box)<{ myMsg: boolean }>`
  position: relative;
  padding: 6px;
  background-color: ${({ myMsg, theme }) =>
    myMsg ? theme.colors.backgroundTextArea : theme.colors.background};
  border-radius: 10px;
`;

const Triangle = styled.div<{ myMsg: boolean }>`
  position: absolute;
  width: 0;
  height: 0;
  border-right: 8px solid transparent;
  border-left: 8px solid transparent;
  border-top: 8px solid
    ${({ myMsg, theme }) =>
      myMsg ? theme.colors.backgroundTextArea : theme.colors.background};
  top: 0;
  left: ${({ myMsg }) => (myMsg ? 'auto' : `-7px`)};
  right: ${({ myMsg }) => (myMsg ? '-7px' : `auto`)};
`;

const ChatRoom: React.FC<{
  tribe_id: number;
  mb: string;
}> = ({ ...props }) => {
  const { t } = useTranslation();
  const { account } = useActiveWeb3React();
  const [Loading, setLoading] = useState(false);
  const { im } = useIm();

  const msgList = [
    {
      address: '1231242124',
      name: 'bibibi',
      nft_image:
        'https://img.pddpic.com/open-gw/2021-08-19/18c1376c-3dd5-4b12-855e-34e0174c31f9.png',
      content: '122222222',
      time: 1647236657,
    },
    {
      address: '0xeda5b21b8E8c306bF5510d1558f89a9CB126120b',
      name: 'zzzz',
      nft_image:
        'https://img.pddpic.com/open-gw/2021-08-19/18c1376c-3dd5-4b12-855e-34e0174c31f9.png',
      content: '33333333',
      time: 1647236657,
    },
  ];

  return (
    <ChatRoomBox {...props}>
      <Box padding='16px'>
        <Flex>
          <Text>{t('聊天室')}</Text>
        </Flex>
        <ChatList>
          <List loading={Loading} renderList={type => {}}>
            {msgList.map(item => {
              return <MsgBox detail={item} />;
            })}
          </List>
        </ChatList>
      </Box>
      <SendInput tribe_id={props?.tribe_id} im={im} />
    </ChatRoomBox>
  );
};

const MsgBox = ({ detail }) => {
  const { account } = useActiveWeb3React();

  const isMyMsg = useMemo(() => {
    return account?.toLocaleLowerCase() === detail?.address.toLocaleLowerCase();
  }, [account, detail]);

  return (
    <Flex mb='16px' justifyContent={isMyMsg ? `end` : `start`}>
      {!isMyMsg && (
        <Box mr='16px'>
          <Avatar disableFollow scale='sm' src={detail?.nft_image} />
        </Box>
      )}
      <Box>
        {!isMyMsg && (
          <Flex mb='6px'>
            <Text fontSize='14px' mr='10px'>
              {detail?.name}
            </Text>
            <Text fontSize='14px' color='textTips'>
              {dayjs(detail?.time).format('HH:mm')}
            </Text>
          </Flex>
        )}
        <MsgContent myMsg={isMyMsg}>
          <Text fontSize='14px'>{detail?.content}</Text>
          <Triangle myMsg={isMyMsg} />
        </MsgContent>
      </Box>
    </Flex>
  );
};

export default ChatRoom;
