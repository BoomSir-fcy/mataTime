import React, {
  useState,
  useCallback,
  useMemo,
  useEffect,
  useRef,
} from 'react';
import styled, { DefaultTheme } from 'styled-components';
import { Box, BoxProps, Button, Card, Text, Divider } from 'uikit';
import getThemeValue from 'uikit/util/getThemeValue';
import useTheme from 'hooks/useTheme';
import { ContentParsing, Icon } from 'components';
import {
  createEditor,
  Text as SlateText,
  Descendant,
  Transforms,
  Editor,
  Node,
} from 'slate';
import { Slate, Editable, withReact, ReactEditor } from 'slate-react';
import { withHistory } from 'slate-history';
import { withImages, withMentions, withLink } from '../withEditor';
import { Element, Leaf } from './RenderElement';
import Toolbar from './Toolbar';
import { initialValue } from './testdata';
import defaultValue from './defaultValue';
import MentionPortal from './Mentions/MentionPortal';
import { useMentions, insertMention } from './Mentions/hooks';
import decorate from './tools/decorate';
import { onHotkeyDown } from './tools/hotkey';
import { HUGE_ARTICLE_POST_MAX_LEN } from 'config';
import { PARAGRAPH_MT } from './RenderElement/styleds';
import DraggableImages from './Toolbar/DraggableImages';

interface RichTextEditorProps extends BoxProps {
  maxLength?: number;
  background?: string;
  value: Descendant[];
  draft?: Descendant[]; // 草稿箱
  tribeId?: number; // 部落带一个部落id 用于@用户是搜索使用
  setValue: React.Dispatch<React.SetStateAction<Descendant[]>>;
}

const getColor = (color: string, theme: DefaultTheme) => {
  return getThemeValue(`colors.${color}`, color)(theme);
};

const RichTextEditor = (
  {
    background = 'input',
    value,
    setValue,
    draft,
    tribeId,
    ...props
  }: RichTextEditorProps,
  ref,
) => {
  const { theme } = useTheme();

  // const [editor] = useState(() => withReact(createEditor()));
  const editor = useMemo(
    () => withLink(withMentions(withImages(withHistory(withReact(createEditor()))))),
    [],
  );

  const [refresh, setRefresh] = useState(0);

  // useEffect(() => {
  //   if (draft) {
  //     // 草稿箱保存回显
  //     reSetEditor();
  //     Transforms.insertNodes(editor, draft);
  //   }
  // }, [draft, editor]);

  const reSetEditor = useCallback(
    (newNode?: Descendant[]) => {
      const children = [...editor.children];
      children.forEach(node =>
        editor.apply({ type: 'remove_node', path: [0], node }),
      );
      ReactEditor.focus(editor);
      Transforms.insertNodes(editor, newNode || defaultValue);
    },
    [editor],
  );

  React.useImperativeHandle(ref, () => ({
    reSetEditor(node?: Descendant[]) {
      return reSetEditor(node);
    },
  }));

  const renderElement = useCallback(props => <Element {...props} />, []);
  const renderLeaf = useCallback(props => <Leaf {...props} />, []);

  // const [value, setValue] = useState<Descendant[]>(initialValue);
  const mentionsRef = useRef<HTMLDivElement | null>();
  const { onKeyDown, onChangeHandle, target, userList, onItemClick, index } =
    useMentions(editor, mentionsRef, tribeId);

  useEffect(() => {
    // console.log(value, 'value');
    // sessionStorage.setItem('asdasads', JSON.stringify(value));
  }, [value]);

  const serialize = useMemo(() => {
    return value.map(n => Node.string(n)).join('\n');
  }, [value]);


  /* 
    TODO:
    1.顶部 工具栏 使用粘性布局
    2.添加图片后没法加文字
    3.粘贴的图片上传处理
    4.没想好
  */

  return (
    <Card isRadius>
      <Box
        width='100%'
        minHeight='455px'
        padding='0 20px 56px 20px'
        background={getColor(background, theme)}
        onClick={() => {
          ReactEditor.focus(editor);
        }}
        position='relative'
        key={refresh}
        {...props}
      >
        <Slate
          editor={editor}
          value={value}
          onChange={newValue => {
            setValue(newValue);
            const { selection } = editor;
            onChangeHandle(selection);
          }}
        >
          <Toolbar tribeId={tribeId} />
          <Divider margin='0 -20px' pb='3px' />
          <Editable
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            decorate={decorate}
            placeholder='Enter some text...'
            onKeyDown={event => {
              onKeyDown(event);
              onHotkeyDown(editor, event);
            }}
          />
          {target && userList.length > 0 && (
            <MentionPortal
              onItemClick={onItemClick}
              pref={ref}
              chars={userList}
              index={index}
            />
          )}
        </Slate>
        <Box
          onClick={e => {
            e.stopPropagation();
          }}
          height='16px'
          position='absolute'
          bottom='20px'
          right='20px'
        >
          <Text
            color={
              serialize.length > HUGE_ARTICLE_POST_MAX_LEN
                ? 'downPrice'
                : 'white_black'
            }
          >
            {serialize.length}/{HUGE_ARTICLE_POST_MAX_LEN}
          </Text>
        </Box>
      </Box>
      {/* <Box mt='80px'>
        <ContentParsing
          paragraphMt={PARAGRAPH_MT}
          content={JSON.stringify(value)}
        />
      </Box> */}
    </Card>
  );
};

export default React.forwardRef(RichTextEditor);
