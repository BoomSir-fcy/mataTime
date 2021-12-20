import React from 'react';
import { ModalWrapper } from 'components';
import { Flex, Text, Button, Box } from 'uikit';
import styled from 'styled-components';

const Content = styled(Box)`
  padding: 15px 20px;
  margin-bottom: 20px;
  border-radius: 10px;
`
const InviteModal: React.FC<{
  title: string,
  showTip?: boolean,
  visible?: boolean,
  setVisible?: () => void
}> = ({ title, showTip, visible, setVisible }) => {
  return (
    <ModalWrapper
      title={title}
      creactOnUse
      visible={visible}
      setVisible={setVisible}
    >
      <Flex>
        <Content>
          谁获得了你的特别邀请，就意味着获得了一个免
          费的绘画板NFT，可以创造一个无聊猴头像，自
          由地登录Metatime。
        </Content>
        {
          showTip && <Text mb="20px" color="textOrigin" small> *NFT被领取后无法撤回 </Text>
        }
        <Button>Copy Link</Button>
      </Flex>
    </ModalWrapper >
  );
}

export default InviteModal;