import { createGlobalStyle } from 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    main: string
  }
}

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'SourceHanSansCN', sans-serif;
  }
  
  body {
    background-color: ${({ theme }) => theme.main};
    img {
      height: auto;
      max-width: 100%;
    }
  }
`

export default GlobalStyle;