import styled from 'styled-components';
import { Flex, Button, Box, Card } from 'uikit'
export const PopupWrapper = styled.span`
  position: relative;
`

export const PopupContentWrapper = styled(Box)`
  width: 180px;
  position: absolute;
  z-index:99999;
  right: 0;
  top: 25px;
  background: ${({ theme }) => theme.colors.tertiary};
  box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  box-sizing: border-box;
  padding: 10px 30px;
  p{
    font-size: 14px;
    font-family: Alibaba PuHuiTi;
    font-weight: 400;
    color: #FFFFFF;
    line-height: 36px;
    cursor: pointer;
  }
`