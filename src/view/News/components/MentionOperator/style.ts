import styled from 'styled-components';

export const MentionOperatorWrapper = styled.div`
  width: 100%;
  .mention-operator {
    width: 100%;
    margin-top: 10px;
    ${({ theme }) => theme.mediaQueries.sm} {
      padding-left: 73px;
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
