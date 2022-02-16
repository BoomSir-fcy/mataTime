import React, { useCallback } from 'react';
import { Flex, Button, Text } from 'uikit';
import styled, { DefaultTheme } from 'styled-components';
import { useSlate, useSlateStatic, ReactEditor } from 'slate-react';
import { Editor, Transforms, Element as SlateElement } from 'slate';
import { Icon } from 'components';
import {
  CustomEditor,
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
import { HistoryEditor } from 'slate-history';

interface InsertImageFormProps {
  multiple?: boolean;
  maxUploadLength?: number;
  size?: number;
  color?: string;
}

const text = { text: '' };

const paragraph: ImageEmptyElement = { type: 'image-empty', children: [text] };

const InsertImageForm: React.FC<InsertImageFormProps> = ({
  multiple,
  maxUploadLength = 0,
  size,
  color,
}) => {
  const editor = useSlate();

  const { toastError } = useToast();
  const { t } = useTranslation();

  const insertImage = (
    editor: CustomEditor,
    url,
    loading = false,
  ): {
    image: ImageElement;
  } => {
    const image: ImageElement = {
      type: 'image',
      align: 'right',
      url,
      loading,
      children: [text],
    };
    HistoryEditor.withoutMerging(editor, () => {
      Transforms.insertNodes(editor, image);
    });
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
        // FIXME: 撤销有问题 只能直接更改当前元素
        // 也不能直接改 直接改撤销还是有问题
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
          HistoryEditor.withoutMerging(editor, () => {
            // Transforms.insertNodes(editor, image);
            Transforms.removeNodes(editor, {
              at: ReactEditor.findPath(editor, ele),
            });
          });
          // Transforms.removeNodes(editor, {
          //   at: ReactEditor.findPath(editor, ele),
          // });
        });
        if (!Api.isSuccess(res)) {
          toastError(t('commonUploadBackgroundFail'));
          return;
        }
        let lastImage = null;
        console.log(res, 'res');
        base64.forEach((path, index) => {
          console.log('insertImage');
          const { image } = insertImage(editor, res.data[index]?.full_path);
          if (index === base64.length - 1) {
            lastImage = image;
          }
        });
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
          color={color}
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
