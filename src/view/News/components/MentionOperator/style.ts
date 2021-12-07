import styled from 'styled-components';

export const MentionOperatorWrapper = styled.div`
  width: 100%;
  .mention-operator {
    width: 100%;
    margin-top: 10px;
    padding-left: 73px;
    .operator-item {
      color: #b5b5b5;
      display: flex;
      align-items: center;
      cursor: pointer;
      margin-right: 78px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
`;
