import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Avatar, ContentParsing } from 'components';
import { Flex, Box, Text } from 'uikit';
import { relativeTime } from 'utils';
import { useTranslation } from 'contexts/Localization';

import MentionOperator from 'view/News/components/MentionOperator';

import { SubCommentAction } from './commentAction';

const CommentCol = styled(Flex)`
  .aciton {
    opacity: 0;
  }
  &:hover {
    .aciton {
      opacity: 1;
    }
  }
`;

export const Commnet: React.FC<{
  firstCommentId: number;
  firstUid: number;
  data: any;
  delSubCommentCallback: (item: any) => void;
  callback: (item?: any) => void;
}> = React.memo(
  ({ firstCommentId, firstUid, data, delSubCommentCallback, callback }) => {
    const { t } = useTranslation();

    return (
      <CommentCol width='100%'>
        <Box as={Link} to={`/me/profile/${data?.user_id}`}>
          <Avatar uid={data?.user_id} src={data?.user_avator_url} scale='sm' />
        </Box>
        <Box ml='18px' width='100%'>
          <Flex mb='12px' justifyContent='space-between'>
            <Box>
              <Text bold ellipsis>
                {data?.user_name}
              </Text>
              <Text color='textgrey'>{relativeTime(data?.add_time)}</Text>
              {firstCommentId !== data.comment_id && data.comment_user_name && (
                <Flex>
                  <Text color='textgrey'>{t('reply')}</Text>
                  <Text ml='5px' color='ThemeText'>
                    @{data.comment_user_name}
                  </Text>
                </Flex>
              )}
            </Box>
            <Box className='aciton'>
              <SubCommentAction
                firstUid={firstUid}
                user_id={data?.user_id}
                comment_id={data?.id}
                delCallback={() => delSubCommentCallback(data)}
              />
            </Box>
          </Flex>
          <ContentParsing disableParseSquare content={data.comment} />
          <MentionOperator
            type='Comment'
            callback={data => callback(data)}
            itemData={{
              ...data,
              comment: {
                ...data,
                content: data.comment,
              },
            }}
            postId={data.pid}
            commentId={data.id}
            firstCommentId={firstCommentId}
            paddingLeft={0}
          />
        </Box>
      </CommentCol>
    );
  },
);
