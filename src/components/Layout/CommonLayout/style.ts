import { Box } from 'uikit';
import styled from 'styled-components';

export const CommonLayoutWrapper = styled(Box)`
    width: 100%;
    height: 100%;
`

export const LayoutContentWrapper = styled(Box)`
    width: 1200px;
    display: flex;
    justify-content: center;
    padding-top: 35px;
    margin: 0 auto;
`

export const LayoutLeftWrapper = styled(Box)`
    width: 200px;
    height: 100vh;
    overflow: auto;
`
export const LayoutMiddleWrapper = styled(Box)`
    width: 670px;
    margin-left: 15px;
    margin-right: 15px;
`
export const LayoutRightWrapper = styled(Box)`
  width: 300px;
  height: 100vh;
  position: relative;
  overflow: auto;
`