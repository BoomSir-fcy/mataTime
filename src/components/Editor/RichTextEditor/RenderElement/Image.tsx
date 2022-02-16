import React, { useCallback } from 'react';
import { Box, Button } from 'uikit';
import styled from 'styled-components';
import { useSlateStatic, ReactEditor } from 'slate-react';
import { Transforms, createEditor, Descendant, Editor } from 'slate';
import { Loading, Icon } from 'components';
import { mt } from './styleds';

export const ImageStyled = styled.img`
  max-width: 100%;
  max-height: 20em;
`;

export const BoxStyled = styled(Box)<{ align?: string }>`
  ${mt};
  display: inline-block;
  line-height: 0; /* 去除 inline-block 底部间距 */
  text-align: ${({ align }) => align || 'right'};
`;

const CloseBtnBox = styled(Box)`
  position: absolute;
  right: -10px;
  z-index: 23;
  top: -10px;
  background: ${({ theme }) => theme.colors.primaryDark};
  border-radius: 50%;
`;
const CloseBtn = styled(Button)`
  padding: 5px;
  height: 24px;
  width: 24px;
`;

const Image = ({ attributes, children, element }) => {
  const editor = useSlateStatic();
  const removeHandle = useCallback(() => {
    try {
      const path = ReactEditor.findPath(editor, element);
      const [nextEle, nextPath] = Editor.next(editor, { at: path }) || [
        null,
        null,
      ];
      if (
        nextEle &&
        (nextEle as any).type === 'image-empty' &&
        (nextEle as any).children[0]?.text === ''
      ) {
        Transforms.removeNodes(editor, { at: nextPath }); // 图片节点后面或默认更一个空节点
      }
      Transforms.removeNodes(editor, { at: path });
    } catch (error) {
      console.error(error);
    }
  }, [editor]);

  return (
    <Box contentEditable={false} {...attributes}>
      {children}
      <BoxStyled position='relative' display='inline-block'>
        <Loading zIndex={2} overlay visible={element.loading} />
        {/* {children} */}
        <ImageStyled src={element.url} alt='' />
        <CloseBtnBox>
          <CloseBtn onClick={removeHandle} variant='tertiary'>
            <Icon size={16} name='icon-guanbi' />
          </CloseBtn>
        </CloseBtnBox>
      </BoxStyled>
    </Box>
  );
};

export default Image;
