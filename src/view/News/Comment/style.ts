import styled from 'styled-components';
import { Card } from 'uikit'

export const NewsCommentWrapper = styled.div`
    width: 100%;
`

export const CommentItemWrapper = styled(Card)`
    width: 100%;
    border-radius: 10px;
    margin-bottom: 15px;
    box-sizing: border-box;
    padding: 25px;
    overflow: inherit;
    .reply-wrapper{
      font-size: 16px;
      font-family: Alibaba PuHuiTi;
      font-weight: 400;
      color: ${({ theme }) => theme.colors.white_black};
      line-height: 50px;
      display: flex;
      box-sizing: border-box;
      padding-left: 73px;
      a{
        color: #4168ED;
        margin-left: 10px;
        margin-right: 15px;
      }
      p{
        font-size: 16px;
        color: ${({ theme }) => theme.colors.white_black};
      }
    }
    .comment-content{
      width: calc(100% + 50px);
      background: #2B303F;
      background: ${({ theme }) => theme.isDark ? '#2B303F' : '#EAF2FF'};
      box-sizing: border-box;
      padding: 20px 98px;
      margin-left: -25px;
    }
`