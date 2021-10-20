import React from 'react';
import styled from 'styled-components';
import { Box, Flex, Button, Svg } from 'uikit';

import { Emoji } from './emoji';

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

const EditorToolbar = styled(Flex)`

`

export const Editor = React.memo(() => {

  const handleSelectEmoji = React.useCallback((data) => {
    console.log(data);
  }, []);

  return (
    <EditorWarpper>
      <EditorTextarea placeholder="分享新鲜事" onChange={(e) => {
        let cursorPosition = e.target.selectionStart
        let textBeforeCursorPosition = e.target.value.substring(0, cursorPosition)
        let textAfterCursorPosition = e.target.value.substring(cursorPosition, e.target.value.length)

        console.log(textBeforeCursorPosition, textAfterCursorPosition)

      }} />
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