import styled from 'styled-components'
import { Box, Flex, Text } from 'uikit'

 export const NavItemStyled = styled(Flex)<{ active?: boolean }>`
  width: 100%;
  height: 40px;
  cursor: pointer;
  vertical-align: middle;
  transition: background 0.3s ;
  background: ${({ active, theme }) => active ? theme.colors.backgroundMenu : 'transparent' };
  &:hover{
    cursor: pointer;
    background: ${({ active, theme }) => theme.colors.backgroundMenu };
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
  height: 13px;
  min-width: 13px;
  border-radius: 5px;
`
