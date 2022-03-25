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
import { TribeInfo, TribeType } from 'store/tribe/type';
import BtnIcon from '../BtnIcon';
import { useTribeInfoById } from 'store/mapModule/hooks';
import { fetchTribeJoinBasicServiceAsync } from 'store/tribe';
import { isApp } from 'utils/client';

dayjs.extend(isToday);

const ChatList = styled(Box)<{ IsApp: boolean }>`
  min-height: ${({ IsApp }) =>
    IsApp ? 'calc(100vh - 135px - 138px)' : `200px`};
  max-height: ${({ IsApp }) =>
    IsApp ? 'calc(100vh - 135px - 138px)' : `200px`};
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
  max-width: 60%;
  min-width: 20px;
`;

const HostTag = styled(Box)`
  position: absolute;
  padding: 0 4px;
  background: ${({ theme }) => theme.colors.textOrigin};
  border-radius: 4px;
  width: max-content;
  bottom: -10px;
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

export const MAX_LIMIT = isApp() ? 10 : 5;
const UNREAD_LIMIT = 20;

const ChatRoom: React.FC<{
  tribe_id: number;
  mb?: string;
  tribeHost: string;
  isMember: boolean;
}> = ({ ...props }) => {
  const { t } = useTranslation();
  const { account } = useActiveWeb3React();
  const dispatch = useDispatch();
  const chatListRef = useRef(null);

  const { tribeHost, tribe_id: TribeId, isMember } = props;
  const { im } = useIm();

  const MsgList = useStore(p => p.tribe.chatRoomMsg);
  const [NewList, setNewList] = useState([]);
  const [isSend, setisSend] = useState(0); //1自己发的 2收到新消息
  const [TurnPages, setTurnPages] = useImmer({
    Start: 0,
    Limit: 0,
  });
  const [Loading, setLoading] = useState(false);
  const [JoinTribe, setJoinTribe] = useState(false);
  const [IsSendRead, setIsSendRead] = useState(false);
  const [IsClose, setIsClose] = useState(true);
  const [IsGotop, setIsGotop] = useState(false);
  const [UserInfo, setUserInfo] = useState({
    uid: null,
    nick_name: '',
  });
  const [UnreadMsg, setUnreadMsg] = useImmer({
    latest_read: null,
    max_msg: null,
    at_msg_nonce: [],
    total_un_read: null,
  });
  const [OutChatRoom, setOutChatRoom] = useState(false);

  const End = useMemo(() => TurnPages.Start <= 1, [TurnPages.Start]);

  // 已读消息更新
  const upDateRead = useCallback(
    (nonce?: number) => {
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
          if (data.code === 1 && data.data?.join) {
            setJoinTribe(true);
          }
          break;
        case IM.MessageProtocol.WSProtocol_Chat_Message:
          //  发送成功/收到消息
          if (data?.data) {
            if (data?.data.tribe_id === TribeId) {
              setisSend(2);
              setNewList([data?.data]);
              // 已在聊天室状态-接收到新消息标记已读
              setIsSendRead(false);
            }
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
              setNewList(info.msg);
            } else {
              let _start =
                info?.max_msg <= 6 ? 1 : info?.max_msg - MAX_LIMIT + 1;
              setUnreadMsg(p => {
                p.latest_read = info?.latest_read;
                p.max_msg = info?.max_msg;
                p.total_un_read = info?.total_un_read;
                p.at_msg_nonce = info?.at_msg_nonce?.length
                  ? info?.at_msg_nonce
                  : [];
              });
              setTurnPages(p => {
                p.Start = _start;
                p.Limit = MAX_LIMIT;
              });
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
      TribeId,
      MAX_LIMIT,
      setUnreadMsg,
      setTurnPages,
      setJoinTribe,
      setisSend,
      setNewList,
      setLoading,
      setIsSendRead,
    ],
  );

  // 滚动加载
  const loadMore = useCallback(
    (e: any) => {
      const { scrollTop } = e.nativeEvent.target;
      // 滚动条是否到顶部
      if (scrollTop === 0) {
        if (IsClose) {
          // 在没点击聊天室的情况下滚动 标记已读
          setIsClose(false);
        }
        if (Loading || End) return; // 判断是否在请求状态或者已到最后一页
        const NewStart =
          TurnPages.Start - TurnPages.Limit < 1
            ? 1
            : TurnPages.Start - TurnPages.Limit;
        const NewLimit =
          TurnPages.Start - TurnPages.Limit < 1
            ? TurnPages.Start - 1
            : MAX_LIMIT;
        setTurnPages(p => {
          p.Start = NewStart;
          p.Limit = NewLimit;
        });
      }
    },
    [Loading, End, TurnPages, IsClose, MAX_LIMIT, setTurnPages, setIsClose],
  );

  // 向上滚动加载回弹到当前位置
  const getAddHeight = nonce => {
    if (!IsGotop) {
      setTimeout(() => {
        let anchorElement = document.getElementById(String(nonce));
        if (anchorElement) {
          const current = chatListRef.current!;
          current.scrollTop = anchorElement.offsetTop + 2;
        }
      }, 0);
    }
  };

  // 查看未读消息定位到消息顶部
  const toTop = useCallback(
    (init?, nonce?) => {
      if (IsGotop || TurnPages.Limit !== MAX_LIMIT || init) {
        setTimeout(() => {
          let anchorElement = document.getElementById(
            String(nonce ? nonce : TurnPages.Start),
          );
          if (anchorElement) {
            console.log(anchorElement.offsetTop, nonce);

            const current = chatListRef.current!;
            current.scrollTop = anchorElement.offsetTop + 2;
          }
          let arr = [];
          if (UnreadMsg.at_msg_nonce.length) {
            arr = UnreadMsg.at_msg_nonce.concat();
            let readNonce = arr.pop();
            setUnreadMsg(p => {
              p.at_msg_nonce = arr;
              p.total_un_read =
                UnreadMsg.max_msg -
                UnreadMsg.latest_read -
                (UnreadMsg.max_msg - readNonce);
            });
          } else {
            setUnreadMsg(p => {
              p.total_un_read = 0;
            });
          }
          setIsGotop(false);
        }, 0);
      }
    },
    [TurnPages, UnreadMsg, IsGotop],
  );

  // 加载到未读消息处
  const goUnread = useCallback(() => {
    const send = async (Start, Limit) => {
      im?.send(im.messageProtocol.WSProtocol_Pull_Message, {
        tribe_id: TribeId,
        Start: Start,
        limit: Limit,
      });
      return;
    };
    const LoadList = async end => {
      let size =
        TurnPages.Start - end < UNREAD_LIMIT
          ? TurnPages.Start - end
          : UNREAD_LIMIT;
      let begin =
        TurnPages.Start - UNREAD_LIMIT < end
          ? TurnPages.Start - size
          : TurnPages.Start - UNREAD_LIMIT;
      let last_i;
      if (size <= 0) {
        setIsGotop(true);
        toTop(true, end);
        return;
      }
      if (begin === end) {
        setTurnPages(p => {
          p.Start = begin;
          p.Limit = size;
        });
        setIsGotop(true);
        return;
      }
      for (
        let i = begin;
        i > end;
        i = i - UNREAD_LIMIT <= end ? i - (i - end) : i - UNREAD_LIMIT
      ) {
        last_i = i;
        if (begin !== end) {
          await send(i, UNREAD_LIMIT);
        }
        if (i - UNREAD_LIMIT < end) {
          // 最后一次拉取不足20条时
          setTurnPages(p => {
            p.Start = i - (i - end);
            p.Limit = last_i - end;
          });
        }
        if (i - UNREAD_LIMIT < end) {
          setIsGotop(true);
        }
      }
    };
    if (UnreadMsg.at_msg_nonce.length) {
      LoadList(UnreadMsg.at_msg_nonce[UnreadMsg.at_msg_nonce.length - 1]);
    } else {
      LoadList(UnreadMsg.latest_read);
    }
  }, [
    im,
    UnreadMsg,
    TribeId,
    TurnPages.Start,
    UNREAD_LIMIT,
    toTop,
    setUnreadMsg,
    setIsGotop,
    setTurnPages,
  ]);

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

  // 已在聊天室状态-接收到新消息标记已读
  useEffect(() => {
    if (!IsSendRead && !IsClose) {
      upDateRead();
    }
  }, [IsClose, upDateRead, IsSendRead]);

  // 首次进入滚动条定位到底部
  useEffect(() => {
    if (
      MsgList.length &&
      TurnPages.Start === UnreadMsg.max_msg - MAX_LIMIT + 1
    ) {
      setTimeout(() => {
        const current = chatListRef.current!;
        if (current?.scrollHeight) {
          current.scrollTop = current.scrollHeight;
        }
      }, 0);
    }
  }, [MsgList, TurnPages.Start, UnreadMsg.max_msg, MAX_LIMIT]);

  // 加入退出
  useEffect(() => {
    if (TribeId && im && isMember) {
      dispatch(storeAction.changrChatRoomList([]));
      if (OutChatRoom) {
        JoinChatRoom({ tribe_id: TribeId, type: 2 });
        setJoinTribe(false);
      } else {
        JoinChatRoom({ tribe_id: TribeId, type: 1 });
      }
    }
    return () => {
      setJoinTribe(false);
      JoinChatRoom({ tribe_id: TribeId, type: 2 });
    };
  }, [
    TribeId,
    im,
    OutChatRoom,
    JoinChatRoom,
    setJoinTribe,
    dispatch,
    isMember,
  ]);

  // 请求消息列表
  useEffect(() => {
    const sendMsgList = () => {
      im?.send(im.messageProtocol.WSProtocol_Pull_Message, {
        tribe_id: TribeId,
        Start: TurnPages.Start,
        limit: TurnPages.Limit,
      });
    };
    if (JoinTribe) {
      setLoading(true);
      sendMsgList();
    } else {
      setTurnPages(p => {
        p.Start = 0;
        p.Limit = 0;
      });
      setIsGotop(false);
    }
  }, [TribeId, TurnPages, im, JoinTribe, setIsGotop, setTurnPages, setLoading]);

  // 消息更新
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
        dispatch(storeAction.changrChatRoomList(concatList));
      } else {
        concatList = NewList.concat(MsgList);
        dispatch(storeAction.changrChatRoomList(concatList));
        getAddHeight(NewList[NewList.length - 1].nonce);
        toTop();
      }
      setisSend(0);
      setNewList([]);
    }
  }, [NewList, MsgList, dispatch, getAddHeight, toTop, setLoading, isSend]);

  return (
    <>
      {isApp() ? (
        <>
          <Box position='relative' padding=' 0 0 0 16px'>
            <ChatList IsApp={isApp()} ref={chatListRef} onScroll={loadMore}>
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
                    {index !== 0 &&
                    dayjs(MsgList[index - 1].create_time / 1000).format(
                      'MM-DD',
                    ) !== dayjs(item?.create_time / 1000).format('MM-DD') ? (
                      <Flex
                        justifyContent='center'
                        alignItems='flex-end'
                        height='50px'
                      >
                        <Text fontSize='14px' color='textTips'>
                          {dayjs(item?.create_time / 1000).format('MM-DD')}
                        </Text>
                      </Flex>
                    ) : (
                      <></>
                    )}
                    {index === 0 && (
                      <Flex
                        justifyContent='center'
                        alignItems='flex-end'
                        height='70px'
                      >
                        <Text fontSize='14px' color='textTips'>
                          {dayjs(item?.create_time / 1000).format('MM-DD')}
                        </Text>
                      </Flex>
                    )}
                    <MsgBox
                      tribeHost={tribeHost}
                      sameSender={isSameSender(item.sender, index)}
                      detail={item}
                      setUserInfo={setUserInfo}
                    />
                  </>
                );
              })}
            </ChatList>
            <FloatBtn goUnread={() => goUnread()} UnreadMsg={UnreadMsg} />
          </Box>
          <SendInput
            sendMsg={sendMsg}
            tribe_id={TribeId}
            im={im}
            UserInfo={UserInfo}
            setUserInfo={e => setUserInfo(e)}
          />
        </>
      ) : (
        <Collapse
          setIsClose={e => {
            setIsClose(e);
          }}
          callBack={e => {
            setOutChatRoom(e);
          }}
          title={t('聊天室')}
          padding='0'
          {...props}
        >
          <Box position='relative' padding=' 0 0 0 16px'>
            <ChatList IsApp={isApp()} ref={chatListRef} onScroll={loadMore}>
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
                    {index !== 0 &&
                    dayjs(MsgList[index - 1].create_time / 1000).format(
                      'MM-DD',
                    ) !== dayjs(item?.create_time / 1000).format('MM-DD') ? (
                      <Flex
                        justifyContent='center'
                        alignItems='flex-end'
                        height='50px'
                      >
                        <Text fontSize='14px' color='textTips'>
                          {dayjs(item?.create_time / 1000).format('MM-DD')}
                        </Text>
                      </Flex>
                    ) : (
                      <></>
                    )}
                    {index === 0 && (
                      <Flex
                        justifyContent='center'
                        alignItems='flex-end'
                        height='70px'
                      >
                        <Text fontSize='14px' color='textTips'>
                          {dayjs(item?.create_time / 1000).format('MM-DD')}
                        </Text>
                      </Flex>
                    )}
                    <MsgBox
                      tribeHost={tribeHost}
                      sameSender={isSameSender(item.sender, index)}
                      detail={item}
                      setUserInfo={setUserInfo}
                    />
                  </>
                );
              })}
            </ChatList>
            <FloatBtn goUnread={() => goUnread()} UnreadMsg={UnreadMsg} />
          </Box>
          <SendInput
            sendMsg={sendMsg}
            tribe_id={TribeId}
            im={im}
            UserInfo={UserInfo}
            setUserInfo={e => setUserInfo(e)}
          />
        </Collapse>
      )}
    </>
  );
};

const MsgBox = ({ detail, tribeHost, sameSender, setUserInfo }) => {
  const { address } = useStore(p => p.loginReducer.userInfo);
  const isMyMsg = useMemo(() => {
    return (
      address?.toLocaleLowerCase() ===
      detail?.sender_detail?.address?.toLocaleLowerCase()
    );
  }, [address, detail]);

  return (
    <Flex pt='16px' id={detail?.nonce}>
      {!isMyMsg && !sameSender && (
        <Flex
          style={{ cursor: 'pointer' }}
          height='max-content'
          position='relative'
          mr='16px'
          justifyContent='center'
          onClick={() =>
            setUserInfo({
              uid: detail?.sender,
              nick_name: detail?.sender_detail?.nick_name,
            })
          }
        >
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
        alignItems={isMyMsg ? `flex-end` : `flex-start`}
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
          minHeight={detail?.image_url?.length ? '50px' : '22px'}
        >
          <Text style={{ wordBreak: 'break-all' }} fontSize='14px'>
            <ContentParsing
              rows={100}
              content={detail?.message}
              imgList={detail?.image_url}
              chatRoom={true}
            />
            {detail?.image_url?.length ? (
              <ImgList type='chatRoom' list={detail?.image_url} />
            ) : (
              <></>
            )}
          </Text>
          <Triangle myMsg={isMyMsg} />
        </MsgContent>
      </Flex>
      {isMyMsg && !sameSender && (
        <Flex
          height='max-content'
          position='relative'
          ml='16px'
          justifyContent='center'
        >
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
