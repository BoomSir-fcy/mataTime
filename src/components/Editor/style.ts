import styled from 'styled-components';
import { mediaQueriesSize } from 'uikit/theme/base';
import { Box, Flex, Button, Svg } from 'uikit';
export const EditorWarpper = styled(Box)`
  width: 100%;
  background: ${({ theme }) => theme.colors.backgroundCard};
  border-radius: ${({ theme }) => theme.radii.card};
  padding:20px 16px;
  padding-bottom:15px;
  ${mediaQueriesSize.marginbsm}
`
export const SendButton = styled(Button)`
border-radius: ${({ theme }) => theme.radii.card};
width: 100px;
height: 35px;
border-radius: 10px;
background-color:#4168ED;
// margin-top:12px;
`;
export const TextBox = styled.div`
margin-bottom: 15px;
.w-e-text-container{
  z-index:22 !important;
  overflow-y:auto;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.backgroundTextArea};
  border-radius: ${({ theme }) => theme.radii.card};
  .placeholder{
    color: #B5B5B5;
  }
  .w-e-text{
    &::-webkit-scrollbar {
      /*滚动条整体样式*/
      width : 10px;  /*高宽分别对应横竖滚动条的尺寸*/
      height: 1px;
      }
    &::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 10px;
    background   : rgba(83,83,83,0.5);
    }
    min-height: 112px;
    max-height: 150px;
  }
}
`;
export const Toolbar = styled(Flex)`
.w-e-toolbar{
  background-color: transparent !important;
  .w-e-menu{
    margin-right:10px;
    &:hover {
      background-color: transparent !important;
      i{ 
        color:#fff;
        transition: all 0.3s;
      }
    }
  }
  i{ 
    vertical-align: middle;
    color: #7393FF;
    font-size:20px;
  }
}
`;