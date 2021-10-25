import styled from 'styled-components';

export const MentionItemWrapper = styled.div`
    .mention-content{
      box-sizing: border-box;
      padding-left: 73px;
      padding-top: 10px;
      p{
        font-size: 18px;
        font-family: Alibaba PuHuiTi;
        font-weight: 400;
          color: #FFFFFF;
        a{
          color: #4168ED;
        }
      }
    }
`

export const MentionItemUserWrapper = styled.div`
  .user-wrapper{
    display: flex;
    align-items: center;
    justify-content: space-between;
    .user-left-wrapper{
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
      .user-info{
        .user-name{
          font-size: 18px;
          font-family: Alibaba PuHuiTi;
          font-weight: bold;
          color: #FFFFFF;
        }
        .time{
          font-size: 14px;
          font-family: Alibaba PuHuiTi;
          font-weight: 400;
          color: #B5B5B5;
        }
      }
    }
    .user-right-wrapper{
      img{
        width: 25px;
        cursor: pointer;
      }
    }
    &.small-user{
      .user-left-wrapper{
        display: flex;
        align-items: center;
        .avatar{
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background-color: #f0f0f0;
          overflow: hidden;
          margin-right: 13px;
          img{
            width: 100%;
            height: 100%;
          }
        }
        .user-info{
          .user-name{
            font-size: 14px;
            font-family: Alibaba PuHuiTi;
            font-weight: bold;
            color: #FFFFFF;
          }
          .time{
            font-size: 14px;
            font-family: Alibaba PuHuiTi;
            font-weight: 400;
            color: #B5B5B5;
          }
        }
      }
    }

  }
`