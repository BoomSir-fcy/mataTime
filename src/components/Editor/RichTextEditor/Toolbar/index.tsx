import React, { useCallback, useMemo, useState } from 'react';
import { Flex, Button, Box, Text, Input } from 'uikit';
import styled, { DefaultTheme } from 'styled-components';
import { useSlate, useSlateStatic, ReactEditor } from 'slate-react';
import { Editor, Transforms, Element as SlateElement } from 'slate';
import { HistoryEditor, History } from 'slate-history';
import { Icon, ModalWrapper, SearchPop } from 'components';
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
import { useTranslation } from 'contexts';

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

const toggleClearFormat = (editor) => {
  const { selection } = editor;
  if (!selection) return;
  markFormats.forEach(item => {
    Editor.removeMark(editor, item.format);
    // if (isMarkActive(editor, item.format)) {
    //   toggleMark(editor, item.format)
    // }
  })
  blockFormats.forEach(item => {
    if (isBlockActive(editor, item.format)) {
      toggleBlock(editor, item.format)
    }
  })
}

const toggleHistory = (editor, format) => {
  if (format === 'redo' || format === 'undo') {
    HistoryEditor[format](editor);
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
      return !!editor.history?.redos?.length;
    }
    if (type === FormatType.HISTORY && format === 'undo') {
      return !!editor.history?.undos?.length;
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
      <Icon bold={active()} color={active() ? 'text' : 'textTips'} name={icon} />
      {/* {!flag && null} */}
    </ButtonStyled>
  );
};

const Toolbar = () => {
  const editor = useSlateStatic();

  const [searchUser, setSearchUser] = useState(false);
  const [searcTopic, setSearcTopic] = useState(false);
  const { t } = useTranslation();

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

  const [visible, setVisible] = useState(false)

  return (
    <Box
      onClick={e => {
        e.stopPropagation();
      }}
    >
      <Flex padding='8px 0' justifyContent='space-between' alignItems='center'>
        <Flex alignItems='center'>
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
          <ButtonStyled>
            <Icon
              color='textTips'
              name='icon-bianjiqi_chaolianjie738'
              onClick={() => setVisible(true)}
            // title={t('editorTopic')}
            />
          </ButtonStyled>
          {blockFormats.map(item => (
            <FormatButton
              type={item.type}
              icon={item.icon}
              // editor={editor}
              format={item.format}
            />
          ))}
        </Flex>
        <Flex alignItems='center'>
          {hisoryFormats.map(item => (
            <FormatButton
              type={item.type}
              icon={item.icon}
              // editor={editor}
              format={item.format}
            />
          ))}
          <ButtonStyled>
            <Icon
              color='textTips'
              name='icon-bianjiqi_qingchugeshi710'
              onClick={() => toggleClearFormat(editor)}
            // title={t('editorTopic')}
            />
          </ButtonStyled>
        </Flex>
      </Flex>
      <ModalWrapper
        title={t('插入链接')}
        creactOnUse
        visible={visible}
        setVisible={setVisible}
      >
        <Box padding='5px 0' width='350px' maxWidth='80vw'>
          <Box mt='8px'>
            <Input value='' placeholder='请输入链接文本' />
          </Box>
          <Box mt='16px'>
            <Input value='' placeholder='请输入链接地址' />
          </Box>
          <Flex mt='24px' justifyContent='space-around'>
            <Button>取消</Button>
            <Button disabled>确定</Button>
          </Flex>
        </Box>

      </ModalWrapper>
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
