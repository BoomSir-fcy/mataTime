import React, { useCallback } from 'react';
import { Flex, Button, Text } from 'uikit';
import styled, { DefaultTheme } from 'styled-components';
import { useSlate, useSlateStatic, ReactEditor } from 'slate-react';
import { Editor, Transforms, Element as SlateElement } from 'slate';
import { Icon } from 'components';
import { ImageElement, ParagraphElement } from '../../custom-types';
import InsertImageForm from './InsertImageForm';

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

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

interface ToolbarButtonProps {
  format: string;
  icon: string;
  activeIcon?: string;
}

const ButtonStyled = props => (
  <Button variant='text' padding='0' mr='16px' {...props} />
);
const MarkButton: React.FC<ToolbarButtonProps> = ({
  format,
  icon,
  activeIcon,
}) => {
  const editor = useSlate();
  return (
    <ButtonStyled
      onMouseDown={event => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      <Text bold={isMarkActive(editor, format)}>{icon}</Text>
      {/* <Icon name={isMarkActive(editor, format) ? activeIcon || icon : icon} /> */}
    </ButtonStyled>
  );
};

const BlockButton: React.FC<ToolbarButtonProps> = ({
  format,
  icon,
  activeIcon,
}) => {
  const editor = useSlate();
  return (
    <ButtonStyled
      onMouseDown={event => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      <Text bold={isBlockActive(editor, format)}>{icon}</Text>
      {/* <Icon name={isBlockActive(editor, format) ? activeIcon || icon : icon} /> */}
      {/* <Icon name={icon} /> */}
    </ButtonStyled>
  );
};

const insertImage = (editor, url) => {
  const text = { text: '' };
  const text1 = { text: '2222' };
  const image: ImageElement = { type: 'image', url, children: [text] };
  const paragraph: ParagraphElement = { type: 'paragraph', children: [text1] };
  Transforms.insertNodes(editor, image);
  Transforms.insertNodes(editor, paragraph);
  setTimeout(() => {
    Transforms.removeNodes(editor, {
      at: ReactEditor.findPath(editor, paragraph),
    });
  }, 10000);
};

// const uploadFile = useCallback(async (imageFile) => {
//   const imgMaxSize = 1024 * 1024 * 20;
//   const fileList: any[] = [];
//   try {
//     if (maxUploadLength + imageFile.length > 4)
//       return toastError(t('uploadImgMaxMsg'));

//     for (let image of imageFile) {
//       const compressImage = await cutDownImg(image);
//       fileList.push(compressImage);
//     }
//     const res = await Api.CommonApi.uploadImgList({
//       base64: fileList,
//       dir_name: 'common',
//     });
//     if (!Api.isSuccess(res)) toastError(t('commonUploadBackgroundFail'));
//     const imgList = (res.data ?? []).map(item => item.full_path);
//     onSuccess(imgList);
//   } catch (error) {
//     if ((error as Error).message === '1') {
//       toastError(t('File format error'));
//       return;
//     }
//     if ((error as Error).message === '2') {
//       toastError(t('commonUploadMaxSize'));
//       return;
//     }
//     console.error(error);
//   } finally {
//     onError();
//   }
// }, []);

const InsertImageButton = () => {
  const editor = useSlateStatic();
  return (
    <Button
      onMouseDown={event => {
        event.preventDefault();
        const url = window.prompt('Enter the URL of the image:');
        if (url) {
          insertImage(editor, url);
          return;
        }
      }}
    >
      image
    </Button>
  );
};

const Toolbar = () => {
  return (
    <Flex padding='8px 0' justifyContent='flex-start' alignItems='center'>
      <InsertImageButton />
      <InsertImageForm multiple />
      <MarkButton format='bold' icon='bold' />
      <MarkButton format='italic' icon='italic' />
      <MarkButton format='underline' icon='underline' />
      <MarkButton format='code' icon='code' />
      <BlockButton format='heading-one' icon='heading-one' />
      <BlockButton format='heading-two' icon='heading-two' />
      <BlockButton format='block-quote' icon='format_quote' />
      <BlockButton format='numbered-list' icon='format_list_numbered' />
      <BlockButton format='bulleted-list' icon='format_list_bulleted' />
    </Flex>
  );
};

export default Toolbar;
