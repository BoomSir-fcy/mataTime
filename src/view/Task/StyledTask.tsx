
import styled from 'styled-components';
import { Flex, Box } from 'uikit';
import { mediaQueriesSize } from 'uikit/theme/base';

export const TaskTitle = styled(Flex)`
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 57px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderThemeColor};
  ${mediaQueriesSize.paddingxs}
`

