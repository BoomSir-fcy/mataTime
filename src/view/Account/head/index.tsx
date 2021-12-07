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
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 70px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderThemeColor};
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
          TIME 社区公平释放活动进行中，当前兑换系数
        </Text>
        <Text mr='18px' fontSize='14px' color='textPrimary'>
          1 DSG = {formatDisplayApr(new BigNumber(CurrentRound.max_time_token).div(CurrentRound.max_dsg_token).toNumber())} TIME
        </Text>
        <Text as={Link} to="/account/time" mr='10px' fontSize='14px' color='textPrimary'>兑换 {'>'}</Text>
      </Flex>
    </Card>
  );
});
