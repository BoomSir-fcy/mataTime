import React from 'react';
import { Avatar, ContentParsing } from 'components';
import { Flex, Box, Text } from 'uikit';
import { relativeTime } from 'utils';
import { useTranslation } from 'contexts/Localization';

import MentionOperator from 'view/News/components/MentionOperator';

export const Commnet: React.FC<{
  firstCommentId: number;
  data: any;
}> = React.memo(({ firstCommentId, data }) => {
  const { t } = useTranslation();

  return (
    <Flex>
      <Avatar uid={data?.user_id} src={data?.user_avator_url} scale='sm' />
      <Box ml='18px'>
        <Box mb='12px'>
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
        <ContentParsing disableParseSquare content={data.comment} />
        <MentionOperator
          type='Comment'
          callback={(data, type) => {}}
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
    </Flex>
  );
});
