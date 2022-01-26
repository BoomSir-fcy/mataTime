import React, { ReactNode, useState } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { BoxProps, Flex, Image, Text } from 'uikit';
import { Api } from 'apis';
import { useTranslation } from 'contexts/Localization';
interface UploadProps extends BoxProps {
  url?: string;
  tips?: string | ReactNode;
  uploadSuccess: (imgSrc: string) => void;
}

const Container = styled(Flex)`
  position: relative;
  flex-direction: column;
  input {
    position: absolute;
    left: -9999em;
    top: 0;
    opacity: 0;
  }
  label {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 200px;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.text};
    background: ${({ theme }) => theme.colors.input};
    border-radius: ${({ theme }) => theme.radii.card};
  }
`;

export const UploadSingle: React.FC<UploadProps> = ({
  url,
  tips,
  uploadSuccess,
}) => {
  const imageInput = React.useRef<HTMLInputElement>();
  const { t } = useTranslation();
  const [imgUrl, setImgUrl] = useState(url);
  // 上传图片
  const uploadFile = async () => {
    const file: any = new FileReader();
    const imageFile = imageInput.current.files;
    const imgMaxSize = 1024 * 1024 * 2;

    if (imageFile.length > 0) {
      for (let i = 0; i < imageFile.length; i++) {
        // 限制图片大小
        if (imageFile[i].size > imgMaxSize)
          return toast.error(t('commonUploadMaxSize'));
        // 读取文件
        // file.readAsDataURL(imageFile[i]);
        // file.onload = async () => {
        //   imageInput.current.value = '';
        //   const res = await Api.CommonApi.uploadImg({
        //     base64: file.result,
        //     dir_name: 'common',
        //   });
        //   if (!Api.isSuccess(res)) toast.error(t('commonUploadBackgroundFail'));
        //   // const full_path = res?.data?.full_path;
        //   setImgUrl(full_path);
        //   uploadSuccess(full_path);
        // };
        const full_path =
          'https://static.social.qgx.io/common/634e35c1-e073-4df7-8bec-eefb99afd7a7.jpg';
        setImgUrl(full_path);
        uploadSuccess(full_path);
      }
    }
  };

  return (
    <Container>
      {imgUrl ? (
        <img src={imgUrl} width='200px' height='200px' alt='' />
      ) : (
        <>
          <label htmlFor='upload-images'>
            <Text fontSize='61px'>+</Text>
          </label>
          <input
            id='upload-images'
            ref={imageInput}
            onChange={() => uploadFile()}
            type='file'
            accept='image/*'
          />
        </>
      )}

      {tips && (
        <Text mt='10px' color='textTips' small>
          {tips}
        </Text>
      )}
    </Container>
  );
};
