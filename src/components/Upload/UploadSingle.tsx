import React, { ReactNode, useEffect, useState } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { BoxProps, Flex, Text, Box } from 'uikit';
import { useTranslation } from 'contexts/Localization';
import { BASE_IMAGE_URL } from 'config';
import { Loading } from 'components';
import { Api } from 'apis';
import { useImmer } from 'use-immer';
import client from 'utils/client';
interface UploadProps extends BoxProps {
  url?: string;
  tips?: string | ReactNode;
  disabled?: boolean;
  uploadSuccess: (imgSrc: string, width?: number, height?: number) => void;
}

const Container = styled(Flex)<{ disabled?: boolean }>`
  flex-direction: column;
  input {
    position: absolute;
    left: -9999em;
    top: 0;
    opacity: 0;
  }
  label {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 200px;
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
    color: ${({ theme }) => theme.colors.text};
    background: ${({ theme }) => theme.colors.input};
    border-radius: ${({ theme }) => theme.radii.card};
  }
  img {
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  }
`;

const StyledImg = styled.img`
  width: 200px;
  height: 200px;
  border-radius: ${({ theme }) => theme.radii.card};
`;

export const UploadSingle: React.FC<UploadProps> = ({
  url,
  tips,
  disabled,
  uploadSuccess,
}) => {
  const imageInput = React.useRef<HTMLInputElement>();
  const { t } = useTranslation();
  const [state, setState] = useImmer({
    imgUrl: '',
  });
  const [loading, setLoading] = useState(false);

  // 上传图片
  const uploadFile = async () => {
    const file: any = new FileReader();
    const imageFile = imageInput.current.files;
    const imgMaxSize = 1024 * 1024 * 5;

    if (imageFile.length > 0) {
      for (let i = 0; i < imageFile.length; i++) {
        // 限制图片大小
        if (imageFile[i].size > imgMaxSize)
          return toast.error(t('commonUploadMaxSize'));
        if (
          !['image/jpeg', 'image/jpg', 'image/png', 'image/gif'].includes(
            imageFile[i].type,
          )
        )
          return toast.error(t('commonUploadType'));
        // 读取文件
        setLoading(true);
        file.readAsDataURL(imageFile[i]);
        file.onload = async () => {
          // 获取图片长宽
          var image = new Image();
          image.src = file.result;
          let width = 0,
            height = 0;
          image.onload = function () {
            width = image.width;
            height = image.height;
          };
          imageInput.current.value = '';
          const res = await Api.CommonApi.uploadImg({
            base64: file.result,
            dir_name: 'common',
          });
          if (!Api.isSuccess(res)) toast.error(t('commonUploadBackgroundFail'));
          const path = res?.data?.path;
          setLoading(false);
          setState(p => {
            p.imgUrl = path;
          });
          uploadSuccess(path, width, height);
        };
      }
    }
  };

  useEffect(() => {
    if (url) {
      setState(p => {
        p.imgUrl = url;
      });
    }
  }, [url]);
  return (
    <Container disabled={disabled}>
      <label htmlFor='upload-images'>
        {loading && (
          <Box>
            <Loading visible={loading} />
          </Box>
        )}
        {state.imgUrl ? (
          <StyledImg src={`${BASE_IMAGE_URL}${state.imgUrl}`} alt='' />
        ) : (
          <Text fontSize='61px'>+</Text>
        )}
      </label>
      <input
        id='upload-images'
        ref={imageInput}
        disabled={disabled}
        onChange={() => uploadFile()}
        type='file'
        // accept='.jpeg, .jpg, .png, .gif'
        accept='image/*'
        capture={!client.ios}
        hidden
      />

      {tips ? tips : null}
    </Container>
  );
};
