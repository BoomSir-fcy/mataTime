import React, { useState } from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
  withRouter,
  Link,
  useLocation,
} from 'react-router-dom';
import { Flex, Box, Text } from 'uikit';
import styled from 'styled-components';
import { useTranslation } from 'contexts/Localization';
import useMenuNav from 'hooks/useMenuNav';
import { useStore } from 'store';
import { formatDisplayApr } from 'utils/formatBalance';
import BigNumber from 'bignumber.js';
import { Crumbs, Icon } from 'components';
import { useFetTimeInfo } from 'store/wallet/hooks';

const CenterCard = styled(Box)`
  background: ${({ theme }) => theme.colors.background};
  width: calc(100vw - 8px);
  /* overflow: hidden; */
  ${({ theme }) => theme.mediaQueries.sm} {
    width: 100%;
  }
`;
const MobileTips = styled(Flex)`
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderThemeColor};
  padding: 10px 14px;
`;

const Tips = styled.img`
  height: 18px;
  display: inline-block;
  margin-right: 10px;
`;

const Stake = React.lazy(() => import('./components/Single'));
const TokenAccount = React.lazy(() => import('./components/TokenAccount'));
const Exchange = React.lazy(() => import('./components/ExchangeTime'));
const RewardList = React.lazy(() => import('./components/Reward/list'));
const FAQ = React.lazy(() => import('./components/Faq'));
const TribeTicket = React.lazy(() => import('./components/TribeTicket'));

const Account = props => {
  useFetTimeInfo();

  const { t } = useTranslation();
  const { isMobile } = useMenuNav();
  const CurrentRound = useStore(p => p.wallet.CurrentRound);
  const { pathname } = useLocation();
  const activeToken = useStore(p => p.wallet.activeToken);

  const getHeadTitle = () => {
    if (pathname === '/account') {
      if (!Boolean(activeToken)) {
        return t('Account My Wallet');
      }
    }
    if (pathname === '/account/time') return t('TIME');
    if (pathname === '/account/faq') return t('FAQ');
    if (pathname === '/account/stake') return t('TIME Stake');
    if (pathname === '/account/reward') return t('rewardAutherWallet');
    if (pathname === '/account/tribe-ticket') return t('Tribe Ticket');
  };

  return (
    <Box width='100%'>
      <CenterCard>
        <Crumbs title={getHeadTitle()} back={Boolean(activeToken)}>
          {!isMobile && (
            <HeaderTips isMobile={isMobile} t={t} CurrentRound={CurrentRound} />
          )}
        </Crumbs>
        {isMobile && (
          <MobileTips>
            <HeaderTips isMobile={isMobile} t={t} CurrentRound={CurrentRound} />
          </MobileTips>
        )}
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
                  path={`${props.match.path}/tribe-ticket`}
                  component={TribeTicket}
                />
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

const HeaderTips = ({ t, CurrentRound, isMobile }) => {
  return (
    <Flex alignItems='center' flexWrap='wrap'>
      <Flex>
        {/* <Tips
          src={require('assets/images/myWallet/broadcast.png').default}
          alt=''
        /> */}
        <Icon
          name='icon-gonggao'
          size={18}
          margin='0 10px 0 0'
          color='white_black'
        />
        <Text mr='10px' fontSize='14px' color='textTips'>
          {t(
            'Time Community fair release activities are in progress, the current exchange coefficient is',
          )}
        </Text>
      </Flex>
      <Text
        ml={isMobile ? '28px' : ''}
        mr='18px'
        fontSize='14px'
        color='textPrimary'
      >
        1 DSG =
        {formatDisplayApr(
          new BigNumber(CurrentRound.max_time_token)
            .div(CurrentRound.max_dsg_token)
            .toNumber(),
        )}{' '}
        TIME
      </Text>
      <Text
        as={Link}
        to='/account/time'
        mr='10px'
        fontSize='14px'
        color='textPrimary'
      >
        {t('Time Exchange')} {'>'}
      </Text>
    </Flex>
  );
};

export default withRouter(Account);
