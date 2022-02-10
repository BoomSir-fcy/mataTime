import React, { useCallback } from 'react';
import { Flex, Button, Text } from 'uikit';
import styled, { DefaultTheme } from 'styled-components';
import { useSlate, useSlateStatic, ReactEditor } from 'slate-react';
import { Editor, Transforms, Element as SlateElement } from 'slate';
import { Icon } from 'components';
import {
  CustomElement,
  ImageElement,
  ParagraphElement,
} from '../../custom-types';
import { useToast } from 'hooks';
import { useTranslation } from 'contexts';
import { cutDownImg } from 'utils/imageCompression';
import { Api } from 'apis';
import { HUGE_ARTICLE_IMAGE_MAX_LEN } from 'config';

interface InsertImageFormProps {
  multiple?: boolean;
  maxUploadLength?: number;
}

const InsertImageForm: React.FC<InsertImageFormProps> = ({
  multiple,
  maxUploadLength = 0,
}) => {
  const editor = useSlateStatic();

  const { toastError } = useToast();
  const { t } = useTranslation();

  const insertImage = (
    editor,
    url,
    loading = false,
  ): {
    image: ImageElement;
    paragraph: ParagraphElement;
  } => {
    const text = { text: '' };
    const image: ImageElement = {
      type: 'image',
      url,
      loading,
      children: [text],
    };
    const paragraph: ParagraphElement = { type: 'paragraph', children: [text] };
    Transforms.insertNodes(editor, image);
    Transforms.insertNodes(editor, paragraph);
    // setTimeout(() => {
    //   Transforms.removeNodes(editor, {
    //     at: ReactEditor.findPath(editor, paragraph),
    //   });
    // }, 10000);
    return {
      image,
      paragraph,
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
          loadingElement.push(eles.paragraph);
        });

        const res = await Api.CommonApi.uploadImgList({
          base64,
          dir_name: 'common',
        });
        // loadingElement.forEach(element => {
        //   Transforms.removeNodes(editor, {
        //     at: ReactEditor.findPath(editor, element),
        //   });
        // });
        if (!Api.isSuccess(res)) {
          toastError(t('commonUploadBackgroundFail'));
          return;
        }
        // base64.forEach(path => {
        //   console.log('insertImage');
        //   insertImage(editor, path);
        // });
      } catch (error) {
        console.error(error);
      }
    },
    [toastError, t, editor],
  );

  return (
    <form action=''>
      <input
        onChange={handleChange}
        type='file'
        name='editor-image'
        id='editor-image'
        multiple={multiple}
        accept='image/*'
      />
    </form>
  );
};

export default InsertImageForm;
