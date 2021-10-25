import styled from 'styled-components';

export const MentionItemWrapper = styled.div`
    width: 100%;
    background: #191F2D;
    border-radius: 10px;
    margin-bottom: 15px;
    box-sizing: border-box;
    padding: 25px;
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

    }
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
    .mention-option{
      width: 100%;
      margin-top: 30px;
      padding-left: 73px;
      box-sizing: border-box;
      display: flex;
      .option-item{
        font-size: 16px;
        font-family: Alibaba PuHuiTi;
        font-weight: 400;
        color: #B5B5B5;
        display: flex;
        align-items: center;
        margin-right: 75px;
        cursor: pointer;
        img{
          width: 20px;
          margin-right: 10px;
        }
      }
    }
`