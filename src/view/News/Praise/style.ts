import styled from 'styled-components';
import { Card } from 'uikit'

export const NewsPraiseWrapper = styled.div`
    width: 100%;
`

export const PraiseItemWrapper = styled(Card)`
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
      color: #B5B5B5;
      line-height: 50px;
      display: flex;
      box-sizing: border-box;
      padding-left: 73px;
      align-items: center;
      i{
        margin-right: 10px !important;
      }
    }
    .comment-content{
      width: calc(100% + 50px);
      background: ${({ theme }) => theme.isDark ? '#2B303F' : '#EAF2FF'};
      box-sizing: border-box;
      padding: 20px 98px;
      margin-left: -25px;
    }
`