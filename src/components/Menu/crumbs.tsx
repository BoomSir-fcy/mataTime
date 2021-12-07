import React from 'react';
import styled, { useTheme } from 'styled-components';
import history from 'routerHistory';
import { Flex, Box, Text } from 'uikit';
import { Icon } from 'components';

import { mediaQueriesSize } from 'uikit/theme/base';
import { useTranslation } from 'contexts/Localization';

const Card = styled(Flex)`
  align-items: center;
  width: 100%;
  height: 60px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderThemeColor};
  position: sticky;
  top: 0;
  background: ${({ theme }) => theme.colors.background};
  z-index: 1003;
  ${mediaQueriesSize.paddingxs}
  .text {
    font-size: 18px;
    font-weight: bold;
  }
`;

const CenterBox = styled(Box)`
  position: absolute;
  left: 0;
  right: 0;
  width: 100%;
  text-align: center;
`;

export const Crumbs: React.FC<{
  title?: string;
  centerTitle?: string;
  back?: boolean;
}> = React.memo(({ back, title, centerTitle }) => {
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
          style={{ cursor: 'pointer', position: 'relative', width: '100%' }}
        >
          <Flex alignItems="center">
            <Icon name={'icon-fanhui'} size={20} color={colors} bold />
            <Text className="text" ml="16px">
              {t('newsBack')}
            </Text>
          </Flex>
          {centerTitle && (
            <CenterBox>
              <Text className="text" ml="16px">
                {centerTitle.length > 20 ? centerTitle.slice(0, 20) + '...#' : centerTitle}
              </Text>
            </CenterBox>
          )}
        </Flex>
      )}
    </Card>
  );
});
