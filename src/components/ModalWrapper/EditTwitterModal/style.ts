import styled from 'styled-components';
import { Flex, Card, Box } from 'uikit';
export const ModalWrapper = styled(Box)`
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background: rgba(98, 98, 98, 0.3);
  z-index: 99999;
`;
export const ModalTitleWrapper = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 35px 35px 0 35px;
  h4 {
    font-size: 18px;
    font-family: Alibaba PuHuiTi;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.text};
  }
  .close {
    width: 20px;
    cursor: pointer;
  }
`;
export const ReportModalWrapper = styled(Box)`
  width: 800px;
  background: #191f2d;
  border-radius: 10px;
  position: fixed;
  left: 50%;
  top: 50%;
  margin-left: -400px;
  margin-top: -150px;
  box-sizing: border-box;
`;

export const ReportContentWrapper = styled(Box)`
  margin-top: 5px;
  padding: 0 10px;
  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 0 20px;
  }
  box-sizing: border-box;
  p {
    font-size: 16px;
    font-family: Alibaba PuHuiTi;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.text};
    line-height: 54px;
    box-sizing: border-box;
    padding: 0 12px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
    cursor: pointer;
    &:last-child {
      border: 0;
    }
  }
`;
