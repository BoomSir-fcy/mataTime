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
import { Icon } from 'components';
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
import MentionPortal from './Mentions/MentionPortal';
import { useMentions, insertMention } from './Mentions/hooks';
import decorate from './tools/decorate';
import { onHotkeyDown } from './tools/hotkey';
import { HUGE_ARTICLE_POST_MAX_LEN } from 'config';

interface RichTextEditorProps extends BoxProps {
  maxLength?: number;
  background?: string;
}

const getColor = (color: string, theme: DefaultTheme) => {
  return getThemeValue(`colors.${color}`, color)(theme);
};

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  background = 'input',
  ...props
}) => {
  const { theme } = useTheme();

  // const [editor] = useState(() => withReact(createEditor()));
  const editor = useMemo(
    () => withMentions(withImages(withHistory(withReact(createEditor())))),
    [],
  );

  const renderElement = useCallback(props => <Element {...props} />, []);
  const renderLeaf = useCallback(props => <Leaf {...props} />, []);

  const [value, setValue] = useState<Descendant[]>(initialValue);
  const ref = useRef<HTMLDivElement | null>();
  const { onKeyDown, onChangeHandle, target, userList, onItemClick, index } =
    useMentions(editor, ref);

  useEffect(() => {
    console.log(value);
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
    </Card>
  );
};

export default React.memo(RichTextEditor);
