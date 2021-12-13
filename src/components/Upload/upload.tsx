import React from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { Flex, Text } from 'uikit';
import { Api } from 'apis';
import { useTranslation } from 'contexts/Localization';
interface upload {
  multiple?: boolean;
  uploadSuccess: (imgSrc: string) => void;
}

const Container = styled(Flex)`
  position: relative;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
    width: 123px;
    height: 35px;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.backgroundPrimary};
    border-radius: ${({ theme }) => theme.radii.card};
  }
`;

const Mask = styled(Flex)`
  width: 100%;
  height: 42px;
  margin-top: 12px;
  justify-content: center;
  align-items: center;
  border-radius: 0 0 ${({ theme }) => theme.radii.card}
    ${({ theme }) => theme.radii.card};
  background-color: rgba(25, 31, 45, 0.5);
`;

export const Upload: React.FC<upload> = ({ multiple, uploadSuccess }) => {
  const imageInput = React.useRef<HTMLInputElement>();
  const { t } = useTranslation();
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
        file.readAsDataURL(imageFile[i]);
        file.onload = async () => {
          imageInput.current.value = '';
          const res = await Api.CommonApi.uploadImg({
            base64: file.result,
            dir_name: 'common'
          });
          if (!Api.isSuccess(res)) toast.error(t('commonUploadBackgroundFail'));
          uploadSuccess(res.data.full_path);
        };
      }
    }
  };

  return (
    <Container>
      <label htmlFor="upload-images">{t('commonUploadBackground')}</label>
      <input
        id="upload-images"
        ref={imageInput}
        onChange={() => uploadFile()}
        multiple={multiple}
        type="file"
        accept="image/*"
      />
      <Mask>
        <Text color="textTips">{t('commonUploadBackgroundTips')}</Text>
      </Mask>
    </Container>
  );
};
