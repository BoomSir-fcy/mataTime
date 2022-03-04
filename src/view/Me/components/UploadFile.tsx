import React, { useCallback, useState } from 'react';
import { Box, Flex, Button, Text, Input } from 'uikit';
import BtnIcon from 'view/Tribe/components/BtnIcon';
import { useTranslation } from 'contexts/Localization';
import { ModalWrapper, Icon } from 'components';
import styled from 'styled-components';
import { Api } from 'apis';
import getFileExt from 'utils/getFileExt';
import { TEIBE_FILE_TYPES } from 'config';
import FileIcon from 'components/Icon/FileIcon';

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
`;

interface UploadFileButtonProps {
  tribe_id: number;
}
const UploadFileButton: React.FC<UploadFileButtonProps> = ({ tribe_id }) => {
  const { t } = useTranslation();

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

  const handleChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      try {
        const file = event.target.files[0];
        if (!file) return;
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
      } catch (error) {
        console.error(error);
      }
    },
    [],
  );

  const handleSubmit = useCallback(async () => {
    setSaveLoading(true);
    const res = await Api.TribeApi.triebFileCreate({
      url: fileInfo.full_path,
      file_name: value,
      tribe_id,
    });

    if (Api.isSuccess(res)) {
      setVisible(false);
    }
    setSaveLoading(false);
  }, [tribe_id, value, fileInfo]);

  return (
    <>
      <BtnIcon
        onClick={() => setVisible(true)}
        name='icon-shangchuan1'
        text={t('上传文件')}
      />
      <ModalWrapper
        title={t('上传文件')}
        creactOnUse
        visible={visible}
        setVisible={setVisible}
      >
        <form
          action=''
          onSubmit={event => {
            event.preventDefault();
          }}
        >
          <Text mb='12px'>* 文件标题</Text>
          <Input
            padding='0 5px'
            value={value}
            noShadow
            onChange={event => {
              setValue(event.target.value);
            }}
          />
          <Text mt='16px' mb='16px'>
            * 上传文件
          </Text>
          <label htmlFor='upload-file' title={t('editorUploadImg')}>
            <UpdateBtnSmall
              flexDirection='column'
              alignItems='center'
              justifyContent='space-around'
            >
              <Icon size={38} color='white_black' current name='icon-tianjia' />
              <Text ml='8px'>点击上传或将文件拖到这里</Text>
            </UpdateBtnSmall>
            <input
              id='upload-file'
              name='upload-file'
              onChange={handleChange}
              type='file'
              accept='.doc,.docx, .xls, .xlsx, .pdf, .txt, .ppt'
              hidden
            />
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
            建议上传文档的大小为：100MB以内
          </Text>
          <Text fontSize='14px' color='textTips'>
            仅支持文档格式：{TEIBE_FILE_TYPES.join(',')}
          </Text>
          <Flex mt='16px' justifyContent='center'>
            <Button
              padding='0 40px'
              size='md'
              onClick={() => handleSubmit()}
              type='submit'
            >
              确认
            </Button>
          </Flex>
        </form>
      </ModalWrapper>
    </>
  );
};

export default UploadFileButton;
