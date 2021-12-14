import styled from 'styled-components';
import { Card } from 'uikit';

export const NewsCommentWrapper = styled.div`
  width: 100%;
`;

export const CommentItemWrapper = styled(Card)`
  width: 100%;
  box-sizing: border-box;
  padding: 25px;
  overflow: inherit;
  background: transparent;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderThemeColor};
  .reply-wrapper {
    font-size: 16px;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.white_black};
    line-height: 50px;
    display: flex;
    box-sizing: border-box;
    padding-left: 73px;
    a {
      color: #4168ed;
      margin-left: 10px;
      margin-right: 15px;
    }
    p {
      font-size: 16px;
      color: ${({ theme }) => theme.colors.white_black};
    }
  }
  .comment-content {
    width: calc(100% + 50px);
    background-color: ${({ theme }) => theme.colors.backgroundThemeCard};
    box-sizing: border-box;
    padding: 20px 98px;
    margin-left: -25px;
  }
`;
