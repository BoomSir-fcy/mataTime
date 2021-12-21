import styled from 'styled-components';
import { mediaQueriesSize } from 'uikit/theme/base';
import { Box, Flex, Button, Svg } from 'uikit';
import { style } from 'styled-system';

export const EditorWarpper = styled(Box)`
  width: 100%;
  background: ${({ theme }) => theme.colors.backgroundCard};
  border-radius: ${({ theme }) => theme.radii.card};
  padding: 20px 16px;
  padding-bottom: 15px;
  ${mediaQueriesSize.marginbsm}
`;
export const MentionBox = styled.span`
  color: #7393ff;
  cursor: pointer;
`;
export const SendButton = styled(Button)`
  border-radius: ${({ theme }) => theme.radii.card};
  width: 100px;
  height: 35px;
  border-radius: 10px;
  background-color: #4168ed;
  margin-top: 12px;
  padding: 0;
`;

export const CancelButton = styled(Button)`
  border-radius: ${({ theme }) => theme.radii.card};
  width: 100px;
  height: 35px;
  border-radius: 10px;
  background: #4d535f;
  margin-top: 12px;
  padding: 0;
  margin-right: 20px;
`;

export const SlateBox = styled.div`
  position: relative;
  background: ${({ theme }) => theme.colors.editorBoxBg};
  border-radius: ${({ theme }) => theme.radii.card};
  padding: 8px;
  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 15px;
  }
  padding-bottom: 30px;
  z-index: 1004;
  div.text-box {
    color: ${({ theme }) => theme.colors.editorText};
    background: ${({ theme }) => theme.colors.backgroundTextArea};
    padding: 8px;
    ${({ theme }) => theme.mediaQueries.sm} {
      padding: 15px;
    }
    padding-bottom: 16px;
    border-radius: 5px;
    min-height: 112px !important;
    max-height: 120px;
    overflow-y: auto;
    &::-webkit-scrollbar {
      /*滚动条整体样式*/
      width: 8px; /*高宽分别对应横竖滚动条的尺寸*/
      height: 1px;
    }
    &::-webkit-scrollbar-thumb {
      /*滚动条里面小方块*/
      border-radius: 8px;
      background: rgba(83, 83, 83, 0.5);
    }
    & > div {
      min-height: 88px !important;
    }
  }
`;
export const Toolbar = styled(Flex)`
  .w-e-toolbar {
    background-color: transparent !important;
    .w-e-menu {
      margin-right: 10px;
      &:hover {
        background-color: transparent !important;
        i {
          color: #fff;
          transition: all 0.3s;
        }
      }
    }
    i {
      vertical-align: middle;
      color: #7393ff;
      font-size: 20px;
    }
  }
`;

export const MentionContent = styled(Box)`
  top: -9999px;
  left: -9999px;
  position: absolute;
  z-index: 9999;
  width: 200px;
  height: 300px;
  overflow-y: auto;
  background: white;
  border-radius: 4px;
  box-shadow: rgb(101 119 134 / 20%) 0px 0px 15px,
    rgb(101 119 134 / 15%) 0px 0px 3px 1px;
`;

export const MentionItems = styled(Box)`
  cursor: pointer;
  min-width: 0;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  padding: 10px 12px;
`;
