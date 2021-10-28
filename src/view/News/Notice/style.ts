import styled from 'styled-components';

export const NoticeWrapper = styled.div`
    width: 100%;
    .notice-content-wrapper{
      width: 100%;
      height: 700px;
      background: #191F2D;
      border-radius: 10px;
    }
`

export const NoticeItemWrapper = styled.div`
    width: 100%;
    box-sizing: border-box;
    padding: 13px 30px;
    cursor: pointer;
    &:hover{
      background: #4D535F;
    }
    .notice-wrapper{
      width: 100%;
      display: flex;
      align-items: center;
        .avatar{
          width: 60px;
          height: 60px;
          border-radius: 10px;
          background-color: #f0f0f0;
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
              color: #FFFFFF;
            }
            span{
              font-size: 14px;
              font-family: Alibaba PuHuiTi;
              font-weight: 400;
              color: #B5B5B5;
            }
          }
          .notice-des{
            font-size: 16px;
            font-family: Alibaba PuHuiTi;
            font-weight: 400;
            color: #B5B5B5;
            span{
              color: #4168ED;
            }
          }
        }
  }
`