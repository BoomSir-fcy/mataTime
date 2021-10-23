import React from 'react';
import styled from 'styled-components';
import { useImmer } from 'use-immer';
import { Box, Flex, Button, Svg } from 'uikit';

import { Toolbar } from './toolbar';

import { mediaQueriesSize } from 'uikit/theme/base';

const EditorWarpper = styled(Box)`
  width: 100%;
  background: ${({ theme }) => theme.colors.backgroundCard};
  border-radius: ${({ theme }) => theme.radii.card};
  ${mediaQueriesSize.padding}
  ${mediaQueriesSize.marginbsm}
`
const EditorTextarea = styled.textarea`
  width: 100%;
  min-height: 112px;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.backgroundTextArea};
  border-radius: ${({ theme }) => theme.radii.card};
  border: 0;
  outline: 0;
  resize: none;
  font-size: 16px;
  ${mediaQueriesSize.padding}
`

export const Editor = React.memo(() => {

  const [state, setState] = useImmer({
    cursor: 0,
    editorValue: ""
  });
  const editor = React.useRef(null);

  const insertMyText = (event:any, text: string) => {
    const { cursor } = state;
    const { value } = event;
    let textBefore = value.substring(0, cursor);
    let textAfter = value.substring(cursor, value.length);
    return textBefore + text + textAfter;
  }

  const handleSelectEmoji = React.useCallback((data) => {
    const { editorValue, cursor } = state;
    let newValue = insertMyText(editor.current, data);
    setState(p => {
      p.cursor = cursor + data.length;
      p.editorValue = cursor > 0 ? newValue : (editorValue + data);
    })
  }, [state]);

  return (
    <EditorWarpper>
      <EditorTextarea placeholder="分享新鲜事" ref={editor}
        value={state.editorValue}
        onBlur={(e) => setState(p => {p.cursor = e.target.selectionStart})}
        onChange={(e) => setState(p => {p.editorValue = e.target.value})} />
      <Flex justifyContent="space-between" mt="12px">
        <Toolbar callback={handleSelectEmoji} />
        <Button>发布</Button>
      </Flex>
    </EditorWarpper>
  )
})