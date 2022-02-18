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
import { withImages, withMentions } from '../withEditor';
import { Element, Leaf } from './RenderElement';
import Toolbar from './Toolbar';
import { initialValue } from './testdata';
import defaultValue from './defaultValue';
import MentionPortal from './Mentions/MentionPortal';
import { useMentions, insertMention } from './Mentions/hooks';
import decorate from './tools/decorate';
import { onHotkeyDown } from './tools/hotkey';
import { HUGE_ARTICLE_POST_MAX_LEN } from 'config';
import ParseContent from './ParseContent';
import { PARAGRAPH_MT } from './RenderElement/styleds';

interface RichTextEditorProps extends BoxProps {
  maxLength?: number;
  background?: string;
  value: Descendant[];
  draft?: Descendant[]; // 草稿箱
  setValue: React.Dispatch<React.SetStateAction<Descendant[]>>;
}

const getColor = (color: string, theme: DefaultTheme) => {
  return getThemeValue(`colors.${color}`, color)(theme);
};

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  background = 'input',
  value,
  setValue,
  draft,
  ...props
}) => {
  const { theme } = useTheme();

  // const [editor] = useState(() => withReact(createEditor()));
  const editor = useMemo(
    () => withMentions(withImages(withHistory(withReact(createEditor())))),
    [],
  );

  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    if (draft) {
      // TODO: 草稿箱保存
      // console.log(21122121);
      // value.map(n => {
      // const path = ReactEditor.findPath(editor, n);
      // Transforms.removeNodes(editor, { at: path });
      // });
      // const point = { path: [0, 0], offset: 0 };
      // Transforms.removeNodes(editor, { at: point });
      // Transforms.insertNodes(editor, draft);
      // setValue(draft);
      // setRefresh(prev => prev + 1);
      // const children = [...editor.children];
      // children.forEach(node =>
      //   editor.apply({ type: 'remove_node', path: [0], node }),
      // );
      // const point = Editor.end(editor, []);
      // if (point) {
      //   Transforms.select(editor, point);
      // }
      const children = [...editor.children];
      children.forEach(node =>
        editor.apply({ type: 'remove_node', path: [0], node }),
      );
      ReactEditor.focus(editor);
      Transforms.insertNodes(editor, draft);
    }
  }, [draft, editor]);

  const resetNodes = editor => {
    const children = [...editor.children];
    children.forEach(node =>
      editor.apply({ type: 'remove_node', path: [0], node }),
    );
    // const point = Editor.end(editor, []);
    Transforms.insertNodes(editor, defaultValue);
    // const point = { path: [0, 0], offset: 0 };
    // if (point) {
    //   Transforms.select(editor, point);
    // }
    ReactEditor.focus(editor);
    // setRefresh(prev => prev + 1);
  };

  const renderElement = useCallback(props => <Element {...props} />, []);
  const renderLeaf = useCallback(props => <Leaf {...props} />, []);

  // const [value, setValue] = useState<Descendant[]>(initialValue);
  const ref = useRef<HTMLDivElement | null>();
  const { onKeyDown, onChangeHandle, target, userList, onItemClick, index } =
    useMentions(editor, ref);

  useEffect(() => {
    // console.log(value, 'value');
    // sessionStorage.setItem('asdasads', JSON.stringify(value));
  }, [value]);

  const serialize = useMemo(() => {
    return value.map(n => Node.string(n)).join('\n');
  }, [value]);

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
          <Toolbar />
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
      <Button onClick={() => resetNodes(editor)}>reset</Button>
    </Card>
  );
};

export default React.memo(RichTextEditor);
