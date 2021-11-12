import React from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { Flex } from 'uikit';
import { Api } from 'apis';

interface upload {
  multiple?: boolean;
  uploadSuccess: (imgSrc: string) => void;
}

const Container = styled(Flex)`
  justify-content: center;
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

export const Upload: React.FC<upload> = ({ multiple, uploadSuccess }) => {
  const imageInput = React.useRef<HTMLInputElement>();
  // 上传图片
  const uploadFile = async () => {
    const file: any = new FileReader();
    const imageFile = imageInput.current.files;
    const imgMaxSize = 1024 * 1024 * 8;

    if (imageFile.length > 0) {
      for (let i = 0; i < imageFile.length; i++) {
        // 限制图片大小
        if (imageFile[i].size > imgMaxSize) return toast.error('超过图片上传大小');
        // 读取文件
        file.readAsDataURL(imageFile[i]);
        file.onload = async () => {
          imageInput.current.value = '';
          const res = await Api.CommonApi.uploadImg({
            base64: file.result,
            dir_name: 'common'
          });
          if (!Api.isSuccess(res)) toast.error('图片上传失败');
          uploadSuccess(res.data.full_path);
        };
      }
    }
  };

  return (
    <Container>
      <label htmlFor="upload-images">上传背景墙</label>
      <input id="upload-images" ref={imageInput} onChange={() => uploadFile()} multiple={multiple} type="file" accept="image/*" />
    </Container>
  );
};
