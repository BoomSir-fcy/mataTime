import styled from 'styled-components';
import { Flex, Button, Box } from 'uikit'
export const ModalWrapper = styled(Box)`
  /* width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0; */
  /* background: rgba(98, 98, 98, 0.3); */
  /* z-index: 99999; */
`
export const ModalTitleWrapper = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  h4{
    font-size: 18px;
    font-family: Alibaba PuHuiTi;
    font-weight: bold;
    color: #FFFFFF;
  }
  .close{
    width: 20px;
  }

`
export const ReportModalWrapper = styled(Box)`
  width: 800px;
  background: #191F2D;
  border-radius: 10px;
  position: fixed;
  left: 50%;
  top: 50%;
  margin-left: -400px;
  margin-top: -150px;
  box-sizing: border-box;
  padding: 35px;
  box-shadow: 0px 0px 2px 1px rgba(180, 200, 169, 0.3);
  z-index: 99999;
`

export const ReportContentWrapper = styled(Box)`
  margin-top: 20px;
  p{
    font-size: 16px;
    font-family: Alibaba PuHuiTi;
    font-weight: 400;
    color: #FFFFFF;
    line-height: 54px;
    box-sizing: border-box;
    padding: 0 12px;
    border-bottom: 1px solid #4D535F;
    cursor: pointer;
    &:last-child{
      border: 0;
    }
  }
`
