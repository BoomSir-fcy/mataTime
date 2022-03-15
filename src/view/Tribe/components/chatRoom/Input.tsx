import { Editor } from 'components';
import { useTranslation } from 'contexts';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Descendant } from 'slate';
import styled from 'styled-components';
import { Flex, Input, Button, Card, Box } from 'uikit';
import { IM } from 'utils';

const InputBox = styled(Box)`
  padding: 12px 16px;
  border-top: 1px solid ${({ theme }) => theme.colors.borderThemeColor};
`;

const SearchBox = styled(Card)<{ focus?: boolean }>`
  position: relative;
  padding: 0 16px;
  height: 50px;
  border-radius: 20px;
  border: 1px solid
    ${({ focus, theme }) => (focus ? theme.colors.primary : 'transparent')};
  transition: all 0.3s;
  &:hover,
  :focus {
    border: 1px solid ${({ theme }) => theme.colors.primary};
  }
`;

const InputStyled = styled(Input)`
  background: transparent;
  border: none;
  box-shadow: none;
`;

const initialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [
      {
        text: '',
      },
    ],
  },
];

const SendInput: React.FC<{
  tribe_id: number;
  im: any;
}> = ({ ...props }) => {
  const { t } = useTranslation();
  const { im, tribe_id } = props;
  const childRef = useRef(null);
  const [JoinTribeId, setJoinTribeId] = useState(null);

  // 加入部落聊天室
  const JoinChatRoom = ({ tribe_id }) => {
    if (JoinTribeId !== tribe_id && JoinTribeId !== null) {
      // 部落id改变 退出当前加入部落
      im?.send(im.messageProtocol.WSProtocol_Join_Chat, {
        tribe_id: tribe_id,
        join: false,
      });
      setJoinTribeId(tribe_id);
    } else {
      im?.send(im.messageProtocol.WSProtocol_Join_Chat, {
        tribe_id: tribe_id,
        join: true,
      });
      setJoinTribeId(tribe_id);
    }
  };

  // 获取消息列表
  const getMsgList = ({ tribe_id }) => {
    im?.send(im.messageProtocol.WSProtocol_Pull_Message, {
      tribe_id: tribe_id,
    });
  };

  // 发送消息
  const handleSubmit = useCallback(
    (res, image_urls, remind_user, reset) => {
      console.log(res, image_urls, remind_user);
      im?.send(im.messageProtocol.WSProtocol_Chat_Message, {
        tribe_id: tribe_id,
        msg: res,
        image_url: image_urls,
      });
    },
    [im, tribe_id],
  );

  const updateChildState = () => {
    // 子组件暴露给父组件的方法
    childRef?.current?.rest();
    // getMsgList({ tribe_id });
  };

  // 消息解析
  const handleNewMsg = useCallback(event => {
    const data = JSON.parse(event.data);
    switch (data.ptl) {
      case IM.MessageProtocol.WSProtocol_Join_Chat:
        //  加入成功
        break;
      case IM.MessageProtocol.WSProtocol_Chat_Message:
        //  发送成功
        updateChildState();
        break;
      default:
        console.debug('unread ws code: ', data);
        break;
    }
  }, []);

  useEffect(() => {
    if (tribe_id && im) {
      JoinChatRoom({ tribe_id });
    }
  }, [tribe_id, im]);

  // 接收消息
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

  return (
    <InputBox>
      <Editor
        cref={childRef}
        type='chatRoom'
        ispadding={false}
        sendArticle={handleSubmit}
      />
    </InputBox>
  );
};
export default SendInput;
