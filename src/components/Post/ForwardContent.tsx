import React from 'react';
import styled from 'styled-components';
import { Box, Text } from 'uikit';
import { ContentParsing, AvatarCard } from 'components';
import { displayTime } from 'utils';
import { ARTICLE_POST_FORWARD_ROW } from 'config';

import { useTranslation } from 'contexts/Localization';
import { useCommentTranslateMap, usePostTranslateMap } from 'store/mapModule/hooks';

const Content = styled(Box)`
  ${({ theme }) => theme.mediaQueriesSize.absmargin}
  background-color: ${({ theme }) => theme.colors.backgroundCard};
  padding: 25px 20px 25px 64px;
  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 15px 0 15px 79px;
  }
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

const ForwardContent: React.FC<{
  currentUid?: number;
  data: Api.Home.post;
}> = ({ currentUid, data }) => {
  const { t } = useTranslation();
  const translateData = usePostTranslateMap(data.id);
  const translateCommentData = useCommentTranslateMap(data.forward.forward_comment_id);
  const translateForwardData = usePostTranslateMap(data.forward.post_id);

  return (
    <Content>
      {data?.forward?.is_forward_del === 1 ? (
        <Text>{t('The post has been deleted')}</Text>
      ) : (
        <React.Fragment>
          <AvatarCard
            uid={data.forward.user_id}
            address={data.forward.user_address}
            userName={data.forward.user_name}
            avatar={data.forward.user_avator_url}
            time={displayTime(data.forward.add_time)}
            scale='sm'
          />
          <ParseContent>
            <ContentParsing
              rows={ARTICLE_POST_FORWARD_ROW}
              content={
                translateData?.showTranslate
                  ? (data.forward.forward_type === 1 ? translateForwardData?.content : translateCommentData?.content) || data.forward.content
                  : data.forward.content
              }
            />
          </ParseContent>
        </React.Fragment>
      )}
    </Content>
  );
};

export default ForwardContent;
