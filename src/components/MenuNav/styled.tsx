import styled from 'styled-components'
import { Box, Flex, Text } from 'uikit'

export const NavItemStyled = styled(Flex) <{ isactive?: number }>`
  align-items: center;
  width: 100%;
  height: 40px;
  cursor: pointer;
  vertical-align: middle;
  transition: background 0.3s ;
  background: ${({ isactive, theme }) => isactive ? theme.colors.backgroundMenu : 'transparent'};
  &:hover{
    cursor: pointer;
    background: ${({ theme }) => theme.colors.backgroundMenu};
  }
`

export const IconBox = styled(Box)`
  position: relative;
  width: 24px;
  /* height: 24px; */
`
export const Badge = styled(Text)`
  position: absolute;
  background: ${({ theme }) => theme.colors.textOrigin};
  height: 14px;
  min-width: 18px;
  max-width: 26px;
  border-radius: 5px;
  padding: 0 1px;
  top: -6px;
  right: -8px;
  font-size: 12px;
  line-height: 12px;
  display: block;
  text-align: center;
`
