import React from 'react';
import styled, { useTheme } from 'styled-components';
import history from 'routerHistory';
import { Flex, Button, Text } from 'uikit';

import { mediaQueriesSize } from 'uikit/theme/base';
import { useTranslation } from 'contexts/Localization';

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
    height: 24px;
    display: inline-block;
    margin-right: 10px;
    margin-top: -4px;
  }
`;

export const WalletHead: React.FC = React.memo(() => {
  const { t } = useTranslation();
  const theme = useTheme();
  const colors = theme.colors.white_black;

  const goBack = () => {
    history.goBack();
  };

  return (
    <Card>
      <Text className="text">我的钱包</Text>
      <Flex alignItems='center'>
        <img src={require('assets/images/myWallet/broadcast.png').default} alt="" />
        <Text mr='10px' fontSize='14px' color='textTips'>
          TIME 社区公平释放活动进行中，当前兑换系数
        </Text>
        <Text mr='30px' fontSize='14px' color='ThemeText'>
          100DSG = 2900,000 TIME
        </Text>
        <Button>兑换</Button>
      </Flex>
    </Card>
  );
});