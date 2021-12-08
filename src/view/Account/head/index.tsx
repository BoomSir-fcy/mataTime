import React from 'react';
import styled, { useTheme } from 'styled-components';
import history from 'routerHistory';
import { Flex, Text } from 'uikit';
import { Link } from 'react-router-dom';
import BigNumber from 'bignumber.js'
import { formatDisplayApr } from 'utils/formatBalance';
import { mediaQueriesSize } from 'uikit/theme/base';
import { useTranslation } from 'contexts/Localization';
import { useStore } from 'store';

const Card = styled(Flex)`
  position: fixed;
  top:0;
  z-index: 2;
  align-items: center;
  justify-content: space-between;
  width: 970px;
  height: 70px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderThemeColor};
  background: ${({ theme }) => theme.colors.background};;
  ${mediaQueriesSize.paddingxs}
  .text {
    font-size: 18px;
    font-weight: bold;
  }
  img{
    height: 18px;
    display: inline-block;
    margin-right: 10px;
  }
`;
interface init {
  title: string
}
export const WalletHead: React.FC<init> = React.memo(({ title }) => {
  const { t } = useTranslation();
  const CurrentRound = useStore(p => p.wallet.CurrentRound);

  return (
    <Card>
      <Text className="text">{title}</Text>
      <Flex alignItems='center'>
        <img src={require('assets/images/myWallet/broadcast.png').default} alt="" />
        <Text mr='10px' fontSize='14px' color='textTips'>
          TIME {t('Time Community fair release activities are in progress, the current exchange coefficient is')}
        </Text>
        <Text mr='18px' fontSize='14px' color='textPrimary'>
          1 DSG = {formatDisplayApr(new BigNumber(CurrentRound.max_time_token).div(CurrentRound.max_dsg_token).toNumber())} TIME
        </Text>
        <Text as={Link} to="/account/time" mr='10px' fontSize='14px' color='textPrimary'>{t('Time Exchange')} {'>'}</Text>
      </Flex>
    </Card>
  );
});
