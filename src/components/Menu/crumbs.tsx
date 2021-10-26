import React from 'react';
import styled from 'styled-components';
import { Box, Text } from 'uikit';

import { mediaQueriesSize } from 'uikit/theme/base';

const Card = styled(Box)`
  width: 100%;
  background: ${({ theme }) => theme.colors.backgroundCard};
  border-radius: ${({ theme }) => theme.radii.card};
  ${mediaQueriesSize.paddingxs}
  ${mediaQueriesSize.marginbsm}
  .text {
    font-size: 18px;
    font-weight: bold;
  }
`

export const Crumbs: React.FC<{
  title?: string
}> = React.memo(({ title }) => {
  return (
    <Card>
      <Text className="text">{title || "首页"}</Text>
    </Card>
  )
})
