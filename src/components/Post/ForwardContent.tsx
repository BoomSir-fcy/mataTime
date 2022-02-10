import React from 'react';
import styled from 'styled-components';
import { Box, Text } from 'uikit';
import { ContentParsing, AvatarCard } from 'components';
import { displayTime } from 'utils';

import { useTranslation } from 'contexts/Localization';

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
  data: Api.Home.post;
}> = ({ data }) => {
  const { t } = useTranslation();

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
            <ContentParsing content={data.forward.content} />
          </ParseContent>
        </React.Fragment>
      )}
    </Content>
  );
};

export default ForwardContent;
