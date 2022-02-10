import React from 'react';
import { Box, Button } from 'uikit';
import styled from 'styled-components';
import { useSlateStatic, ReactEditor } from 'slate-react';
import { Transforms, createEditor, Descendant } from 'slate';
import { Loading } from 'components';
import { mt } from './styleds';

const ImageStyled = styled.img`
  max-width: 100%;
  max-height: 20em;
`;

const BoxStyled = styled(Box)`
  ${mt};
  display: inline-block;
  line-height: 0; /* 去除 inline-block 底部间距 */
`;

const CloseBtn = styled(Button)`
  position: absolute;
  right: 0;
  top: 0;
  transform: translateX(50%);
  padding: 0;
  height: 20px;
`;

const Image = ({ attributes, children, element }) => {
  const editor = useSlateStatic();
  const path = ReactEditor.findPath(editor, element);

  return (
    <BoxStyled position='relative' display='inline-block' {...attributes}>
      <Loading overlay visible={element.loading} />
      {children}
      <ImageStyled src={element.url} alt='' />
      <CloseBtn
        onClick={() => Transforms.removeNodes(editor, { at: path })}
        variant='text'
      >
        close
      </CloseBtn>
    </BoxStyled>
  );
};

export default Image;
