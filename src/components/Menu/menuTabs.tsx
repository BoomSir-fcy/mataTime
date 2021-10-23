import React from 'react';
import classnames from 'classnames';
import styled from 'styled-components';
import { Flex, Button, Card } from 'uikit';

import { mediaQueriesSize } from 'uikit/theme/base';

const CardWarpper = styled(Card)`
  ${mediaQueriesSize.paddingsm}
  ${mediaQueriesSize.marginbsm}
`

const TabsBox = styled(Flex)`
  &.btn {
    button {
      margin-left: 11px;
    }
  }
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
    <CardWarpper>
      <Flex justifyContent="space-between">
        <TabsBox>
          <Button variant="text" className={classnames("btn_text active")}>全部</Button>
          <Button variant="text" className="btn_text">原创</Button>
          <Button variant="text" className="btn_text">文章</Button>
        </TabsBox>
        <TabsBox className="btn">
          <Button variant="tertiary">全站最新</Button>
          <Button>热门推荐</Button>
          <Button>仅关注</Button>
        </TabsBox>
      </Flex>
    </CardWarpper>
  )
})