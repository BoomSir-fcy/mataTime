import React from 'react';
import styled from 'styled-components';
import { useImmer } from 'use-immer';
import { Box, Flex, Button, Svg } from 'uikit';
import { Emoji } from './emoji';
import { Icon } from 'components';
import { useSlate } from 'slate-react';
const EditorToolbar = styled(Flex)`
  i {
    margin-right: 20px !important;
  }
`;
const ToolbarButton = styled(Button)`
  padding: 0 10px;
`;
const EmojiButton = ({ callbackEmoji }) => {
  const editor = useSlate();
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
  return <Emoji onChange={emoji => callbackEmoji(emoji, editor)} />;
};
export const Toolbar: React.FC<{
  callbackEmoji?: (data: string, data2: any) => void;
  callbackSelectImg?: (data: string) => void;
  callbackInserTopic?: (data: string) => void;
  callbackInserAt?: (data: string) => void;
  type?: string;
}> = React.memo(
  ({
    callbackEmoji,
    callbackSelectImg,
    callbackInserTopic,
    callbackInserAt,
    type
  }) => {
    const size = 25,
      color = '#7393ff';
    return (
      <EditorToolbar>
        <EmojiButton callbackEmoji={callbackEmoji}></EmojiButton>
        {type === 'post' ? (
          <>
            <Icon
              size={size}
              color={color}
              current={1}
              name="icon-tupian"
              onClick={callbackSelectImg}
            />
            {/* <Icon size={size} color={color} current={1} name="icon-GIF"/> */}
            <Icon
              size={size}
              color={color}
              current={1}
              name="icon-aite"
              onClick={callbackInserAt}
            />
            <Icon
              size={size}
              color={color}
              current={1}
              name="icon-a-xiaoxi1"
              onClick={callbackInserTopic}
            />
          </>
        ) : null}
      </EditorToolbar>
    );
  }
);
