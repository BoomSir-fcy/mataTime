import React, { useState } from 'react';
import { useImmer } from 'use-immer';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { Box, Card, Flex, Text } from 'uikit';
import { useTranslation } from 'contexts';
import { useTribeInfoById } from 'store/mapModule/hooks';
import { Avatar, List } from 'components';

const ChatList = styled(Box)`
  padding: 10px 0;
`;

const MsgContent = styled(Box)<{ myMsg: boolean }>`
  position: relative;
  padding: 6px;
  background-color: ${({ myMsg, theme }) =>
    myMsg ? theme.colors.background : theme.colors.backgroundTextArea};
  border-radius: 10px;
`;

const Triangle = styled.div<{ myMsg: boolean }>`
  position: absolute;
  width: 0;
  height: 0;
  border-right: 6px solid transparent;
  border-left: 6px solid transparent;
  border-top: ${({ theme }) => `6px solid ${theme.colors.backgroundTextArea}`};
`;

const ChatRoom: React.FC<{
  tribe_id: number;
  mb: string;
}> = ({ ...props }) => {
  const { t } = useTranslation();
  const [Loading, setLoading] = useState(false);
  const tribeInfo = useTribeInfoById(props.tribe_id);
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
    <Card padding='16px' isRadius {...props}>
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
    </Card>
  );
};

const MsgBox = ({ detail }) => {
  return (
    <Flex mb='16px'>
      <Box mr='16px' mb='6px'>
        <Avatar disableFollow scale='sm' src={detail?.nft_image} />
      </Box>
      <Box>
        <Flex>
          <Text fontSize='14px' mr='10px'>
            {detail?.name}
          </Text>
          <Text fontSize='14px' color='textTips'>
            {dayjs(detail?.time).format('HH:mm')}
          </Text>
        </Flex>
        <MsgContent myMsg={true}>
          {detail?.content}
          <Triangle myMsg={true} />
        </MsgContent>
      </Box>
    </Flex>
  );
};

export default ChatRoom;
