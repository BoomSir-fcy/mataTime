import styled from 'styled-components';
import { Flex, Button, Box } from 'uikit';
export const PopupWrapper = styled.span`
  position: relative;
`;

export const PopupContentWrapper = styled(Box)`
  width: 300px;
  min-height: 100px;
  position: absolute;
  left: 10px;
  top: 22px;
  background: #4d535f;
  box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  box-sizing: border-box;
  padding: 15px;
  z-index: 1099;
  overflow: hidden;
  .content {
    display: flex;
    align-items: center;
    .left-box {
      width: 60px;
      margin-right: 15px;
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
      .name {
        font-size: 18px;
        font-family: Alibaba PuHuiTi;
        font-weight: bold;
        color: #ffffff;
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        line-clamp: 1;
        -webkit-box-orient: vertical;
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
        align-items: center;
        p {
          font-size: 14px;
          font-family: Alibaba PuHuiTi;
          font-weight: 400;
          color: #b5b5b5;
          &:first-child {
            margin-right: 35px;
          }
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
