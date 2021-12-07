import React from 'react';
import styled from 'styled-components';
import { Flex, Box } from 'uikit';
import { WalletHead } from '../../head';
import { Tabs } from './tabs';
import { TableList } from './table';

import { mediaQueriesSize } from 'uikit/theme/base';

const Title = styled(Flex)`
  align-items: center;
  height: 60px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderThemeColor};
  font-size: 18px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.white_black};
  ${mediaQueriesSize.paddingxs}
`;

const RewardList = () => {
  return (
    <React.Fragment>
      <WalletHead title="我的钱包" />
      <Tabs />
      <Box>
        <Title>获得打赏记录</Title>
        <TableList />
      </Box>
    </React.Fragment>
  );
};

export default RewardList;
