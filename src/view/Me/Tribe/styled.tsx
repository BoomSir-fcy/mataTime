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
  min-width: 320px;
  .head {
    background: ${({ theme }) => theme.colors.backgroundCard};
  }
`;
export const Row = styled.div<{ border?: boolean }>`
  width: 100%;
  display: grid;
  grid-template-columns: 27% 20% 23% 30%;
  align-items: center;
  /* ${({ theme }) => theme.mediaQueriesSize.paddingxs}; */
  ${({ theme }) => theme.mediaQueries.xxs} {
    padding: 8px 8px;
  }
  ${({ theme }) => theme.mediaQueries.xs} {
    padding: 8px 10px;
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 8px 14px;
  }
  ${({ theme }) => theme.mediaQueries.lg} {
    padding: 16px 14px;
  }
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
  &.tribe-name {
    cursor: pointer;
  }
  &.member-nft {
    margin-left: 0px;
    cursor: pointer;
    ${({ theme }) => theme.mediaQueries.md} {
      margin-left: 10px;
    }
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
  max-width: 100px;
`;

export const MyTribeHeaderFlex = styled(Flex)`
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 8px;
  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
    align-items: center;
  }
`;

export const MyTribeActionFlex = styled(Flex)`
  width: 100%;
  margin-top: 30px;
  flex-direction: row;
  justify-content: space-between;
  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: column;
    width: auto;
    margin-top: 0px;
  }
`;

export const MemberActionFlex = styled(Flex)`
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  .stake-button {
    margin-bottom: 8px;
    ${({ theme }) => theme.mediaQueries.md} {
      margin-right: 8px;
      margin-bottom: 0px;
    }
  }
  ${({ theme }) => theme.mediaQueries.md} {
    flex-direction: row;
  }
`;
