import React from 'react';
import styled from 'styled-components';
import { Card, Box, Text } from 'uikit';
import { useTranslation } from 'contexts/Localization';

const Header = styled(Card)`
  width: 100%;
  height: 60px;
  padding: 0 16px;
  margin-bottom: 13px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CrumbsHead: React.FC<{
  text?: '';
}> = React.memo(({ text, children }) => {
  const { t } = useTranslation();

  return (
    <Header>
      <Text fontWeight="bold" fontSize="18px">
        {text || t('meHome')}
      </Text>
      <Box>{children}</Box>
    </Header>
  );
});
