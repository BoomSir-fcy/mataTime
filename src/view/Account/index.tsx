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
import { PageSection, Container, Affix } from 'components';

const LeftCard = styled(Flex)`
  width: 200px;
  height: 100vh;
  overflow: auto;
`;
const CenterCard = styled(Box)`
  background: ${({ theme }) => theme.colors.primaryDark};
  width: calc(100vw - 8px);
  overflow: hidden;
  ${({ theme }) => theme.mediaQueries.sm} {
    width:100%;
  }
  /* flex: 1; */
  /* margin: 0 15px; */
  /* border-left: 1px solid ${({ theme }) => theme.colors.borderThemeColor}; */
  /* border-right: 1px solid ${({ theme }) => theme.colors.borderThemeColor}; */
`;

const ContainerStyled = styled(Container)`
  /* background: pink; */
  /* border-top: 1px solid ${({ theme }) => theme.colors.borderThemeColor}; */
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderThemeColor};
  padding-top: 0 !important;
  padding-bottom: 12px !important;
  height: 60px;
`;

const Stake = React.lazy(() => import('./components/Single'));
const TokenAccount = React.lazy(() => import('./components/TokenAccount'));
const Exchange = React.lazy(() => import('./components/ExchangeTime'));
const RewardList = React.lazy(() => import('./components/Reward/list'));
const FAQ = React.lazy(() => import('./components/Faq'));

const Account = props => {
  const { t } = useTranslation();

  return (
    <Box width="100%">
      <CenterCard>
        <Switch>
          <Route
            path={`${props.match.path}`}
            render={() => (
              <>
                <Route
                  path={`${props.match.path}`}
                  exact
                  component={TokenAccount}
                />
                <Route path={`${props.match.path}/time`} component={Exchange} />
                <Route path={`${props.match.path}/stake`} component={Stake} />
                <Route
                  path={`${props.match.path}/reward`}
                  component={RewardList}
                />
                <Route path={`${props.match.path}/faq`} component={FAQ} />
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
    </Box>
  );
};

export default withRouter(Account);
