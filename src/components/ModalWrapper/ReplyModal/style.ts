import styled from 'styled-components';
import { Flex, Card, Box } from 'uikit'
export const ModalWrapper = styled(Box)`
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background: rgba(98, 98, 98, 0.3);
  z-index: 99999;
`
export const ModalTitleWrapper = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 35px 35px 0 35px;
  h4{
    font-size: 18px;
    font-family: Alibaba PuHuiTi;
    font-weight: bold;
    color: #FFFFFF;
  }
  .close{
    width: 20px;
    cursor: pointer;
    i {
      color: ${({ theme }) => theme.colors.white_black} !important;
    }
  }

`
export const ReportModalWrapper = styled(Box)`
  width: 668px;
  max-height:500px;
  overflow-y: auto;
  background: ${({ theme }) => theme.colors.backgroundCard};
  border-radius: ${({ theme }) => theme.radii.card};
  position: fixed;
  left: 50%;
  top: 100px;
  margin-left: -334px;
  box-sizing: border-box;
  z-index: 99999;
`

export const ReportContentWrapper = styled(Box)`
  margin-top: 5px;
  padding: 0 20px;
  box-sizing: border-box;
`

export const ReplyTargetWrapper = styled(Box)`
  position: relative;
  &::before{
    left: 27px;
    top: 75px;
    width: 5px;
    height: calc(100% - 75px);
    background: #4D535F;
    border-radius: 3px;
    position: absolute;
    content: '';
    display: block;
  }
`

export const ReplyConentWrapper = styled(Box)`
  display: flex;
  .left{
    width: 60px;
    box-sizing: border-box;
    padding-top: 15px;
    padding-left: -2px;
    .img-box{
      width: 60px;
      height: 60px;
      background-color: #f0f0f0;
      border-radius: 10px;
      overflow: hidden;
      img{
        width: 100%;
        height: 100%;
      }
    }
  }
  .right{
    flex: 1;
    max-width: 580px
  }
`
