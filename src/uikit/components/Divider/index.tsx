import styled from 'styled-components';
import { Box } from '../Box';

export const Divider = styled(Box)<{ color?: string }>`
  background-color: ${({ theme, color }) =>
    (theme.colors[color] || color) ?? theme.colors.borderThemeColor};
  height: 1px;
`;
