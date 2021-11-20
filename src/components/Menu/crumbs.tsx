import React from 'react';
import styled, { useTheme } from 'styled-components';
import history from 'routerHistory';
import { Flex, Box, Text } from 'uikit';
import { Icon } from 'components';

import { mediaQueriesSize } from 'uikit/theme/base';
import { useTranslation } from 'contexts/Localization';

const Card = styled(Box)`
  width: 100%;
  background: ${({ theme }) => theme.colors.backgroundCard};
  border-radius: ${({ theme }) => theme.radii.card};
  ${mediaQueriesSize.paddingxs}
  ${mediaQueriesSize.marginbsm}
  .text {
    font-size: 18px;
    font-weight: bold;
  }
`;

export const Crumbs: React.FC<{
  title?: string;
  back?: boolean;
}> = React.memo(({ back, title }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const colors = theme.colors.white_black;

  const goBack = () => {
    history.goBack();
  };

  return (
    <Card>
      {!back ? (
        <Text className="text">{title || '首页'}</Text>
      ) : (
        <Flex
          onClick={goBack}
          alignItems="center"
          style={{ cursor: 'pointer' }}
        >
          <Icon name={'icon-fanhui'} size={20} color={colors} bold />
          <Text className="text" ml="16px">
            {t('newsBack')}
          </Text>
        </Flex>
      )}
    </Card>
  );
});
