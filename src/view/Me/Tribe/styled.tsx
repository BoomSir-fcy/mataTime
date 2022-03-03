import styled from 'styled-components';
import { Box, Button, Flex, Text } from 'uikit';

export const ContentBox = styled(Box)`
  margin-top: 20px;
  ${({ theme }) => theme.mediaQueriesSize.paddingxs}
`;

export const TableBox = styled(Box)`
  width: 100%;
  overflow: auto;
`;
export const Table = styled(Flex)`
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 300px;
  min-width: 600px;
  .head {
    background: ${({ theme }) => theme.colors.backgroundCard};
  }
`;
export const Row = styled.div<{ border?: boolean }>`
  width: 100%;
  display: grid;
  grid-template-columns: 30% 20% 25% 25%;
  align-items: center;
  ${({ theme }) => theme.mediaQueriesSize.padding};
  ${({ theme, border }) =>
    border && `border-bottom: 1px solid ${theme.colors.borderThemeColor}`};
`;

export const HeadText = styled(Text)`
  color: ${({ theme }) => theme.colors.textTips};
  font-size: 14px;
  &:last-child {
    text-align: right;
  }
`;
export const ItemText = styled(Text)`
  color: ${({ theme }) => theme.colors.white_black};
  font-size: 14px;
  &.tribe-name,
  &.member-nft {
    cursor: pointer;
  }
  &:last-child {
    text-align: right;
  }
`;

export const LoadingAnimation = styled(Box)`
  width: 100%;
`;

export const StyledButton = styled(Button)`
  width: 100px;
`;
