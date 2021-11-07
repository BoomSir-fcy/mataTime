import React from 'react';
import styled from 'styled-components';
import { useImmer } from 'use-immer';
import { Box, Flex, Button, Svg } from 'uikit';

import { Emoji } from './emoji';

const EditorToolbar = styled(Flex)`

`
const ToolbarButton = styled(Button)`
  padding: 0 10px;
`

export const Toolbar: React.FC<{
  callback: (data: string) => void
  callbackSelectImg: (data: string) => void
  callbackInserTopic: (data: string) => void
  callbackInserAt: (data: string) => void
}> = React.memo(({ callback ,callbackSelectImg,callbackInserTopic,callbackInserAt}) => {

  return (
    <EditorToolbar>
      <Emoji onChange={callback} />
      <ToolbarButton variant="text" onClick={callbackSelectImg}>
        <Svg viewBox="0 0 45 45" width="25px">
          <image xlinkHref={require('./images/icon_img.png').default}/>
        </Svg>
      </ToolbarButton>
      {/* <ToolbarButton variant="text">
        <Svg viewBox="0 0 45 45" width="25px">
          <image xlinkHref={require('./images/icon_gif.png').default}/>
        </Svg>
      </ToolbarButton> */}
      <ToolbarButton variant="text"  onClick={callbackInserAt}>
        <Svg viewBox="0 0 45 45" width="25px">
          <image xlinkHref={require('./images/icon_at.png').default}/>
        </Svg>
      </ToolbarButton>
      <ToolbarButton variant="text" onClick={callbackInserTopic}>
        <Svg viewBox="0 0 45 45" width="25px">
          <image xlinkHref={require('./images/icon_topic.png').default}/>
        </Svg>
      </ToolbarButton>
    </EditorToolbar>
  )
})