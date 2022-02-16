import React, { useCallback, useMemo, useState } from 'react';
import { Flex, Button, Box, Text } from 'uikit';
import styled, { DefaultTheme } from 'styled-components';
import { useSlate, useSlateStatic, ReactEditor } from 'slate-react';
import { Editor, Transforms, Element as SlateElement } from 'slate';
import { HistoryEditor, History } from 'slate-history';
import { Icon, SearchPop } from 'components';
import { ImageElement, ParagraphElement } from '../../custom-types';
import { Emoji } from '../../emoji';
import InsertImageForm from './InsertImageForm';
import {
  blockFormats,
  markFormats,
  hisoryFormats,
  FormatType,
} from './formats';
import { insertMention } from '../Mentions/hooks';
import { isMarkActive, toggleMark } from '../tools/toggleMark';

// const isMarkActive = (editor, format) => {
//   const marks = Editor.marks(editor);
//   return marks ? marks[format] === true : false;
// };

// const toggleMark = (editor, format) => {
//   const isActive = isMarkActive(editor, format);

//   if (isActive) {
//     Editor.removeMark(editor, format);
//   } else {
//     Editor.addMark(editor, format, true);
//   }
// };

const isBlockActive = (editor, format) => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: n =>
        !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
    }),
  );

  return !!match;
};

const LIST_TYPES = ['numbered-list', 'bulleted-list'];

const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(editor, format);
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: n =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      LIST_TYPES.includes(n.type),
    split: true,
  });
  const newProperties: Partial<SlateElement> = {
    type: isActive ? 'paragraph' : isList ? 'list-item' : format,
  };
  Transforms.setNodes<SlateElement>(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

const toggleHistory = (editor, format) => {
  if (format === 'redo' || format === 'undo') {
    HistoryEditor[format](editor);
    console.log(editor.history.undos, 'editor.history?.undo');
    // HistoryEditor.undo(editor);

    // TODO: 获取焦点
  }
};

const insertEmoji = (editor, data) => {
  ReactEditor.focus(editor);
  editor.insertText(data);
};

const ButtonStyled = props => (
  <Button
    style={{ fontWeight: '400' }}
    variant='text'
    padding='0'
    mr='16px'
    {...props}
  />
);

const FormatButton = ({ format, icon, type }) => {
  const editor = useSlateStatic();

  const [flag, setFlag] = useState(0); // 更新数据 重新渲染

  const active = () => {
    if (type === FormatType.MARK) {
      return isMarkActive(editor, format);
    }
    if (type === FormatType.BLOCK) {
      return isBlockActive(editor, format);
    }
    if (type === FormatType.HISTORY && format === 'redo') {
      return editor.history?.redos?.length;
    }
    if (type === FormatType.HISTORY && format === 'undo') {
      return editor.history?.undos?.length;
    }
    return false;
  };

  return (
    <ButtonStyled
      onClick={event => {
        event.preventDefault();
        setFlag(prep => prep + 1);
        if (type === FormatType.MARK) {
          toggleMark(editor, format);
          ReactEditor.focus(editor);
          return;
        }
        if (type === FormatType.BLOCK) {
          toggleBlock(editor, format);
          ReactEditor.focus(editor);
          return;
        }
        if (type === FormatType.HISTORY) {
          ReactEditor.focus(editor);
          toggleHistory(editor, format);
        }
      }}
    >
      <Icon color={active() ? 'text' : 'textTips'} name={icon} />
      {/* {!flag && null} */}
    </ButtonStyled>
  );
};

const Toolbar = () => {
  const editor = useSlateStatic();

  const [searchUser, setSearchUser] = useState(false);
  const [searcTopic, setSearcTopic] = useState(false);

  const searchSelect = (data, type) => {
    setSearcTopic(false);
    setSearchUser(false);
    if (!data) return;
    if (type === 'user') {
      insertMention(editor, { uid: data.uid, character: '@' + data.nick_name });
    }
    if (type === 'topic') {
      Transforms.insertText(editor, `#${data.topic_name} `);
    }
  };

  return (
    <Box
      onClick={e => {
        e.stopPropagation();
      }}
    >
      <Flex padding='8px 0' justifyContent='flex-start' alignItems='center'>
        {markFormats.map(item => (
          <FormatButton
            type={item.type}
            icon={item.icon}
            // editor={editor}
            format={item.format}
          />
        ))}
        <ButtonStyled>
          <Emoji
            color='textTips'
            onChange={function (e: string): void {
              insertEmoji(editor, e);
            }}
          />
        </ButtonStyled>
        <ButtonStyled>
          <InsertImageForm color='textTips' multiple />
        </ButtonStyled>
        <ButtonStyled>
          <Icon
            color='textTips'
            name='icon-aite'
            onClick={() => setSearchUser(!searchUser)}
            // title={t('editorUser')}
          />
        </ButtonStyled>
        <ButtonStyled>
          <Icon
            color='textTips'
            name='icon-a-xiaoxi1'
            onClick={() => setSearcTopic(!searcTopic)}
            // title={t('editorTopic')}
          />
        </ButtonStyled>

        {blockFormats.concat(hisoryFormats).map(item => (
          <FormatButton
            type={item.type}
            icon={item.icon}
            // editor={editor}
            format={item.format}
          />
        ))}
        {/* {markFormats.map(item => {
          return (
            <FormatButton
              type={item.type}
              icon={item.icon}
              editor={editor}
              active={isMarkActive(editor, item.format)}
              format={item.format}
            />
          );
        })}
        {blockFormats.map(item => {
          return (
            <FormatButton
              editor={editor}
              type={item.type}
              icon={item.icon}
              active={isBlockActive(editor, item.format)}
              format={item.format}
            />
          );
        })} */}
      </Flex>
      <Box position='relative' width='100%' height='0'>
        {(searcTopic || searchUser) && (
          <SearchPop
            type={searchUser ? 'user' : 'topic'}
            show={searcTopic || searchUser}
            callback={searchSelect}
            top='10px'
          />
        )}
      </Box>
    </Box>
  );
};

export default Toolbar;
