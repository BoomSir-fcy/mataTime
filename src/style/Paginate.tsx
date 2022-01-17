import styled from 'styled-components';
import { PancakeTheme, Flex } from 'uikit';

declare module 'styled-components' {
  export interface DefaultTheme extends PancakeTheme {
    main: string;
  }
}

const PaginateStyle = styled(Flex)`
  padding-top: 20px;
  flex-wrap: wrap;
  padding-top: 20px;
  overflow-x: auto;
  .totalPage {
    margin-right: 0;
    margin-bottom: 10px;
    width: 90%;
    ${({ theme }) => theme.mediaQueries.xs} {
      margin-right: 16px;
      margin-bottom: 0;
      width: max-content;
    }
  }
  ul,
  li {
    padding: 0;
    margin: 0;
    list-style: none;
  }
  ul {
    display: flex;
    align-items: center;
    max-width: 84vw;
  }
  li {
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
    a {
      width: 28px;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    &:hover {
      /* border: 1px solid  ${({ theme }) => theme.colors.primaryDark}; */
      background-color: ${({ theme }) => theme.colors.white_black};
      color: ${({ theme }) => theme.colors.background};
    }
    &.disabled {
      cursor: no-drop;
      a {
        cursor: no-drop;
      }
    }
  }
  .selected {
    background-color: ${({ theme }) => theme.colors.white_black};
    border: 1px solid ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.background};
  }
`;

export default PaginateStyle;
