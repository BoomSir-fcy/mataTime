import React from 'react';
import styled from 'styled-components';
import { Flex, Text } from 'uikit';
import { Icon } from 'components';

import { useTranslation } from 'contexts/Localization';

const ForwardTag = styled(Flex)`
  padding: 0 0 10px 64px;
`;

const ForwardHead: React.FC<{
  data: Api.Home.post;
}> = React.memo(({ data }) => {
  const { t } = useTranslation();

  return (
    <ForwardTag>
      <Icon name='icon-retweet' margin='0 10px 0 0' color='textTips' />
      <Text fontSize='14px' color='textTips'>
        {t('user Quote Posts', { value: data.forwardUser })}
      </Text>
    </ForwardTag>
  );
});

export default ForwardHead;
