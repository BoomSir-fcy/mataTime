import styled from 'styled-components';
import { Flex, Button, Box } from 'uikit';
export const PopupWrapper = styled.span`
  position: relative;
`;

export const PopupContentWrapper = styled(Box)`
  width: 300px;
  min-height: 100px;
  /* position: absolute; */
  /* left: 10px; */
  /* top: 22px; */
  background: ${({ theme }) => theme.colors.tertiary};
  box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  box-sizing: border-box;
  padding: 15px;
  /* z-index: 1099; */
  /* overflow: hidden; */
  .content {
    display: flex;
    align-items: center;
    .left-box {
      width: 60px;
      margin-right: 10px;
      .img-box {
        width: 60px;
        height: 60px;
        border-radius: 10px;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .right-box {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      min-width: 0;
      .name {
        font-size: 18px;
        font-weight: bold;
        color: #ffffff;
      }
      .des {
        font-size: 14px;
        font-family: Alibaba PuHuiTi;
        font-weight: 400;
        color: #b5b5b5;
        i {
          font-size: 13px !important;
          margin-right: 8px !important;
        }
      }
      .number {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        max-width: 100%;
        .cloums {
          min-width: 0;
          display: flex;
          color: ${({ theme }) => theme.colors.textTips};
        }
        p {
          font-size: 14px;
          font-weight: 400;
          color: #b5b5b5;
          strong {
            font-size: 16px;
            font-weight: bold;
            margin-left: 12px;
            color: #ffffff;
          }
        }
      }
    }
  }
  .btn {
    display: flex;
    justify-content: center;
    margin-top: 15px;
  }
`;

export const FollowContentWrapper = styled(Box)`
  width: 300px;
  background: ${({ theme }) => theme.colors.tertiary};
  box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  box-sizing: border-box;
  padding: 15px;
  z-index: 1099;
  overflow: hidden;
  .content {
    display: flex;
    align-items: center;
    outline: 0;
    .left-box {
      width: 60px;
      margin-right: 10px;
      .img-box {
        width: 60px;
        height: 60px;
        border-radius: 10px;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .right-box {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      min-width: 0;
      .name {
        font-size: 18px;
        font-weight: bold;
        color: #ffffff;
      }
      .des {
        font-size: 14px;
        font-family: Alibaba PuHuiTi;
        font-weight: 400;
        color: #b5b5b5;
        i {
          font-size: 13px !important;
          margin-right: 8px !important;
        }
      }
      .number {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        max-width: 100%;
        .cloums {
          min-width: 0;
          display: flex;
          color: ${({ theme }) => theme.colors.textTips};
        }
        p {
          font-size: 14px;
          font-weight: 400;
          color: #b5b5b5;
          strong {
            font-size: 16px;
            font-weight: bold;
            margin-left: 12px;
            color: #ffffff;
          }
        }
      }
    }
  }
  .btn {
    display: flex;
    justify-content: center;
    margin-top: 15px;
  }
`;
