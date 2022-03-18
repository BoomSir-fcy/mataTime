import { Editor } from 'components';
import { useTranslation } from 'contexts';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import React, { useCallback, useRef } from 'react';
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
  sendMsg: ({}) => void;
}> = ({ ...props }) => {
  const { t } = useTranslation();
  const { im, tribe_id, sendMsg } = props;
  const childRef = useRef(null);
  const { account } = useActiveWeb3React();
  const { uid, nft_image, nick_name } = useStore(p => p.loginReducer.userInfo);

  // 发送消息
  const handleSubmit = useCallback(
    (res, image_urls, remind_user, reset) => {
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
          address: account,
          nft_image: nft_image,
          nick_name: nick_name,
        },
      });
      // 重置输入框
      childRef?.current?.rest();
    },
    [im, tribe_id, account],
  );

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
