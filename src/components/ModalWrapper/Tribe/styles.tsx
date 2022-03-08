import styled from 'styled-components';
import { Box } from 'uikit';

export const Container = styled(Box)`
  width: 100%;
  padding-bottom: 20px;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 410px;
  }
`;

export const MaskInfo = styled(Box)`
  background-color: ${({ theme }) => theme.colors.backgroundTextArea};
  border-radius: ${({ theme }) => theme.radii.card};
  padding: 18px 13px;
`;
