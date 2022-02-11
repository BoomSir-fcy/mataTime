import styled from 'styled-components';

export const MentionOperatorWrapper = styled.div`
  width: 100%;
  .mention-operator {
    width: 100%;
    /* margin-top: 20px; */
    ${({ theme }) => theme.mediaQueries.sm} {
      /* padding-left: 64px; */
    }
    .operator-item {
      min-width: 100px;
      /* ${({ theme }) => theme.mediaQueries.sm} {
        min-width: 120px;
      } */
      color: #b5b5b5;
      display: flex;
      align-items: center;
      cursor: pointer;
      &:last-child {
        margin-right: 0;
      }
    }
  }
`;
