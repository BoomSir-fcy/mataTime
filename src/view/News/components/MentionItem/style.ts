import styled from 'styled-components';
import { Button } from 'uikit';

export const FollowBtn = styled(Button)`
  margin-right: 15px;
  font-size: 14px;
  font-weight: bold;
`;
export const MentionItemWrapper = styled.div`
  .mention-content {
    cursor: pointer;
    box-sizing: border-box;
    color: ${({ theme }) => theme.colors.white_black};
    word-wrap: break-word;
    word-break: break-all;
    padding: 8px 0 8px 64px;
    ${({ theme }) => theme.mediaQueries.sm} {
      padding: 15px 0 15px 64px;
    }
  }
`;
export const MentionItemUserWrapper = styled.div`
  .user-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .user-left-wrapper {
      display: flex;
      align-items: center;
      .avatar {
        margin-right: 14px;
      }
      .user-info {
        display: flex;
        align-items: center;
        .user-name {
          font-size: 18px;
          font-weight: bold;
          max-width: 210px;
          ${({ theme }) => theme.mediaQueries.xs} {
            max-width: 350px;
          }
          ${({ theme }) => theme.mediaQueries.sm} {
            max-width: max-content;
          }
        }
        .time {
          margin-top: 5px;
          font-size: 14px;
          span {
            margin-right: 20px;
          }
        }
        .topic {
          display: flex;
          align-items: center;
          margin-left: 27px;
          padding: 0 10px;
          height: 35px;
          font-size: 14px;
          border: 2px solid ${({ theme }) => theme.colors.backgroundPrimary};
          border-radius: 10px;
          color: ${({ theme }) => theme.colors.text};
        }
      }
    }
    .user-right-wrapper {
      display: flex;
      align-items: center;
      img {
        width: 20px;
        cursor: pointer;
      }
    }
    &.small-user {
      .user-left-wrapper {
        display: flex;
        align-items: center;
        .avatar {
          width: 40px;
          height: 40px;
          /* border-radius: 10px; */
          overflow: hidden;
          margin-right: 13px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .user-info {
          display: flex;
          align-items: center;
          .topic {
            display: flex;
            align-items: center;
            margin-left: 27px;
            padding: 0 10px;
            height: 35px;
            font-size: 14px;
            border: 2px solid ${({ theme }) => theme.colors.backgroundPrimary};
            border-radius: 10px;
          }
          .user-name {
            font-size: 14px;
            font-weight: bold;
          }
          .time {
            margin-top: 5px;
            font-size: 14px;
            font-weight: 400;
            color: ${({ theme }) => theme.colors.textgrey};
            span {
              margin-right: 20px;
            }
          }
        }
      }
      .user-right-wrapper {
        display: flex;
        align-items: center;
        img {
          width: 20px;
          cursor: pointer;
        }
      }
    }
    .mention-content {
      box-sizing: border-box;
      padding-left: 73px;
      padding-top: 10px;
      p {
        font-size: 18px;
        font-family: Alibaba PuHuiTi;
        font-weight: 400;
        a {
          color: #4168ed;
        }
      }
    }
    .mention-option {
      width: 100%;
      margin-top: 30px;
      padding-left: 73px;
      box-sizing: border-box;
      display: flex;
      .option-item {
        font-size: 16px;
        font-family: Alibaba PuHuiTi;
        font-weight: 400;
        color: ${({ theme }) => theme.colors.textgrey};
        display: flex;
        align-items: center;
        margin-right: 75px;
        cursor: pointer;
        img {
          width: 20px;
          margin-right: 10px;
        }
      }
    }
  }
`;
