import React from 'react';
import styled from 'styled-components';
import { Flex, Box } from 'uikit';
import { Crumbs } from 'components';
import { useTranslation } from 'contexts/Localization';

const PageContainer = styled(Box)`
  position: relative;
  background: ${({ theme }) => theme.colors.background};
`;

export const Container = props => {
  const { t } = useTranslation();

  return (
    <PageContainer>
      <Crumbs title={t('homeMenuSet')} />
      {props.children}
    </PageContainer>
  );
};
