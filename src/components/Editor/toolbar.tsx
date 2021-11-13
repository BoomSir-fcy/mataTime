import React from 'react';
import styled from 'styled-components';
import { useImmer } from 'use-immer';
import { Box, Flex, Button, Svg } from 'uikit';
import { Emoji } from './emoji';
import {useSlate}from 'slate-react';
const EditorToolbar = styled(Flex)``
const ToolbarButton = styled(Button)`
  padding: 0 10px;
`
const EmojiButton = ({callbackEmoji})=>{
  const editor = useSlate()
  // const {insertText} = editor
  // console.log(editor);
  // editor.insertText=(res)=>{
  //   console.log(res);
  //   // insertText(res)
  //   Transforms.unwrapNodes(editor, {
  //     match: n =>{
  //       console.log(n);
  //     },
  //   })
  // }
  return <Emoji onChange={(emoji)=>callbackEmoji(emoji,editor)} />
}
export const Toolbar: React.FC<{
  callbackEmoji?: (data: string,data2:any) => void
  callbackSelectImg?: (data: string) => void
  callbackInserTopic?: (data: string) => void
  callbackInserAt?: (data: string) => void
}> = React.memo(({ callbackEmoji ,callbackSelectImg,callbackInserTopic,callbackInserAt}) => {

  return (
    <EditorToolbar>
      <EmojiButton callbackEmoji={callbackEmoji}></EmojiButton>
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