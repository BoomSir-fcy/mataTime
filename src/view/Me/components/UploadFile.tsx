import React, { useCallback, useState } from 'react';
import { Box, Flex, Button, Text, Input, Overlay } from 'uikit';
import BtnIcon from 'view/Tribe/components/BtnIcon';
import { useTranslation } from 'contexts/Localization';
import { ModalWrapper, Icon, Loading } from 'components';
import { useDropzone } from 'react-dropzone';
import { useToast } from 'hooks';
import styled from 'styled-components';
import { Api } from 'apis';
import getFileExt from 'utils/getFileExt';
import { TEIBE_FILE_TYPES } from 'config';
import FileIcon from 'components/Icon/FileIcon';
import Dots from 'components/Loader/Dots';
import { Circle } from 'rc-progress';
import useTheme from 'hooks/useTheme';

const UpdateBtnSmall = styled(Flex)`
  cursor: pointer;
  border-radius: 8px;
  /* border: 1px dashed ${({ theme }) => theme.colors.white_black}; */
  background-color: ${({ theme }) => theme.colors.input};
  width: auto;
  padding: 16px 8px;
  width: 365px;
  max-width: 100%;
  height: 148px;
  position: relative;
`;

const FormStyled = styled.form`
  max-width: calc(100vw - 48px);
`;

// const OverlayStyled = styled(Overlay)`
//   position: absolute;
// `;

interface UploadFileButtonProps {
  tribe_id: number;
  onSuccess?: () => void;
}
const UploadFileButton: React.FC<UploadFileButtonProps> = ({
  tribe_id,
  onSuccess,
}) => {
  const { t } = useTranslation();
  const { toastSuccess, toastError } = useToast();

  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [value, setValue] = useState('');
  const [fileInfo, setFileInfo] = useState({
    name: '',
    ext: '',
    path: '',
    full_path: '',
    size: 0,
  });

  // const [percent, setPercent] = useState(0);

  // const onUploadProgress = useCallback((progress: ProgressEvent) => {
  //   setPercent(progress?.loaded / progress?.total);
  // }, []);

  const { theme } = useTheme();

  const handleUpload = useCallback(
    async (file: File) => {
      if (!file) {
        toastError(t('Unsupported file type'));
        return;
      }
      const ext = getFileExt(file.name);
      if (!TEIBE_FILE_TYPES.includes(ext)) return;
      // const fileType = await fileTypeFromStream('Unicorn.png');
      // console.log(fileType);

      const formData = new FormData();
      formData.append('file', file);
      formData.append('dir_name', file.name);
      formData.append('ext', ext);
      setLoading(true);
      const res = await Api.CommonApi.uploadFile(formData);
      if (Api.isSuccess(res)) {
        setFileInfo({
          name: file.name,
          ext,
          size: file.size,
          path: res.data.path,
          full_path: res.data.full_path,
        });
      }
      setLoading(false);
      if (!value) {
        setValue(file.name);
      }
    },
    [toastError, value, t],
  );

  const handleChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      try {
        const file = event.target.files[0];
        // if (!file) return;
        handleUpload(file);
      } catch (error) {
        console.error(error);
      }
    },
    [handleUpload],
  );

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: '.doc,.docx,.xls,.xlsx,.pdf,.txt,.ppt',
    multiple: false,
    noClick: true,
    onDrop: files => {
      handleUpload(files[0]);
    },
  });

  const handleSubmit = useCallback(async () => {
    setSaveLoading(true);
    const res = await Api.TribeApi.triebFileCreate({
      url: fileInfo.full_path,
      file_name: value,
      tribe_id,
    });

    if (Api.isSuccess(res)) {
      toastSuccess(t('Upload successful'));
      setVisible(false);
      if (onSuccess) onSuccess();
    }
    setSaveLoading(false);
  }, [tribe_id, value, fileInfo]);

  return (
    <>
      <BtnIcon
        onClick={() => setVisible(true)}
        name='icon-shangchuan1'
        text={t('Upload file')}
      />
      <ModalWrapper
        title={t('Upload file')}
        creactOnUse
        visible={visible}
        setVisible={setVisible}
      >
        <FormStyled
          action=''
          onSubmit={event => {
            event.preventDefault();
          }}
        >
          <Text mb='12px'>* {t('F-Title')}</Text>
          <Input
            value={value}
            noShadow
            onChange={event => {
              setValue(event.target.value);
            }}
            style={{ padding: '0 16px' }}
            placeholder={t('Please enter the file title')}
          />
          <Text mt='16px' mb='16px'>
            * {t('Upload file')}
          </Text>
          <label
            style={{ position: 'relative' }}
            htmlFor='upload-file'
            title={t('editorUploadImg')}
          >
            <UpdateBtnSmall
              flexDirection='column'
              alignItems='center'
              justifyContent='space-around'
              {...getRootProps({ className: 'dropzone' })}
            >
              <Icon size={38} color='white_black' current name='icon-tianjia' />
              <Text ml='8px'>{t('Click upload or drag the file here')}</Text>
              <input
                id='upload-file'
                name='upload-file'
                onChange={handleChange}
                type='file'
                accept='.doc,.docx, .xls, .xlsx, .pdf, .txt, .ppt'
                hidden
              />
              <Loading zIndex={2} overlay visible={loading} />
              {/* <OverlayStyled show={loading} />
              {loading && (
                <Box
                  position='absolute'
                  top='50%'
                  left='50%'
                  style={{ transform: 'translate(-50%, -50%)' }}
                  width='100px'
                  height='100px'
                  zIndex={10}
                >
                  <Circle
                    percent={percent}
                    strokeWidth={10}
                    trailWidth={2}
                    strokeColor={theme.colors.textPrimary}
                  />
                </Box>
              )} */}
            </UpdateBtnSmall>
          </label>
          <Flex alignItems='center' height='36px'>
            {fileInfo.name && (
              <>
                <FileIcon ext={fileInfo.ext} />
                <Text ellipsis maxWidth='100%' width='325px' ml='8px'>
                  {fileInfo.name}
                </Text>
              </>
            )}
          </Flex>
          <Text fontSize='14px' color='textTips'>
            {t(
              'It is recommended that the size of the uploaded document is within 100MB',
            )}
          </Text>
          <Text fontSize='14px' color='textTips'>
            {t('Only document formats are supported:')}
            {TEIBE_FILE_TYPES.join(',')}
          </Text>
          <Flex mt='16px' justifyContent='center'>
            <Button
              padding='0 40px'
              size='md'
              onClick={() => handleSubmit()}
              type='submit'
              disabled={saveLoading || !fileInfo.full_path || !value}
            >
              {saveLoading ? <Dots>{t('Confirming')}</Dots> : t('Confirm')}
            </Button>
          </Flex>
        </FormStyled>
      </ModalWrapper>
    </>
  );
};

export default UploadFileButton;
