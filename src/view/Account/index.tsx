import React, { useState } from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
  withRouter
} from 'react-router-dom';
import { Flex, Box, Text } from 'uikit';
import styled from 'styled-components';
import { useTranslation } from 'contexts/Localization';
import { PageSection, Container, Affix } from 'components'
import { Menu } from './left';
import { WalletHead } from './head';

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

const ContainerStyled = styled(Container)`
  /* background: pink; */
  /* border-top: 1px solid ${({ theme }) => theme.colors.borderThemeColor}; */
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderThemeColor};
  padding-top: 0 !important;
  padding-bottom: 12px !important;
  height: 60px;
`

const Stake = React.lazy(() => import('./components/Single'));
const TokenAccount = React.lazy(() => import('./components/TokenAccount'));

const Account = props => {
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
          <WalletHead />
          <Switch>
            <Route
              path={`${props.match.path}`}
              render={() => (
                <>
                  <Route path={`${props.match.path}`} exact component={TokenAccount} />
                  <Route path={`${props.match.path}/stake`} component={Stake} />
                </>
              )}
            />
          </Switch>
          {/* <Crumbs title={t('homeMenuSet')} />
          <TokenAccount />
          <Box>
            <ContainerStyled>
              <Flex height="100%" alignItems="flex-end">
                <Text fontSize="18px" bold>{t('Account Pools')}</Text>
              </Flex>
            </ContainerStyled>
            <Liquidity />
            <Single />
          </Box> */}
        </CenterCard>
      </Flex>

    </PageSection>
  )
}

export default withRouter(Account);