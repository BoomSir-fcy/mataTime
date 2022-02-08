import React from 'react';
import styled from 'styled-components';
import { useToast } from 'hooks';
import { useStore } from 'store';
import { Flex, Box } from 'uikit';
import {
  Editor,
  ContentParsing,
  Avatar,
  AvatarCard,
  ModalWrapper,
} from 'components';
import { Api } from 'apis';

import { useTranslation } from 'contexts/Localization';
import { mediaQueriesSize } from 'uikit/theme/base';

const Container = styled(Flex)`
  width: 100%;
  min-width: 350px;
  ${({ theme }) => theme.mediaQueries.sm} {
    max-width: 600px;
    width: 600px;
  }
  max-height: 500px;
  background: ${({ theme }) => theme.colors.greyBackground};
  border-radius: ${({ theme }) => theme.radii.card};
  box-sizing: border-box;
  padding-bottom: 20px;
`;

const Content = styled(Box)`
  ${mediaQueriesSize.padding}
  margin-top: 19px;
  background: ${({ theme }) => theme.colors.backgroundTextArea};
  border-radius: ${({ theme }) => theme.radii.card};
`;

const ParseContent = styled(Box)`
  cursor: pointer;
  box-sizing: border-box;
  color: ${({ theme }) => theme.colors.white_black};
  word-wrap: break-word;
  word-break: break-all;
  padding: 8px 0 8px 0;
  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 15px 0 15px 0;
  }
`;

export const ForwardModal: React.FC<{
  type: string;
  visible: boolean;
  data: Api.Home.post;
  close: () => void;
}> = React.memo(({ type, visible, data, close }) => {
  const { t } = useTranslation();
  const { toastSuccess } = useToast();
  const userInfo = useStore(p => p.loginReducer.userInfo);

  const setForward = async (res, imags_list, remind_user, reset) => {
    if (!res) return;
    try {
      Api.HomeApi.setForward({
        forward_type: type === 'post' ? 1 : 2,
        forward_id: data.id,
        forward_content: res,
      }).then(res => {
        if (Api.isSuccess(res)) {
          reset && reset();
          close();
          toastSuccess(t('Repost Successfully'));
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ModalWrapper creactOnUse visible={visible} setVisible={close} top='35%'>
      <Container>
        <Avatar disableFollow src={userInfo.nft_image} scale='sm' />
        <Box margin='0 0 0 17px' style={{ flex: 1 }}>
          <Editor
            ispadding={false}
            type='forward'
            forwardContent={data}
            sendArticle={setForward}
          />
        </Box>
      </Container>
    </ModalWrapper>
  );
});

export const ForwardContent: React.FC<{
  forwardContent: Api.Home.post;
}> = React.memo(({ forwardContent: items }) => {
  return (
    <Content>
      <AvatarCard
        uid={items.user_id}
        address={items.user_address}
        userName={items.user_name}
        avatar={items.user_avator_url}
        scale='sm'
      />
      <ParseContent>
        <ContentParsing content={items.content} />
      </ParseContent>
    </Content>
  );
});
