import styled from 'styled-components';
import { Box } from 'uikit';

export const ModalWrapper = styled(Box)`
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background: rgba(98, 98, 98, 0.3);
  z-index: 9998;
`;
export const ModalTitleWrapper = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  h4 {
    font-size: 18px;
    font-family: Alibaba PuHuiTi;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.white_black};
  }
  .close {
    width: 20px;
    i {
      color: ${({ theme }) => theme.colors.white_black} !important;
    }
  }
`;
export const ReportModalWrapper = styled(Box)`
  max-width: 500px;
  width: 88vw;
  ${({ theme }) => theme.mediaQueries.sm} {
    width: 40vw;
  }
`;

export const ReportContentWrapper = styled(Box)`
  margin-top: 20px;
  p {
    font-size: 16px;
    font-family: Alibaba PuHuiTi;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.white_black};
    line-height: 54px;
    box-sizing: border-box;
    padding: 0 12px;
    border-bottom: 1px solid #4d535f;
    cursor: pointer;
    &:last-child {
      border: 0;
    }
  }
`;

export const ModalContent = styled(Box)`
  margin-top: 20px;
  textarea {
    background: ${({ theme }) => theme.colors.backgroundTextArea};
    width: 100%;
    height: 210px;
    margin: 5px 0 15px;
    color: ${({ theme }) => theme.colors.textTips};
    padding: 15px;
    border-radius: ${({ theme }) => theme.radii.card};
    border: none;
    outline: none;
    resize: none;
  }
  button {
    width: 150px;
  }
`;
