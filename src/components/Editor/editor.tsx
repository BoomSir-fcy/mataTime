import React from 'react';
import styled from 'styled-components';
import { useImmer } from 'use-immer';
import { Box, Flex, Button, Svg } from 'uikit';

import { Emoji } from './emoji';
import { Toolbar } from './toolbar';

import { mediaQueriesSize } from 'uikit/theme/base';

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

const SendButton = styled(Button)`
border-radius: ${({ theme }) => theme.radii.card};
width: 100px;
height: 35px;
border-radius: 10px;
background-color:#4168ED;
margin-top:12px;
`;
const EditorToolbar = styled(Flex)`
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
      <EditorTextarea placeholder="分享新鲜事" onChange={(e) => {
        let cursorPosition = e.target.selectionStart
        let textBeforeCursorPosition = e.target.value.substring(0, cursorPosition)
        let textAfterCursorPosition = e.target.value.substring(cursorPosition, e.target.value.length)

        console.log(textBeforeCursorPosition, textAfterCursorPosition)

      }} />
      <Flex  justifyContent="space-between" >
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
        <SendButton variant="text">
          发布
        </SendButton>
      </Flex>
    </EditorWarpper>
  )
})