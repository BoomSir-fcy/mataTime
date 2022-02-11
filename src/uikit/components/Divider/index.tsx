import styled from 'styled-components';
import { Box } from '../Box';

export const Divider = styled(Box)`
  background-color: ${({ theme }) => theme.colors.borderThemeColor};
  height: 1px;
`;
