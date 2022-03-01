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
import { useToast } from 'hooks';
import { HUGE_ARTICLE_IMAGE_MAX_LEN } from 'config';
import { useTranslation } from 'contexts/Localization';
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
import { ParagraphElement } from '../custom-types';
import { Api } from 'apis';
import { cutDownImg } from 'utils/imageCompression';

interface RichTextEditorProps extends BoxProps {
  maxLength?: number;
  background?: string;
  value: Descendant[];
  draft?: Descendant[]; // 草稿箱
  tribeId?: number; // 部落带一个部落id 用于@用户是搜索使用
  setValue: React.Dispatch<React.SetStateAction<Descendant[]>>;
}

const CardStyled = styled(Card)`
  position: sticky;
  top: 0;
  overflow: unset;
`

const ToolbarStyled = styled(Box)`
  position: sticky;
  top: 60px;
  background-color: inherit;
  z-index: 20;
  margin: 0 -2px;
`

const getColor = (color: string, theme: DefaultTheme) => {
  return getThemeValue(`colors.${color}`, color)(theme);
};

const text = { text: '' };

const paragraph: ParagraphElement = { type: 'paragraph', children: [text] };

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

  const { toastError } = useToast();
  const { t } = useTranslation();
  const [imgList, setImgList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const uploadImg = useCallback(
    async (files: string[]) => {
      if (imgList.length + files.length > HUGE_ARTICLE_IMAGE_MAX_LEN)
        return toastError(t('uploadImgMaxMsg'));
      setIsLoading(true);
      const res = await Api.CommonApi.uploadImgList({
        base64: files,
        dir_name: 'common',
      });
      setIsLoading(false);
      if (!Api.isSuccess(res)) toastError(t('commonUploadBackgroundFail'));
      const imgUploadList = (res.data ?? []).map(item => item.full_path);
      setImgList([...imgList, ...imgUploadList]);
    },
    [imgList],
  );


  /* 
    TODO:
    // 1.顶部 工具栏 使用粘性布局
    // 2.添加图片后没法加文字
    3.粘贴的图片上传处理
    4.草稿箱移动端优化
    5.将img添加到imglist
    6.没想好
  */

  return (
    <CardStyled isRadius>
      <Box
        width='100%'
        minHeight='455px'
        padding='0 20px 56px 20px'
        borderRadius='10px'
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
          <ToolbarStyled>
            <Toolbar tribeId={tribeId} />
            <Divider margin='0 -18px' pb='3px' />
          </ToolbarStyled>
          <Editable
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            decorate={decorate}
            placeholder='Enter some text...'
            onKeyDown={event => {
              onKeyDown(event);
              onHotkeyDown(editor, event);
            }}
            onPaste={async event => {
              const data = event.clipboardData;
              const { files } = data;
              let fileList: any[] = [];
              if (files && files.length > 0) {
                //@ts-ignore
                for (const file of files) {
                  const [mime] = file.type.split('/');
                  if (mime === 'image') {
                    const compressImage = await cutDownImg(file);
                    fileList.push(compressImage);
                  }
                }
                uploadImg(fileList);
              }
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
        <Box onClick={e => {
          // Transforms.insertNodes(editor, paragraph);
          ReactEditor.focus(editor);
          editor.insertText(' ');
          // editor.deleteForward(1);
          // console.log(editor)
          e.stopPropagation();
        }} position='absolute' style={{ cursor: 'pointer' }} right='0' bottom='0' height='56px' width='100%' />
        <Box
          onClick={e => {
            ReactEditor.focus(editor);
            Transforms.insertNodes(editor, paragraph);
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
    </CardStyled>
  );
};

export default React.forwardRef(RichTextEditor);
