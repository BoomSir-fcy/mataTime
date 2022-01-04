import styled from 'styled-components';
import { Box } from 'uikit';

export const MobileShow = styled(Box)`
  display: block;
  ${({ theme }) => theme.mediaQueries.md} {
    display: none;
  }
`;

export const MobileHide = styled(Box)`
  display: none;
  ${({ theme }) => theme.mediaQueries.md} {
    display: block;
    position: sticky;
    top: 100px;
  }
`;
