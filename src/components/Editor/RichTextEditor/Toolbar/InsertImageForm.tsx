import React, { useCallback } from 'react';
import { Flex, Button, Text } from 'uikit';
import styled, { DefaultTheme } from 'styled-components';
import { useSlate, useSlateStatic, ReactEditor } from 'slate-react';
import { Editor, Transforms, Element as SlateElement } from 'slate';
import { Icon } from 'components';
import {
  CustomElement,
  ImageElement,
  ImageEmptyElement,
  ParagraphElement,
} from '../../custom-types';
import { useToast } from 'hooks';
import { useTranslation } from 'contexts';
import { cutDownImg } from 'utils/imageCompression';
import { Api } from 'apis';
import { HUGE_ARTICLE_IMAGE_MAX_LEN } from 'config';
import client from 'utils/client';

interface InsertImageFormProps {
  multiple?: boolean;
  maxUploadLength?: number;
  size?: number;
}

const text = { text: '' };

const paragraph: ImageEmptyElement = { type: 'image-empty', children: [text] };

const InsertImageForm: React.FC<InsertImageFormProps> = ({
  multiple,
  maxUploadLength = 0,
  size,
}) => {
  const editor = useSlate();

  const { toastError } = useToast();
  const { t } = useTranslation();

  const insertImage = (
    editor,
    url,
    loading = false,
  ): {
    image: ImageElement;
  } => {
    const image: ImageElement = {
      type: 'image',
      url,
      loading,
      children: [text],
    };

    Transforms.insertNodes(editor, image);
    return {
      image,
    };
  };

  const handleChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      try {
        const { files } = event.target;
        if (!files.length) return;
        if (maxUploadLength + files.length > HUGE_ARTICLE_IMAGE_MAX_LEN)
          return toastError(t('uploadImgMaxMsg'));
        const compressImage = Array.from(files).map(file => {
          return cutDownImg(file);
        });
        const base64 = await Promise.all(compressImage);
        const loadingElement: CustomElement[] = [];
        base64.forEach(path => {
          const eles = insertImage(editor, path, true);
          loadingElement.push(eles.image);
        });

        const res = await Api.CommonApi.uploadImgList({
          base64,
          dir_name: 'common',
        });
        loadingElement.reverse().forEach(ele => {
          const path = ReactEditor.findPath(editor, ele);
          console.log(path);
          Transforms.removeNodes(editor, {
            at: ReactEditor.findPath(editor, ele),
          });
        });
        if (!Api.isSuccess(res)) {
          toastError(t('commonUploadBackgroundFail'));
          return;
        }
        let lastImage = null;
        base64.forEach((path, index) => {
          console.log('insertImage');
          const { image } = insertImage(editor, path);
          if (index === base64.length - 1) {
            lastImage = image;
          }
        });

        setTimeout(() => {
          const path = ReactEditor.findPath(editor, lastImage);
          const [nextEle, nextPath] = Editor.next(editor, { at: path }) || [
            null,
            null,
          ];
          if (!nextEle) {
            Transforms.insertNodes(editor, paragraph);
          }

          // const [afterEle, afterPath] = Editor.last(editor, path) || [
          //   null,
          //   null,
          // ];

          // if (
          //   afterEle &&
          //   (afterEle as any).type === 'image-empty' &&
          //   (afterEle as any).children[0]?.text === ''
          // ) {
          //   Transforms.removeNodes(editor, { at: afterPath }); // 图片节点后面或默认更一个空节点
          // }
        }, 0);
      } catch (error) {
        console.error(error);
      }
    },
    [toastError, t, editor],
  );

  return (
    <form action=''>
      <label htmlFor='upload-images' title={t('editorUploadImg')}>
        <Icon
          size={size}
          color='white_black'
          current
          name='icon-bianjiqi_tupianshangchuan745'
        />
        <input
          id='upload-images'
          name='upload-images'
          onChange={handleChange}
          multiple={multiple}
          type='file'
          accept='image/*'
          capture={!client.ios}
          // capture={true}
          hidden
        />
      </label>
    </form>
  );
};

export default InsertImageForm;
