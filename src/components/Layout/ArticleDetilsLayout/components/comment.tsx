import React from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { Avatar, ContentParsing } from 'components';
import { Flex, Box, Text } from 'uikit';
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
  postUid: number;
  data: any;
  delSubCommentCallback: (item: any) => void;
  callback: (item?: any, type?: string) => void;
}> = React.memo(
  ({ firstCommentId, postUid, data, delSubCommentCallback, callback }) => {
    const { t } = useTranslation();

    return (
      <CommentCol width='100%'>
        <Box minWidth='40px' as={Link} to={`/me/profile/${data?.user_id}`}>
          <Avatar uid={data?.user_id} src={data?.user_avator_url} scale='sm' />
        </Box>
        <Box ml='18px' width='100%'>
          <Flex mb='12px' justifyContent='space-between'>
            <Box>
              <Text bold ellipsis>
                {data?.user_name}
              </Text>
              <Text color='textgrey'>
                {dayjs(data?.add_time).format('YYYY-MM-DD HH:mm')}
              </Text>
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
                postUid={postUid}
                user_id={data?.user_id}
                comment_id={data?.id}
                delCallback={() => delSubCommentCallback(data)}
              />
            </Box>
          </Flex>
          <ContentParsing disableParseSquare content={data.comment} />
          <MentionOperator
            type='Comment'
            callback={(data, type) => callback(data, type)}
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
