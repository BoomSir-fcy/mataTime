import styled from 'styled-components';
import { PancakeTheme, Flex } from 'uikit'

declare module 'styled-components' {
  export interface DefaultTheme extends PancakeTheme {
    main: string
  }
}

const PaginateStyle = styled(Flex)`
ul,li{ padding:0;margin:0;list-style:none}
ul{
  display: flex;
  align-items: center;
}
li{
  width: 28px;
  height: 28px;
  color: ${({ theme }) => theme.colors.white_black};
  border: 1px solid ${({ theme }) => theme.colors.textTips};
  cursor: pointer;
  font-size: 14px;
  border-radius: 5px;
  margin: 0 5px;
  transition: all 0.1s linear;
  display: flex;
  align-items: center;
  justify-content: center;
    a{
      width: 28px;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  &:hover {
  border: 1px solid  ${({ theme }) => theme.colors.backgroundPrimary};
  }
  &.disabled{
    cursor: no-drop;
    a{
    cursor: no-drop;
    }
  }
}
.selected{
  background-color: ${({ theme }) => theme.colors.backgroundPrimary};
  border: 1px solid ${({ theme }) => theme.colors.backgroundPrimary};
}
`

export default PaginateStyle;