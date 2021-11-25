import React from 'react';
import styled from 'styled-components';
import { Card, Box, Text } from 'uikit';
import { useTranslation } from 'contexts/Localization';
import { mediaQueriesSize } from 'uikit/theme/base';

const Header = styled(Card)`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderThemeColor};
  ${mediaQueriesSize.paddingxs}
`;

export const CrumbsHead: React.FC<{
  text?: '';
}> = React.memo(({ text, children }) => {
  const { t } = useTranslation();

  return (
    <Header isBoxShadow>
      <Text fontWeight="bold" fontSize="18px">
        {text || t('meHome')}
      </Text>
      <Box>{children}</Box>
    </Header>
  );
});
