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
`

export const Crumbs = React.memo(() => {
  return (
    <Card>
      <Text fontWeight="bold">主页</Text>
    </Card>
  )
})