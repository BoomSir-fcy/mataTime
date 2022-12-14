import React from 'react';
import styled from 'styled-components';
import { useSlate } from 'slate-react';
import { useToast } from 'hooks';
import { Box, Flex, Button, Svg } from 'uikit';
import { Emoji } from './emoji';
import { Icon } from 'components';
import { Api } from 'apis';
import client from 'utils/client';
import imageCompression, { cutDownImg } from 'utils/imageCompression';

import { useTranslation } from 'contexts/Localization';

const EditorToolbar = styled(Flex)`
  position: relative;
  i {
    margin-right: 20px !important;
  }
`;

const EmojiButton = ({ callbackEmoji }) => {
  const editor = useSlate();
  return <Emoji onChange={emoji => callbackEmoji(emoji, editor)} />;
};

const InsertImageButton: React.FC<{
  multiple?: boolean;
  maxUploadLength: number;
  callbackSelectImg?: () => void;
  onSuccess?: (imgList: string[]) => void;
  onError?: () => void;
}> = ({ multiple, maxUploadLength, callbackSelectImg, onSuccess, onError }) => {
  const { t } = useTranslation();
  const { toastError } = useToast();
  const size = 20;
  const imageInput = React.useRef<HTMLInputElement>();

  const readFileAsync = (file: any) =>
    new Promise(resolve => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = evt => resolve(evt.target.result);
    });

  const uploadFile = async () => {
    const imageFile: any = imageInput.current.files;
    const imgMaxSize = 1024 * 1024 * 20;
    const fileList: any[] = [];
    try {
      if (maxUploadLength + imageFile.length > 4)
        return toastError(t('uploadImgMaxMsg'));

      for (let image of imageFile) {
        const compressImage = await cutDownImg(image);
        fileList.push(compressImage);
      }
      const res = await Api.CommonApi.uploadImgList({
        base64: fileList,
        dir_name: 'common',
      });
      if (!Api.isSuccess(res)) toastError(t('commonUploadBackgroundFail'));
      const imgList = (res.data ?? []).map(item => item.full_path);
      onSuccess(imgList);
    } catch (error) {
      if ((error as Error).message === '1') {
        toastError(t('File format error'));
        return;
      }
      if ((error as Error).message === '2') {
        toastError(t('commonUploadMaxSize'));
        return;
      }
      console.error(error);
    } finally {
      onError();
    }
  };

  return (
    <React.Fragment>
      <label htmlFor='upload-images' title={t('editorUploadImg')}>
        <Icon size={size} color='white_black' current name='icon-tupian' />
        <input
          id='upload-images'
          name='upload-images'
          ref={imageInput}
          onChange={() => {
            callbackSelectImg();
            uploadFile();
          }}
          multiple={multiple}
          type='file'
          accept='image/*'
          capture={!client.ios}
          // capture={true}
          hidden
        />
      </label>
    </React.Fragment>
  );
};

export const Toolbar: React.FC<{
  callbackEmoji?: (data: string, data2: any) => void;
  callbackSelectImg?: () => void;
  callbackInserTopic?: (data: string) => void;
  callbackInserAt?: (data: string) => void;
  onError?: () => void;
  onSuccess?: (imgList: string[]) => void;
  selectImgLength: number;
  type?: string;
}> = React.memo(
  ({
    callbackEmoji,
    callbackSelectImg,
    callbackInserTopic,
    callbackInserAt,
    onError,
    onSuccess,
    selectImgLength,
    type,
  }) => {
    const size = 20;
    const { t } = useTranslation();

    return (
      <EditorToolbar alignItems='center'>
        <EmojiButton callbackEmoji={callbackEmoji} />
        {type === 'post' ? (
          <>
            <InsertImageButton
              multiple={true}
              maxUploadLength={selectImgLength}
              onSuccess={onSuccess}
              onError={onError}
              callbackSelectImg={callbackSelectImg}
            />
            <Icon
              size={size}
              color='white_black'
              current={1}
              name='icon-aite'
              onClick={callbackInserAt}
              title={t('editorUser')}
            />
            <Icon
              size={size}
              color='white_black'
              current={1}
              name='icon-a-xiaoxi1'
              onClick={callbackInserTopic}
              title={t('editorTopic')}
            />
          </>
        ) : null}
      </EditorToolbar>
    );
  },
);
