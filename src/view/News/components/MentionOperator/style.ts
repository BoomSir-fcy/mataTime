import styled from 'styled-components';
import { Box } from 'uikit';

export const MentionOperatorWrapper = styled(Box)<{ paddingLeft?: number }>`
  width: 100%;
  .mention-operator {
    width: 100%;
    margin-top: 20px;
    ${({ theme }) => theme.mediaQueries.sm} {
      padding-left: ${({ paddingLeft }) =>
        paddingLeft === 0 ? paddingLeft : '64px'};
    }
    .operator-item {
      min-width: 90px;
      ${({ theme }) => theme.mediaQueries.sm} {
        min-width: 120px;
      }
      color: ${({ theme }) => theme.colors.textgrey};
      display: flex;
      align-items: center;
      cursor: pointer;
      &:last-child {
        margin-right: 0;
      }
    }
  }
`;
