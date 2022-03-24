import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { BoxProps, Flex, Text, Box, Button } from 'uikit';
import { useTranslation } from 'contexts/Localization';
import { Icon, Loading } from 'components';
import { Api } from 'apis';
import client from 'utils/client';
import { cutDownImg } from 'utils/imageCompression';
import { BooleanValueNode } from 'graphql/language/ast';

const Container = styled(Flex)<{ scale: Scales; disabled?: boolean }>`
  flex-direction: column;
  input {
    position: absolute;
    left: -9999em;
    top: 0;
    opacity: 0;
  }
  .img-item,
  label {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${({ scale }) => `${style[scale].width}px`};
    height: ${({ scale }) => `${style[scale].height}px`};
    color: ${({ theme }) => theme.colors.text};
    background: ${({ theme }) => theme.colors.input};
    border-radius: ${({ theme }) => theme.radii.card};
  }
`;
const ImgFlex = styled(Flex)`
  flex-wrap: wrap;
  .img-item {
    margin-right: 8px;
  }
`;
const StyledImg = styled.img<{ scale: Scales }>`
  width: ${({ scale }) => `${style[scale].width}px`};
  height: ${({ scale }) => `${style[scale].height}px`};
  border-radius: ${({ theme }) => theme.radii.card};
`;

const CloseBtnBox = styled(Box)`
  position: absolute;
  /* z-index: 23; */
  right: -5px;
  top: -9px;
  background: ${({ theme }) => theme.colors.primaryDark};
  border-radius: 50%;
`;

const CloseBtn = styled(Button)`
  padding: 5px;
  height: 18px;
  width: 18px;
`;

const scales = {
  SM: 'sm',
  MD: 'md',
} as const;

type Scales = typeof scales[keyof typeof scales];
const style = {
  [scales.SM]: {
    height: 100,
    width: 100,
    iconSize: 30,
  },
  [scales.MD]: {
    height: 200,
    width: 200,
    iconSize: 60,
  },
};
interface UploadProps extends BoxProps {
  url?: string[];
  tips?: string | ReactNode;
  disabled?: boolean;
  maxNum?: number;
  scale?: Scales;
  multiple?: boolean;
  uploadSuccess?: (imgSrc: ImgItem[]) => void;
}
interface ImgItem {
  src?: string;
  id?: string;
  index?: number;
  loading?: boolean;
}

const IMAGE_MAX_LEN = 3;
export const UploadMultiple: React.FC<UploadProps> = ({
  url,
  tips,
  disabled,
  maxNum = 1,
  scale = 'md',
  multiple,
  uploadSuccess,
}) => {
  const imageInput = React.useRef<HTMLInputElement>();
  const { t } = useTranslation();
  const [imgUrl, setImgUrl] = useState<ImgItem[]>([]);

  // 上传图片
  const uploadFile = useCallback(async () => {
    const files = imageInput.current.files;
    const imgMaxSize = 1024 * 1024 * 5;

    if (!files.length) return;
    const len = imgUrl.length;
    if (len + files.length > IMAGE_MAX_LEN)
      return toast.error(t('uploadImgMaxMsg2', { value: IMAGE_MAX_LEN }));
    const compressImage = Array.from(files).map(file => {
      return cutDownImg(file);
    });
    const base64 = await Promise.all(compressImage);
    let list: ImgItem[] = base64.map((path, index) => {
      return {
        src: path,
        loading: true,
        id: `${len + index}`,
        index,
      };
    });
    const currentList = imgUrl.concat(list);
    setImgUrl(currentList);
    const res = await Api.CommonApi.uploadImgList({
      base64,
      dir_name: 'common',
    });
    if (!Api.isSuccess(res)) {
      toast.error(t('commonUploadBackgroundFail'));
      setImgUrl(prev => {
        const next = prev.filter(
          item => !list.find(subItem => subItem.id === item.id),
        );
        return next;
      });
      return;
    }
    const newList = currentList.map(item => {
      const old = list.find(subItem => subItem.id === item.id);
      if (old)
        return {
          ...item,
          src: res.data[old.index]?.full_path,
          loading: false,
        };
      return {
        ...item,
      };
    });
    setImgUrl(newList);
    if (uploadSuccess) uploadSuccess(newList.map(item => item.src));
  }, [imgUrl]);

  const handleRemove = useCallback(img => {
    setImgUrl(prev => prev.filter(item => item.src !== img.src));
  }, []);

  return (
    <Container scale={scale} disabled={disabled}>
      <ImgFlex>
        {imgUrl.map(item => (
          <Box key={item.id} className='img-item'>
            {item.loading && (
              <Box>
                <Loading visible={item.loading} />
              </Box>
            )}
            <StyledImg scale={scale} src={item.src} alt='' />
            <CloseBtnBox>
              <CloseBtn
                onClick={e => {
                  handleRemove(item);
                }}
                variant='tertiary'
              >
                <Icon size={10} name='icon-guanbi' />
              </CloseBtn>
            </CloseBtnBox>
          </Box>
        ))}

        {imgUrl.length === maxNum ? null : (
          <label htmlFor='upload-images'>
            <Text fontSize={`${style[scale].iconSize}px`}>+</Text>
          </label>
        )}
      </ImgFlex>
      <input
        id='upload-images'
        ref={imageInput}
        disabled={disabled}
        onChange={() => uploadFile()}
        type='file'
        multiple={multiple}
        // accept='.jpeg, .jpg, .png, .gif'
        accept='image/*'
        capture={!client.ios}
        hidden
      />

      {tips ? tips : null}
    </Container>
  );
};
