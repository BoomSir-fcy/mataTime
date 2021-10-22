import React from 'react';
import styled from 'styled-components';
import { Box, Flex, Button, Svg } from 'uikit';

import { Emoji } from './emoji';

import { mediaQueriesSize } from 'uikit/theme/base';
import { useImmer } from 'use-immer';
import { stringify } from 'querystring';

const EditorWarpper = styled(Box)`
  width: 100%;
  background: ${({ theme }) => theme.colors.backgroundCard};
  border-radius: ${({ theme }) => theme.radii.card};
  ${mediaQueriesSize.padding}
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

const EditorToolbar = styled(Flex)`

`

export const Editor = React.memo(() => {

  const [state, setState] = useImmer({
    cursor: 0,
    textBefore: "",
    textAfter: "",
    editorValue: ""
  });

  const handleSelectEmoji = React.useCallback((data) => {
    console.log(state);
    setState(p => {
      p.editorValue = ""
    })
  }, [state]);

  // console.log(state);

  return (
    <EditorWarpper>
      <EditorTextarea placeholder="分享新鲜事" 
        value={state.editorValue}
        onBlur={(e) => {
          let cursor = e.target.selectionStart;
          let textBeforeCursor = e.target.value.substring(0, cursor);
          let textAfterCursor = e.target.value.substring(cursor, e.target.value.length);
          console.log(cursor);
          setState(p => {
            p.cursor = cursor;
            p.textBefore = textBeforeCursor;
            p.textAfter = textAfterCursor
          })
        }}
        onChange={(e) => setState(p => {p.editorValue = e.target.value})} />
      <EditorToolbar>
        <Emoji onChange={handleSelectEmoji} />
        <Button variant="text">
          <Svg viewBox="0 0 45 45" width="25px">
            <image xlinkHref={require('./images/icon_img.png').default}/>
          </Svg>
        </Button>
        <Button variant="text">
          <Svg viewBox="0 0 45 45" width="25px">
            <image xlinkHref={require('./images/icon_gif.png').default}/>
          </Svg>
        </Button>
        <Button variant="text">
          <Svg viewBox="0 0 45 45" width="25px">
            <image xlinkHref={require('./images/icon_at.png').default}/>
          </Svg>
        </Button>
        <Button variant="text">
          <Svg viewBox="0 0 45 45" width="25px">
            <image xlinkHref={require('./images/icon_topic.png').default}/>
          </Svg>
        </Button>
      </EditorToolbar>
    </EditorWarpper>
  )
})