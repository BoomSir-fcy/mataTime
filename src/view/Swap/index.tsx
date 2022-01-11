import React from 'react';
import styled from 'styled-components';
import { Flex } from 'uikit';
import { default as SwapComponent } from 'components/Sidebar/swap';
import { Crumbs } from 'components';
import { useTranslation } from 'contexts/Localization';
import { mediaQueriesSize } from 'uikit/theme/base';

const Content = styled(Flex)`
  width: 100%;
  ${mediaQueriesSize.paddingxs}
`;

const Swap: React.FC = () => {
  const { t } = useTranslation();
  return (
    <>
      <Crumbs title={t('Swap')} back />
      <Content alignItems='center' justifyContent='center'>
        <SwapComponent width='100%' />
      </Content>
    </>
  );
};

export default Swap;
