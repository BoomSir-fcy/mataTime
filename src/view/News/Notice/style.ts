import styled from 'styled-components';
import { Card } from 'uikit'

export const NoticeWrapper = styled.div`
    width: 100%;
    .notice-content-wrapper{
      width: 100%;
      height: 700px;
      background: #191F2D;
      border-radius: 10px;
    }
`

export const NoticeContentWrapper = styled(Card)`
  width: 100%;
  /* height: 700px; */
`

export const NoticeItemWrapper = styled.div`
    width: 100%;
    box-sizing: border-box;
    padding: 13px 30px;
    cursor: pointer;
    &:hover{
      background: ${({ theme }) => theme.isDark ? '#4D535F' : '#EAF2FF'};
    }
    .notice-wrapper{
      width: 100%;
      display: flex;
      align-items: center;
        .avatar{
          width: 60px;
          height: 60px;
          border-radius: 10px;
          overflow: hidden;
          margin-right: 13px;
          img{
            width: 100%;
            height: 100%;
          }
        }
        .notice-info{
          flex: 1;
          .notice-name{
            display: flex;
            justify-content: space-between;
            align-items: center;
            h3{
              font-size: 18px;
              font-family: Alibaba PuHuiTi;
              font-weight: bold;
              color: ${({ theme }) => theme.isDark ? '#FFFFFF' : '#000000'};
            }
            span{
              font-size: 14px;
              font-family: Alibaba PuHuiTi;
              font-weight: 400;
              color: ${({ theme }) => theme.isDark ? '#B5B5B5' : '#7A83A0'};
            }
          }
          .notice-des{
            font-size: 16px;
            font-family: Alibaba PuHuiTi;
            font-weight: 400;
            color: ${({ theme }) => theme.isDark ? '#B5B5B5' : '#7A83A0'};
            span{
              color: #4168ED;
            }
          }
        }
  }
`