import React, { useState } from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
  withRouter,
  Link,
  useLocation
} from 'react-router-dom';
import { Flex, Box, Text } from 'uikit';
import styled from 'styled-components';
import { useTranslation } from 'contexts/Localization';
import useMenuNav from 'hooks/useMenuNav';
import { useStore } from 'store';
import { formatDisplayApr } from 'utils/formatBalance';
import BigNumber from 'bignumber.js';
import { WalletHead } from 'components/HeaderContent';


const CenterCard = styled(Box)`
  background: ${({ theme }) => theme.colors.primaryDark};
  width: calc(100vw - 8px);
  /* overflow: hidden; */
  ${({ theme }) => theme.mediaQueries.sm} {
    width:100%;
  }
`;


const Stake = React.lazy(() => import('./components/Single'));
const TokenAccount = React.lazy(() => import('./components/TokenAccount'));
const Exchange = React.lazy(() => import('./components/ExchangeTime'));
const RewardList = React.lazy(() => import('./components/Reward/list'));
const FAQ = React.lazy(() => import('./components/Faq'));

const Account = props => {
  const { t } = useTranslation();
  const { isPushed, setIsPushed, isMobile } = useMenuNav()
  const CurrentRound = useStore(p => p.wallet.CurrentRound);
  const { pathname } = useLocation();


  const getHeadTitle = () => {
    if (pathname === '/account') return t('Account My Wallet')
    if (pathname === '/account/time') return t('TIME')
    if (pathname === '/account/stake') return t('Stake')
    if (pathname === '/account/reward') return t('rewardAutherWallet')
  }

  return (
    <Box width="100%">
      <CenterCard>
        <WalletHead title={getHeadTitle()}>
          <Flex className={!isMobile ? '' : 'rightBox'} alignItems="center">
            <img
              src={require('assets/images/myWallet/broadcast.png').default}
              alt=""
            />
            <Text mr="10px" fontSize="14px" color="textTips">
              {t(
                'Time Community fair release activities are in progress, the current exchange coefficient is'
              )}
            </Text>
            <Text mr="18px" fontSize="14px" color="textPrimary">
              1 DSG =
              {formatDisplayApr(
                new BigNumber(CurrentRound.max_time_token)
                  .div(CurrentRound.max_dsg_token)
                  .toNumber()
              )}{' '}
              TIME
            </Text>
            <Text
              as={Link}
              to="/account/time"
              mr="10px"
              fontSize="14px"
              color="textPrimary"
            >
              {t('Time Exchange')} {'>'}
            </Text>
          </Flex>
        </WalletHead>
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
      </CenterCard>
    </Box>
  );
};

export default withRouter(Account);
