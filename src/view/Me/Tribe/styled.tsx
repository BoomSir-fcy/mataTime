import styled from 'styled-components';
import { Box, Flex, Text } from 'uikit';

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
  /* min-width: 600px; */
  .LinkRow {
    /* cursor: pointer; */
  }
`;
export const Row = styled.div<{ columns?: string }>`
  width: 100%;
  display: grid;
  grid-template-columns: ${({ columns }) => columns || '25% 25% 25% 25%'};
  align-items: center;
  min-height: 30px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
`;
export const HeadText = styled(Text)`
  height: 100%;
  padding: 20px 8px;
  ${({ theme }) => theme.mediaQueries.xs} {
    padding: 20px 10px;
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 20px 14px;
  }
  background: ${({ theme }) => theme.colors.backgroundCard};
  color: ${({ theme }) => theme.colors.textTips};
  font-size: 14px;
  &:last-child {
    text-align: right;
  }
`;
export const ItemText = styled(Text)`
  padding: 20px 8px;
  ${({ theme }) => theme.mediaQueries.xs} {
    padding: 20px 10px;
  }
  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 20px 14px;
  }
  font-size: 14px;
  &:first-child {
    margin-right: 10px;
    overflow: hidden;
  }
  &:last-child {
    text-align: right;
  }
  img {
    width: 50px;
    max-height: 50px;
  }
`;
