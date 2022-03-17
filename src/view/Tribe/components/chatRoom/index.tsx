import React, {
  useCallback,
  useMemo,
  useState,
  useEffect,
  useRef,
} from 'react';
import { useImmer } from 'use-immer';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { Box, Card, Empty, Flex, Spinner, Text } from 'uikit';
import { useTranslation } from 'contexts';
import {
  Avatar,
  Collapse,
  ContentParsing,
  ChatRoomList,
  LoadingWrapper,
} from 'components';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import SendInput from './Input';
import useIm from 'hooks/imHooks/useIm';
import isToday from 'dayjs/plugin/isToday';
import { IM } from 'utils';
import { useDispatch } from 'react-redux';
import { storeAction, useStore } from 'store';
import ReactLoading from 'react-loading';

dayjs.extend(isToday);

const ChatList = styled(Box)`
  /* padding: 10px 0; */
  min-height: 150px;
  max-height: 200px;
  overflow-y: auto;
  overflow-x: hidden;
  padding-right: 8px;
`;

const MsgContent = styled(Box)<{ myMsg: boolean }>`
  position: relative;
  padding: 6px;
  background-color: ${({ myMsg, theme }) =>
    myMsg ? theme.colors.backgroundTextArea : theme.colors.background};
  border-radius: 10px;
  max-width: 74%;
  min-width: 20px;
  min-height: 22px;
`;

const HostTag = styled(Box)`
  position: absolute;
  padding: 0 4px;
  background: ${({ theme }) => theme.colors.textOrigin};
  border-radius: 4px;
  width: max-content;
  bottom: 8px;
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
  tribeHost: string;
}> = ({ ...props }) => {
  const { t } = useTranslation();
  const { account } = useActiveWeb3React();
  const dispatch = useDispatch();
  const chatListRef = useRef(null);
  const { tribeHost, tribe_id: TribeId } = props;
  const { im } = useIm();

  const MsgList = useStore(p => p.tribe.chatRoomMsg);
  const [ListInfo, setListInfo] = useState({
    latest_read: null,
    msg: [],
    max_msg: null,
    total_un_read: null,
  });
  const [NewList, setNewList] = useState([]);
  const [isSend, setisSend] = useState(false);
  const [Start, setStart] = useState(0);
  const [Limit, setLimit] = useState(0);
  const [Loading, setLoading] = useState(false);
  const [JoinTribeId, setJoinTribeId] = useState(null);

  const End = useMemo(() => Start <= 1, [Start]);

  // 加入部落聊天室
  const JoinChatRoom = ({ tribe_id }) => {
    if (JoinTribeId !== tribe_id && JoinTribeId !== null) {
      // 部落id改变 退出当前加入部落
      im?.send(im.messageProtocol.WSProtocol_Join_Chat, {
        tribe_id: tribe_id,
        join: false,
      });
    } else {
      im?.send(im.messageProtocol.WSProtocol_Join_Chat, {
        tribe_id: tribe_id,
        join: true,
      });
    }
  };

  const sendMsg = useCallback(
    msg => {
      setNewList([msg]);
      setisSend(true);
      // console.log(list);
    },
    [setNewList, setisSend],
  );

  // 消息解析
  const handleNewMsg = useCallback(
    event => {
      const data = JSON.parse(event.data);
      switch (data.ptl) {
        case IM.MessageProtocol.WSProtocol_Join_Chat:
          //  加入成功
          setJoinTribeId(TribeId);
          break;
        case IM.MessageProtocol.WSProtocol_Chat_Message:
          //  发送成功/收到消息
          setNewList(data?.data);
          setisSend(true);
          break;
        case IM.MessageProtocol.WSProtocol_Pull_Message:
          //  获取到消息列表
          let info = data?.data;
          if (info) {
            if (info?.msg) {
              setListInfo(info);
              setNewList(info.msg);
            } else {
              let _start = info?.max_msg - 5;
              // if (list?.total_un_read === 0) {
              //   // 已读完最新消息 拉取最新5条消息
              //   _start = list?.max_msg;
              // } else {
              //   _start = list?.latest_read;
              // }
              setStart(_start);
              setLimit(5);
            }
          }
          break;
        default:
          console.debug('unread ws code: ', data);
          break;
      }
    },
    [setStart, setLimit, setNewList, setListInfo, Start, Limit, TribeId],
  );

  // 滚动加载
  const loadMore = useCallback(
    (e: any) => {
      const { scrollTop } = e.nativeEvent.target;
      // 滚动条是否到顶部
      if (scrollTop === 0) {
        if (Loading || End) return; // 判断是否在请求状态或者已到最后一页
        setStart(Start - Limit);
      }
    },
    [Loading, End, Start, Limit],
  );

  // 监听接收消息
  useEffect(() => {
    if (im) {
      im.addEventListener(IM.EventType.MESSAGE, handleNewMsg);
    }
    return () => {
      if (im) {
        im.removeEventListener(IM.EventType.MESSAGE, handleNewMsg);
      }
    };
  }, [im]);

  // 首次进入滚动条定位到底部
  useEffect(() => {
    if (MsgList.length && Start === ListInfo.max_msg - 5) {
      setTimeout(() => {
        const current = chatListRef.current!;
        current.scrollTop = current.scrollHeight;
      }, 100);
    }
  }, [MsgList, Start, ListInfo.max_msg]);

  useEffect(() => {
    if (TribeId && im) {
      JoinChatRoom({ tribe_id: TribeId });
    }
  }, [TribeId, im]);

  // 请求消息列表
  useEffect(() => {
    const sendMsgList = () => {
      im?.send(im.messageProtocol.WSProtocol_Pull_Message, {
        tribe_id: TribeId,
        Start: Start,
        limit: Limit,
      });
    };
    if (JoinTribeId) {
      sendMsgList();
    }
  }, [TribeId, Start, Limit, im, JoinTribeId]);

  useEffect(() => {
    if (NewList.length) {
      let concatList;
      if (isSend) {
        // 发送的消息
        concatList = MsgList.concat(NewList);
        setisSend(false);
      } else {
        concatList = NewList.concat(MsgList);
      }
      dispatch(storeAction.changrChatRoomList(concatList));
      setNewList([]);
    }
  }, [NewList, MsgList, dispatch, isSend]);

  return (
    <Collapse title={t('聊天室')} padding='0' {...props}>
      <Box padding=' 0 8px 0 16px'>
        <ChatList ref={chatListRef} onScroll={loadMore}>
          {Loading ? (
            <LoadingWrapper>
              <Spinner />
            </LoadingWrapper>
          ) : (
            <>{!MsgList.length && <Empty />}</>
          )}
          {MsgList.map(item => {
            return (
              <>
                {!dayjs(item?.create_time / 1000).isToday() && (
                  <Flex justifyContent='center' mb='10px'>
                    <Text fontSize='14px' color='textTips'>
                      {dayjs(item?.create_time / 1000).format('MM-DD')}
                    </Text>
                  </Flex>
                )}
                <MsgBox tribeHost={tribeHost} detail={item} />
              </>
            );
          })}
        </ChatList>
      </Box>
      <SendInput sendMsg={sendMsg} tribe_id={TribeId} im={im} />
    </Collapse>
  );
};

const MsgBox = ({ detail, tribeHost }) => {
  const { account } = useActiveWeb3React();

  const isMyMsg = useMemo(() => {
    return (
      account?.toLocaleLowerCase() ===
      detail?.sender_detail?.address?.toLocaleLowerCase()
    );
  }, [account, detail]);

  return (
    <Flex mb='16px'>
      {!isMyMsg && (
        <Flex position='relative' mr='16px' justifyContent='center'>
          <Avatar
            disableFollow
            scale='sm'
            src={detail?.sender_detail?.nft_image}
          />
          {tribeHost?.toLocaleLowerCase() ===
            detail?.sender_detail?.address?.toLocaleLowerCase() && (
            <HostTag>
              <Text fontSize='12px'>host</Text>
            </HostTag>
          )}
        </Flex>
      )}
      <Flex
        flex={1}
        flexDirection='column'
        alignItems={isMyMsg ? `end` : `start`}
      >
        {!isMyMsg && (
          <Flex mb='6px'>
            <Text fontSize='14px' mr='10px'>
              {detail?.sender_detail?.nick_name}
            </Text>
            <Text fontSize='14px' color='textTips'>
              {dayjs(detail?.create_time / 1000).format('HH:mm')}
            </Text>
          </Flex>
        )}
        <MsgContent myMsg={isMyMsg}>
          <Text style={{ wordBreak: 'break-all' }} fontSize='14px'>
            <ContentParsing rows={100} content={detail?.message} />
          </Text>
          <Triangle myMsg={isMyMsg} />
        </MsgContent>
      </Flex>
    </Flex>
  );
};

export default ChatRoom;
