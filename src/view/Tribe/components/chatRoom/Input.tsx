import { Editor } from 'components';
import { useTranslation } from 'contexts';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import React, { useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Flex, Input, Button, Card, Box } from 'uikit';
import { useStore } from 'store';

const InputBox = styled(Box)`
  padding: 12px 16px;
  border-top: 1px solid ${({ theme }) => theme.colors.borderThemeColor};
`;

const SendInput: React.FC<{
  tribe_id: number;
  im: any;
  UserInfo: {
    uid: number;
    nick_name: string;
  };
  setUserInfo: (obj) => void;
  sendMsg: ({}) => void;
}> = ({ ...props }) => {
  const { t } = useTranslation();
  const { im, tribe_id, sendMsg, UserInfo, setUserInfo } = props;
  const childRef = useRef(null);
  const { uid, nft_image, nick_name, address } = useStore(
    p => p.loginReducer.userInfo,
  );

  // 发送消息
  const handleSubmit = useCallback(
    (res, image_urls, remind_user, reset) => {
      // const context = Array.isArray(JSON.parse(res)) ? JSON.parse(res) : [];
      // console.log(context);
      // //空|空格|换行
      // if(test.match(/^\s*$/)){
      //   console.log("all space or \\n or empty")
      // }
      console.log(res);

      if (res !== '[]' && image_urls.length) {
        im?.send(im.messageProtocol.WSProtocol_Chat_Message, {
          tribe_id: tribe_id,
          msg: res,
          image_url: [],
        });
        sendMsg({
          create_time: new Date().getTime() * 1000,
          image_url: [],
          message: res,
          sender: uid,
          sender_detail: {
            address: address,
            nft_image: nft_image,
            nick_name: nick_name,
          },
        });
        setTimeout(() => {
          im?.send(im.messageProtocol.WSProtocol_Chat_Message, {
            tribe_id: tribe_id,
            msg: '[]',
            image_url: image_urls,
          });
          sendMsg({
            create_time: new Date().getTime() * 1000,
            image_url: image_urls,
            message: '[]',
            sender: uid,
            sender_detail: {
              address: address,
              nft_image: nft_image,
              nick_name: nick_name,
            },
          });
        }, 10);
        childRef?.current?.rest();
        return;
      }
      im?.send(im.messageProtocol.WSProtocol_Chat_Message, {
        tribe_id: tribe_id,
        msg: res,
        image_url: image_urls,
      });
      sendMsg({
        create_time: new Date().getTime() * 1000,
        image_url: image_urls,
        message: res,
        sender: uid,
        sender_detail: {
          address: address,
          nft_image: nft_image,
          nick_name: nick_name,
        },
      });
      // 重置输入框
      childRef?.current?.rest();
    },
    [im, tribe_id, uid, nft_image, nick_name, address],
  );

  useEffect(() => {
    if (UserInfo.uid) {
      childRef?.current?.CircleUser(UserInfo.uid, UserInfo.nick_name);
      setUserInfo({ uid: null, nick_name: '' });
    }
  }, [UserInfo, setUserInfo]);

  return (
    <InputBox>
      <Editor
        cref={childRef}
        type='chatRoom'
        ispadding={false}
        sendArticle={handleSubmit}
        tribeId={tribe_id}
      />
    </InputBox>
  );
};
export default SendInput;
