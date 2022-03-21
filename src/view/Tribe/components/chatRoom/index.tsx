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
  ImgList,
} from 'components';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import SendInput from './Input';
import useIm from 'hooks/imHooks/useIm';
import isToday from 'dayjs/plugin/isToday';
import { IM } from 'utils';
import { useDispatch } from 'react-redux';
import { storeAction, useStore } from 'store';
import ReactLoading from 'react-loading';
import FloatBtn from './goMsg';

dayjs.extend(isToday);

const ChatList = styled(Box)`
  min-height: 150px;
  max-height: 200px;
  overflow-y: auto;
  overflow-x: hidden;
  /* 阻止触底页面滚动 */
  overscroll-behavior: none;
  padding-bottom: 20px;
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

const MAX_LIMIT = 5;

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
  const [isSend, setisSend] = useState(0); //1自己发的 2收到新消息
  const [Start, setStart] = useState(0);
  const [Limit, setLimit] = useState(0);
  const [Loading, setLoading] = useState(false);
  const [JoinTribe, setJoinTribe] = useState(false);
  const [AddScrollHeight, setAddScrollHeight] = useState(0);
  const [IsSendRead, setIsSendRead] = useState(false);
  const [IsClose, setIsClose] = useState(true);

  const End = useMemo(() => Start <= 1, [Start]);

  // 已读消息更新
  const upDateRead = useCallback(
    (nonce?: number) => {
      console.log(IsSendRead);

      if (!MsgList.length || IsSendRead || IsClose) return;
      let Nonce;
      if (nonce) {
        Nonce = nonce;
      } else {
        Nonce = MsgList[MsgList.length - 1].nonce;
      }
      if (!Nonce) return;
      im?.send(im.messageProtocol.WSProtocol_Read_Nonce, {
        tribe_id: TribeId,
        read_nonce: Nonce,
      });
    },
    [im, TribeId, MsgList, IsSendRead, IsClose],
  );

  // 加入部落聊天室
  const JoinChatRoom = useCallback(
    ({ tribe_id, type }) => {
      // type 1加入 2退出
      if (type === 2) {
        // 部落id改变 退出当前加入部落
        im?.send(im.messageProtocol.WSProtocol_Join_Chat, {
          tribe_id: tribe_id,
          join: false,
        });
      } else {
        if (!tribe_id) return;
        im?.send(im.messageProtocol.WSProtocol_Join_Chat, {
          tribe_id: tribe_id,
          join: true,
        });
      }
    },
    [im],
  );

  // 是否与上条消息同一个发送者
  const isSameSender = useCallback(
    (sender: number, index: number) => {
      let res;
      if (index > 0) {
        res = sender === MsgList[index - 1].sender;
      } else {
        res = false;
      }
      return res;
    },
    [MsgList],
  );

  const sendMsg = useCallback(
    msg => {
      setisSend(1);
      setNewList([msg]);
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
          if (data.code === 1) {
            setJoinTribe(true);
          }
          break;
        case IM.MessageProtocol.WSProtocol_Chat_Message:
          //  发送成功/收到消息
          if (data?.data) {
            setisSend(2);
            setNewList([data?.data]);
            // 已在聊天室状态-接收到新消息标记已读
            setIsSendRead(false);
          }
          break;
        case IM.MessageProtocol.WSProtocol_Pull_Message:
          //  获取到消息列表
          let info = data?.data;
          if (info.max_msg === 0) {
            // 没有消息
            setLoading(false);
            return;
          }
          if (info) {
            if (info?.msg) {
              setListInfo(info);
              setNewList(info.msg);
            } else {
              let _start = info?.max_msg <= 6 ? 1 : info?.max_msg - MAX_LIMIT;
              setStart(_start);
              setLimit(MAX_LIMIT);
            }
          }
          break;
        case IM.MessageProtocol.WSProtocol_Read_Nonce:
          //  已读标记成功
          if (data.code === 1) {
            setIsSendRead(true);
          }
          break;
        default:
          console.debug('unread ws code: ', data);
          break;
      }
    },
    [
      setStart,
      setLimit,
      setJoinTribe,
      setisSend,
      setNewList,
      setListInfo,
      setLoading,
      setIsSendRead,
    ],
  );

  // 滚动加载
  const loadMore = useCallback(
    (e: any) => {
      const { scrollTop } = e.nativeEvent.target;
      upDateRead();
      // 滚动条是否到顶部
      if (scrollTop === 0) {
        if (Loading || End) return; // 判断是否在请求状态或者已到最后一页
        const NewStart = Start - Limit < 1 ? 1 : Start - Limit;
        setStart(NewStart);
      }
    },
    [Loading, End, Start, Limit, setStart, upDateRead],
  );

  // 向上滚动加载回弹到当前位置
  const getAddHeight = () => {
    const current = chatListRef.current!;
    setAddScrollHeight(current.scrollHeight);
    current.scrollTop = current.scrollHeight - AddScrollHeight + 100;
  };

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

  useEffect(() => {
    if (!IsSendRead && !IsClose) {
      // 已在聊天室状态-接收到新消息标记已读
      console.log(11111);

      upDateRead();
    }
  }, [IsClose, upDateRead, IsSendRead]);

  useEffect(() => {
    // 首次进入滚动条定位到底部
    if (MsgList.length && Start === ListInfo.max_msg - MAX_LIMIT) {
      setTimeout(() => {
        const current = chatListRef.current!;
        current.scrollTop = current.scrollHeight;
      }, 0);
    }
  }, [MsgList, Start, ListInfo.max_msg]);

  // 加入退出
  useEffect(() => {
    if (TribeId && im) {
      dispatch(storeAction.changrChatRoomList([]));
      JoinChatRoom({ tribe_id: TribeId, type: 1 });
    }
    return () => {
      JoinChatRoom({ tribe_id: TribeId, type: 2 });
    };
  }, [TribeId, im, JoinChatRoom, dispatch]);

  // 请求消息列表
  useEffect(() => {
    const sendMsgList = () => {
      im?.send(im.messageProtocol.WSProtocol_Pull_Message, {
        tribe_id: TribeId,
        Start: Start,
        limit: Limit,
      });
    };
    if (
      JoinTribe &&
      ((Start === 0 && Limit === 0) || (Start !== 0 && Limit !== 0))
    ) {
      setLoading(true);
      sendMsgList();
    }
  }, [TribeId, Start, Limit, im, JoinTribe, setLoading]);

  useEffect(() => {
    if (NewList.length) {
      setLoading(false);
      let concatList;
      if (isSend) {
        // 发送/接收的单条消息
        concatList = MsgList.concat(NewList);
        if (isSend === 1) {
          // 自己发消息 回到底部
          setTimeout(() => {
            const current = chatListRef.current!;
            current.scrollTop = current.scrollHeight;
          }, 0);
        }
      } else {
        concatList = NewList.concat(MsgList);
        getAddHeight();
      }
      dispatch(storeAction.changrChatRoomList(concatList));
      setisSend(0);
      setNewList([]);
    }
  }, [NewList, MsgList, dispatch, getAddHeight, setLoading, isSend]);

  return (
    <Collapse
      setIsClose={e => {
        console.log(e);

        setIsClose(e);
      }}
      title={t('聊天室')}
      padding='0'
      {...props}
    >
      <Box position='relative' padding=' 0 0 0 16px'>
        <ChatList ref={chatListRef} onScroll={loadMore}>
          {Loading ? (
            <LoadingWrapper>
              <Spinner />
            </LoadingWrapper>
          ) : (
            <>{!MsgList.length && <Empty />}</>
          )}
          {MsgList.map((item, index) => {
            return (
              <>
                {!dayjs(item?.create_time / 1000).isToday() && (
                  <Flex justifyContent='center' mb='10px'>
                    <Text fontSize='14px' color='textTips'>
                      {dayjs(item?.create_time / 1000).format('MM-DD')}
                    </Text>
                  </Flex>
                )}
                <MsgBox
                  tribeHost={tribeHost}
                  sameSender={isSameSender(item.sender, index)}
                  detail={item}
                />
              </>
            );
          })}
        </ChatList>
        {ListInfo.total_un_read > MAX_LIMIT && (
          <FloatBtn total_un_read={ListInfo.total_un_read} />
        )}
      </Box>
      <SendInput sendMsg={sendMsg} tribe_id={TribeId} im={im} />
    </Collapse>
  );
};

const MsgBox = ({ detail, tribeHost, sameSender }) => {
  const { address } = useStore(p => p.loginReducer.userInfo);
  const isMyMsg = useMemo(() => {
    return (
      address?.toLocaleLowerCase() ===
      detail?.sender_detail?.address?.toLocaleLowerCase()
    );
  }, [address, detail]);

  return (
    <Flex mb='16px'>
      {!isMyMsg && !sameSender && (
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
        {!sameSender && (
          <Flex mb='6px' flexWrap='wrap'>
            <Text fontSize='14px' mr='10px'>
              {detail?.sender_detail?.nick_name}
            </Text>
            <Text fontSize='14px' color='textTips'>
              {dayjs(detail?.create_time / 1000).format('HH:mm')}
            </Text>
          </Flex>
        )}
        <MsgContent
          ml={isMyMsg ? '0' : sameSender ? '56px' : '0'}
          mr={isMyMsg ? (sameSender ? '56px' : '0') : '0'}
          myMsg={isMyMsg}
        >
          <Text style={{ wordBreak: 'break-all' }} fontSize='14px'>
            <ContentParsing
              rows={100}
              content={detail?.message}
              imgList={detail?.image_url}
            />
            {detail?.image_url && <ImgList list={detail?.image_url} />}
          </Text>
          <Triangle myMsg={isMyMsg} />
        </MsgContent>
      </Flex>
      {isMyMsg && !sameSender && (
        <Flex position='relative' ml='16px' justifyContent='center'>
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
    </Flex>
  );
};

export default ChatRoom;
