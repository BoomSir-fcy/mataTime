import React from 'react';
import classnames from 'classnames';
import styled from 'styled-components';
import { Box, Flex, Button } from 'uikit';

import { mediaQueriesSize } from 'uikit/theme/base';

const Card = styled(Flex)`
  justify-content: space-between;
  background: ${({ theme }) => theme.colors.backgroundCard};
  border-radius: ${({ theme }) => theme.radii.card};
  ${mediaQueriesSize.paddingsm}
  ${mediaQueriesSize.marginbsm}
`

const TabsBox = styled(Flex)`
  .btn_text {
    color: ${({ theme }) => theme.colors.textTips};
  }
  .active {
    font-size: 18px;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.text};
  }
`

export const MenuTabs = React.memo(() => {
  return (
    <Card>
      <TabsBox>
        <Button variant="text" className={classnames("btn_text active")}>全部</Button>
        <Button variant="text" className="btn_text">原创</Button>
        <Button variant="text" className="btn_text">文章</Button>
      </TabsBox>
      <TabsBox>
        <Button>全站最新</Button>
        <Button>热门推荐</Button>
        <Button>仅关注</Button>
      </TabsBox>
    </Card>
  )
})