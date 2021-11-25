import React, { useState } from 'react';
import { Flex, Box } from 'uikit';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'contexts/Localization';
import { PageSection, Crumbs, CommonMenu, Affix } from 'components'
import { Menu } from 'view/Home/left';
import TokenAccount from './components/TokenAccount';
import Liquidity from './components/Liquidity';
import Single from './components/Single';

const LeftCard = styled(Flex)`
  width: 200px;
  height: 100vh;
  overflow: auto;
`;
const CenterCard = styled(Box)`
  flex: 1;
  margin: 0 15px;
  border-left: 1px solid ${({ theme }) => theme.colors.borderThemeColor};
  border-right: 1px solid ${({ theme }) => theme.colors.borderThemeColor};
`;

const Account: React.FC = () => {
  const { t } = useTranslation();

  return (
    <PageSection innerProps={{ paddingTop: '0 !important' }}>
      <Flex justifyContent="space-between" width="100%">
        <LeftCard>
          <Affix offsetTop={100} positionObj={{}}>
            {/* <CommonMenu hideGoBack menu={menuArr} history={history} /> */}
            <Menu />
          </Affix>
        </LeftCard>
        <CenterCard>
          <Crumbs title={t('homeMenuSet')} />
          <TokenAccount />
          {/* <Liquidity /> */}
          <Single />
        </CenterCard>
      </Flex>

    </PageSection>
  )
}

export default Account;