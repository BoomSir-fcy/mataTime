import { CONNECT_WALLET_BODY_CLASS_NAME } from 'config';
import { createGlobalStyle, keyframes } from 'styled-components';
import { PancakeTheme } from 'uikit';

declare module 'styled-components' {
  export interface DefaultTheme extends PancakeTheme {
    main: string;
  }
}

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }

  40% {
    opacity: 0.6;
  }

  100% {
    opacity: 1;
  }
`;

const GlobalStyle = createGlobalStyle`
  /* prettier-ignore */
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed, 
  figure, figcaption, footer, header, hgroup, 
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  /* prettier-ignore */
  article, aside, details, figcaption, figure, 
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  ol,
  ul {
    list-style: disc;
    list-style-position: inside;
  }
  blockquote,
  q {
    quotes: none;
  }
  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: "";
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  [role="button"] {
    cursor: pointer;
  }
  *, *::before, *::after {
    box-sizing: border-box;
  }

   /* Scrollbar */
   ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.textTips}; 
    border-radius: 8px;

  }
  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.background}; 
    /* background: ${({ theme }) => theme.colors.backgroundLight};  */
    /* border-radius: 10px; */
  }

  input, input::-webkit-input-placeholder {
    font-size: 16px;
    font-weight: 400;
    color: #FFFFFF;
  }

  /* Number */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type=number] {
    -moz-appearance: textfield;
  }

  * {
    font-family: Arial, 'SourceHanSansCN', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /* -webkit-overflow-scrolling: touch; */
  }
  /* html, body{
    height: 100%;
  } */
  body {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-tap-highlight-color: transparent;
    background-color: ${({ theme }) => theme.colors.background};
    overflow-y: scroll;
    /* overflow-x: auto; */
    &.ReactModal__Body--open, &.mini-swap-Modal__Body--open, &.${CONNECT_WALLET_BODY_CLASS_NAME}{
      overflow: hidden;
      padding-right: 8px;
    }
    img {
      height: auto;
      max-width: 100%;
    }
    /* &::-webkit-scrollbar {
      display: none;
    } */
    /* 点击图片放大层级 */
    .react-images__positioner{
      z-index:99999;
    }
  }

    /* 背景canvas */
    .particles {
      background-color: ${({ theme }) => theme.colors.primaryDark};
      animation: ${fadeIn};
      animation-duration: 0.5s;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
`;

export default GlobalStyle;
