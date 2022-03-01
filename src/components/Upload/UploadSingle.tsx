import React, { ReactNode, useEffect, useState } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { BoxProps, Flex, Text, Box } from 'uikit';
import { useTranslation } from 'contexts/Localization';
import { BASE_IMAGE_URL } from 'config';
import { Loading } from 'components';
import { Api } from 'apis';
interface UploadProps extends BoxProps {
  url?: string;
  tips?: string | ReactNode;
  disabled?: boolean;
  uploadSuccess: (imgSrc: string) => void;
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
  const [imgUrl, setImgUrl] = useState('');
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
        // 读取文件
        setLoading(true);
        file.readAsDataURL(imageFile[i]);
        file.onload = async () => {
          imageInput.current.value = '';
          const res = await Api.CommonApi.uploadImg({
            base64: file.result,
            dir_name: 'common',
          });
          if (!Api.isSuccess(res)) toast.error(t('commonUploadBackgroundFail'));
          const path = res?.data?.path;
          setImgUrl(path);
          uploadSuccess(path);
        };
        setLoading(false);
        // setLoading(true);
        // setTimeout(() => {
        //   const full_path =
        //     'https://static.social.qgx.io/common/21c5f7be-7c6f-4e94-b7ec-567514d04e6d.jpg';
        //   const path = 'common/21c5f7be-7c6f-4e94-b7ec-567514d04e6d.jpg';
        //   setImgUrl(path);
        //   uploadSuccess(path);
        //   setLoading(false);
        // }, 2000);
      }
    }
  };

  useEffect(() => {
    if (url) {
      setImgUrl(url);
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
        {imgUrl ? (
          <StyledImg src={`${BASE_IMAGE_URL}${imgUrl}`} alt='' />
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
        accept='image/*'
      />

      {tips && (
        <Text mt='10px' color='textTips' small>
          {tips}
        </Text>
      )}
    </Container>
  );
};
