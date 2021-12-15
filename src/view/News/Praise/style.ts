import styled from 'styled-components';
import { Card } from 'uikit';

export const NewsPraiseWrapper = styled.div`
  width: 100%;
`;

export const PraiseItemWrapper = styled(Card)`
  width: 100%;
  margin-bottom: 15px;
  box-sizing: border-box;
  background: transparent;
  overflow: inherit;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderThemeColor};
  .reply-wrapper {
    font-size: 16px;
    font-weight: 400;
    color: #b5b5b5;
    display: flex;
    box-sizing: border-box;
    padding-left: 73px;
    padding-top: 15px;
    align-items: center;
    i {
      margin-right: 10px !important;
    }
    .reply-tip {
      margin-right: 10px;
    }
  }
  .comment-content {
    background-color: ${({ theme }) => theme.colors.backgroundThemeCard};
    box-sizing: border-box;
    padding: 30px 10px 30px 100px;
    margin-top: 15px;
  }
`;
