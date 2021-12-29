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
    i {
      color: ${({ theme }) => theme.colors.white_black} !important;
    }
  }
`;
export const ReportModalWrapper = styled(Box)`
  width: 40vw;
  max-width: 600px;
  min-width: 88vw;
  ${({ theme }) => theme.mediaQueries.sm} {
    min-width: 300px;
  }
  max-height: 500px;
  background: ${({ theme }) => theme.colors.greyBackground};
  border-radius: ${({ theme }) => theme.radii.card};
  box-sizing: border-box;
`;

export const ReportContentWrapper = styled(Box)`
  margin-top: 5px;
  padding: 0px;
  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 0 20px;
  }
  box-sizing: border-box;
`;

export const ReplyTargetWrapper = styled(Box)`
  position: relative;
  overflow-y: auto;
  max-height: 200px;
  &::before {
    left: 27px;
    top: 70px;
    width: 5px;
    height: calc(100% - 75px);
    background: #000;
    border-radius: 3px;
    position: absolute;
    content: '';
    display: block;
  }
`;

export const ReplyConentWrapper = styled(Box)`
  display: flex;
  .left {
    width: 60px;
    box-sizing: border-box;
    padding-top: 5px;
    /* ${({ theme }) => theme.mediaQueriesSize.marginr} */
  }
  .right {
    flex: 1;
    max-width: calc(100% - 64px);
  }
`;
