import React from 'react';
import { Avatar, ContentParsing } from 'components';
import { Flex, Box, Text } from 'uikit';
import { relativeTime } from 'utils';

import MentionOperator from 'view/News/components/MentionOperator';

export const Commnet: React.FC<{
  data: any;
}> = React.memo(({ data }) => {
  console.log(data);
  return (
    <Flex>
      <Avatar uid={data?.user_id} src={data?.user_avator_url} scale='sm' />
      <Box ml='18px'>
        <Box mb='12px'>
          <Text bold ellipsis>
            {data?.user_name}
          </Text>
          <Text color='textgrey'>{relativeTime(data?.add_time)}</Text>
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
          paddingLeft={0}
        />
      </Box>
    </Flex>
  );
});
