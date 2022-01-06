import { CONNECT_WALLET_BODY_CLASS_NAME } from 'config';
import { createGlobalStyle } from 'styled-components';
import { PancakeTheme } from 'uikit';
import { mediaQueries } from 'uikit/theme/base';

declare module 'styled-components' {
  export interface DefaultTheme extends PancakeTheme {
    main: string;
  }
}

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
  input[type=search]{
    -webkit-appearance:none;
  }
  input[type=search]::-webkit-search-cancel-button {
    display: none;
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

  @font-face {
    font-family: "iconfont"; /* Project id 2883938 */
    src: url('/font/iconfont.woff2?t=1641352466279') format('woff2'),
        url('/font/iconfont.woff?t=1641352466279') format('woff'),
        url('/font/iconfont.ttf?t=1641352466279') format('truetype');
  }

  .iconfont {
    font-family: "iconfont" !important;
    font-size: 18px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .icon-pingbi2:before {
    content: "\\e693";
  }

  .icon-changyonggoupiaorenshanchu:before {
    content: "\\e645";
  }

  .icon-tousu:before {
    content: "\\e6a9";
  }

  .icon-suo:before {
    content: "\\e62c";
  }

  .icon-jiantou:before {
    content: "\\e62b";
  }

  .icon-fenxiang:before {
    content: "\\e63f";
  }

  .icon-zhifeiji:before {
    content: "\\e6a0";
  }

  .icon-zhifeiji1:before {
    content: "\\e6e8";
  }

  .icon-fuzhi:before {
    content: "\\e8b0";
  }

  .icon-wancheng:before {
    content: "\\e66e";
  }

  .icon-complete:before {
    content: "\\e61f";
  }

  .icon-LOGO3:before {
    content: "\\e60d";
  }

  .icon-duihuan:before {
    content: "\\e60c";
  }

  .icon-flag:before {
    content: "\\e63e";
  }

  .icon-qiehuan:before {
    content: "\\e62a";
  }

  .icon-qizi:before {
    content: "\\e8cd";
  }

  .icon-a-qianbao1:before {
    content: "\\e606";
  }

  .icon-qianbao2:before {
    content: "\\e600";
  }

  .icon-shezhi1:before {
    content: "\\e629";
  }

  .icon-shezhi:before {
    content: "\\e627";
  }

  .icon-tixing1:before {
    content: "\\e605";
  }

  .icon-tixing:before {
    content: "\\e626";
  }

  .icon-youxiang11:before {
    content: "\\e624";
  }

  .icon-youxiang:before {
    content: "\\e60f";
  }

  .icon-miaobiao:before {
    content: "\\e633";
  }

  .icon-purse1S:before {
    content: "\\e68a";
  }

  .icon-NFTkapai1:before {
    content: "\\e623";
  }

  .icon-NFTkapai:before {
    content: "\\e621";
  }

  .icon-xiaofangshuixiang_shuichi:before {
    content: "\\e6b5";
  }

  .icon-shuichi:before {
    content: "\\e8bd";
  }

  .icon-shalou:before {
    content: "\\e6b6";
  }

  .icon-xianshi_tishi:before {
    content: "\\e622";
  }

  .icon-lishi:before {
    content: "\\e620";
  }

  .icon-zongshouyi:before {
    content: "\\e631";
  }

  .icon-gerenzhongxin-rongyu-rongyu:before {
    content: "\\e628";
  }

  .icon-rongyubiaozhang:before {
    content: "\\e61e";
  }

  .icon-fanhui1:before {
    content: "\\e63b";
  }

  .icon-yanjing:before {
    content: "\\e68c";
  }

  .icon-leijishouyi:before {
    content: "\\e62e";
  }

  .icon-jian1:before {
    content: "\\e6d4";
  }

  .icon-jia:before {
    content: "\\e6d5";
  }

  .icon-fenxiang_2:before {
    content: "\\e61d";
  }

  .icon-gonggao:before {
    content: "\\e630";
  }

  .icon-dashang:before {
    content: "\\e61c";
  }

  .icon-w59:before {
    content: "\\e7de";
  }

  .icon-dizhi:before {
    content: "\\e6a4";
  }

  .icon-sousuo:before {
    content: "\\e8b9";
  }

  .icon-guanbi1:before {
    content: "\\e61b";
  }

  .icon-guanbi2fill:before {
    content: "\\e724";
  }

  .icon-jian:before {
    content: "\\e618";
  }

  .icon-shangxiaxuanze:before {
    content: "\\e697";
  }

  .icon-tianjialiaotian:before {
    content: "\\e735";
  }

  .icon-fanhui:before {
    content: "\\e635";
  }

  .icon-dianzan1:before {
    content: "\\e61a";
  }

  .icon-dianzan:before {
    content: "\\e619";
  }

  .icon-pingbi1:before {
    content: "\\e617";
  }

  .icon-pingbi:before {
    content: "\\e616";
  }

  .icon-a-tianjiaguanzhuguanzhu:before {
    content: "\\e6aa";
  }

  .icon-gerenxinxi1:before {
    content: "\\e615";
  }

  .icon-shoucang1:before {
    content: "\\e614";
  }

  .icon-shoucang:before {
    content: "\\e613";
  }

  .icon-e31guanzhuxuanzhong:before {
    content: "\\e611";
  }

  .icon-e31guanzhu:before {
    content: "\\e612";
  }

  .icon-gerenxinxi:before {
    content: "\\e690";
  }

  .icon-pinglun1:before {
    content: "\\e610";
  }

  .icon-qitawenti1:before {
    content: "\\e60e";
  }

  .icon-xingqiu1:before {
    content: "\\e60b";
  }

  .icon-shouye1:before {
    content: "\\e603";
  }

  .icon-guanbi:before {
    content: "\\e634";
  }

  .icon-dunpai:before {
    content: "\\e604";
  }

  .icon-gengduo:before {
    content: "\\e608";
  }

  .icon-duihuan1:before {
    content: "\\e607";
  }

  .icon-wenhao:before {
    content: "\\e725";
  }

  .icon-jiazai_shuaxin:before {
    content: "\\eaf4";
  }

  .icon-aixin:before {
    content: "\\e8ab";
  }

  .icon-aixin1:before {
    content: "\\e8c3";
  }

  .icon-retweet:before {
    content: "\\eb0e";
  }

  .icon-pinglun:before {
    content: "\\e602";
  }

  .icon-a-xiaoxi1:before {
    content: "\\e601";
  }

  .icon-aite:before {
    content: "\\e60a";
  }

  .icon-tupian:before {
    content: "\\e625";
  }

  .icon-xiaolian:before {
    content: "\\e64f";
  }

  .icon-GIF:before {
    content: "\\e686";
  }

  .icon-xingqiu:before {
    content: "\\e609";
  }

  .icon-qitawenti:before {
    content: "\\e692";
  }

  .icon-shouye:before {
    content: "\\e6e4";
  }

  .show-media-lg {
    display: none;
    ${mediaQueries.lg} {
      display: block;
    }
  }
  .show-media-md {
    display: none;
    ${mediaQueries.md} {
      display: block;
    }
  }
  .show-media-nav {
    display: none;
    ${mediaQueries.nav} {
      display: block;
    }
  }
  .show-media-sm {
    display: none;
    ${mediaQueries.sm} {
      display: block;
    }
  }
  .show-media-xl {
    display: none;
    ${mediaQueries.xl} {
      display: block;
    }
  }
  .show-media-xs {
    display: none;
    ${mediaQueries.xs} {
      display: block;
    }
  }
  .hide-media-lg {
    display: block;
    ${mediaQueries.lg} {
      display: none;
    }
  }
  .hide-media-md {
    display: block;
    ${mediaQueries.md} {
      display: none;
    }
  }
  .hide-media-nav {
    display: block;
    ${mediaQueries.nav} {
      display: none;
    }
  }
  .hide-media-sm {
    display: block;
    ${mediaQueries.sm} {
      display: none;
    }
  }
  .hide-media-xl {
    display: block;
    ${mediaQueries.xl} {
      display: none;
    }
  }
  .hide-media-xs {
    display: block;
    ${mediaQueries.xs} {
      display: none;
    }
  }
`;

export default GlobalStyle;
