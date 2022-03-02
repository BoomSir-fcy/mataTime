import React, { useCallback, useEffect, useState } from 'react';
import { Flex, Button, Text, Box } from 'uikit';
import styled, { DefaultTheme } from 'styled-components';
import { useSlate, useSlateStatic, ReactEditor } from 'slate-react';
import { Editor, Transforms, Element as SlateElement } from 'slate';
import { Icon, ModalWrapper } from 'components';
import {
  CustomEditor,
  CustomElement,
  ImageElement,
  ImageEmptyElement,
  ParagraphElement,
} from '../../custom-types';
import { useToast } from 'hooks';
import { useTranslation } from 'contexts';
import { cutDownImg } from 'utils/imageCompression';
import { Api } from 'apis';
import { HUGE_ARTICLE_IMAGE_MAX_LEN } from 'config';
import client from 'utils/client';
import { HistoryEditor } from 'slate-history';
import DraggableImages, { ImgItem } from './DraggableImages';
import defaultValue from '../defaultValue';

interface InsertImageFormProps {
  multiple?: boolean;
  maxUploadLength?: number;
  size?: number;
  color?: string;
}

const UpdateBtn = styled(Box)`
  cursor: pointer;
  border-radius: 8px;
  width: 104px;
  height: 104px;
  /* border: 1px dashed; */
  border: 1px dashed ${({ theme }) => theme.colors.white_black};
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const UpdateBtnSmall = styled(Box)`
  cursor: pointer;
  border-radius: 8px;
  border: 1px dashed ${({ theme }) => theme.colors.white_black};
  width: auto;
  display: inline-flex;
  padding: 5px 8px;
`;

const text = { text: '' };

const paragraph: ParagraphElement = { type: 'paragraph', children: [text] };

export const insertImages = (editor: CustomEditor, urls: string[]) => {
  const images = urls.map(url => {
    const image: ImageElement = {
      type: 'image',
      full: false,
      url,
      loading: false,
      children: [text],
    };
    return image;
  });
  Transforms.insertNodes(editor, images);
};

const InsertImageForm: React.FC<InsertImageFormProps> = ({
  multiple,
  maxUploadLength = 0,
  size,
  color,
}) => {
  const editor = useSlate();

  const { toastError } = useToast();
  const { t } = useTranslation();

  const [imgList, setImgList] = useState<ImgItem[]>([]);

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
        const { length } = imgList;
        let list: ImgItem[] = base64.map((path, index) => {
          return {
            src: path,
            loading: true,
            type: 'sortable-card',
            id: `${length + index}`,
            index,
          };
        });
        setImgList(prev => {
          return prev.concat(list);
        });
        const res = await Api.CommonApi.uploadImgList({
          base64,
          dir_name: 'common',
        });
        if (!Api.isSuccess(res)) {
          toastError(t('commonUploadBackgroundFail'));
          setImgList(prev => {
            const next = prev.filter(
              item => !list.find(subItem => subItem.id === item.id),
            );
            return next;
          });
          return;
        }
        setImgList(prev => {
          return prev.map(item => {
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
        });
        // list = list.map((path, index) => {
        //   return {
        //     src: res.data[index]?.full_path,
        //     loading: false,
        //     type: 'sortable-card',
        //     id: `${index}`,
        //     index,
        //   }
        // });
      } catch (error) {
        console.error(error);
      }
    },
    [toastError, t, editor, imgList, setImgList],
  );

  // const handleChange = useCallback(
  //   async (event: React.ChangeEvent<HTMLInputElement>) => {
  //     try {
  //       const { files } = event.target;
  //       if (!files.length) return;
  //       if (maxUploadLength + files.length > HUGE_ARTICLE_IMAGE_MAX_LEN)
  //         return toastError(t('uploadImgMaxMsg'));
  //       const compressImage = Array.from(files).map(file => {
  //         return cutDownImg(file);
  //       });
  //       const base64 = await Promise.all(compressImage);
  //       const loadingElement: CustomElement[] = [];
  //       // FIXME: 撤销有问题 只能直接更改当前元素
  //       // 也不能直接改 直接改撤销还是有问题
  //       base64.forEach(path => {
  //         const eles = insertImage(editor, path, true);
  //         loadingElement.push(eles.image);
  //       });

  //       const res = await Api.CommonApi.uploadImgList({
  //         base64,
  //         dir_name: 'common',
  //       });
  //       loadingElement.reverse().forEach(ele => {
  //         const path = ReactEditor.findPath(editor, ele);
  //         console.log(path);
  //         HistoryEditor.withoutMerging(editor, () => {
  //           // Transforms.insertNodes(editor, image);
  //           Transforms.removeNodes(editor, {
  //             at: ReactEditor.findPath(editor, ele),
  //           });
  //         });
  //         // Transforms.removeNodes(editor, {
  //         //   at: ReactEditor.findPath(editor, ele),
  //         // });
  //       });
  //       if (!Api.isSuccess(res)) {
  //         toastError(t('commonUploadBackgroundFail'));
  //         return;
  //       }
  //       let lastImage = null;
  //       console.log(res, 'res');
  //       base64.forEach((path, index) => {
  //         console.log('insertImage');
  //         const { image } = insertImage(editor, res.data[index]?.full_path);
  //         if (index === base64.length - 1) {
  //           lastImage = image;
  //         }
  //       });
  //       console.log(editor.history.undos)
  //       editor.history.undos = editor.history.undos.filter(item => {
  //         const subUndos = item.filter(subItem => (subItem.type === 'remove_node' || subItem.type === 'insert_node') && (subItem.node as any)?.type === 'image' && (subItem.node as any)?.loading)
  //         return !!subUndos.length
  //       })
  //       // editor.apply()
  //       // console.log(editor.history.undos)

  //     } catch (error) {
  //       console.error(error);
  //     }
  //   },
  //   [toastError, t, editor],
  // );

  const [visible, setVisible] = useState(false);

  const handleInsetImgList = useCallback(() => {
    const insertIds: string[] = [];
    const srcs: string[] = [];
    imgList.forEach(
      item => {
        if (!item.loading) {
          insertIds.push(item.id);
          srcs.push(item.src);
        }
      },
      [editor, imgList],
    );
    setImgList(prev => {
      return prev.filter(item => !insertIds.includes(item.id));
    });
    insertImages(editor, srcs);
    Transforms.insertNodes(editor, defaultValue);
    setVisible(false);
  }, [imgList, setImgList, setVisible]);

  return (
    <>
      {/* <form action=''>
        <label htmlFor='upload-images' title={t('editorUploadImg')}>
          <Icon
            size={size}
            color={color}
            current
            name='icon-bianjiqi_tupianshangchuan745'
          />
          <input
            id='upload-images'
            name='upload-images'
            onChange={handleChange}
            multiple={multiple}
            type='file'
            accept='image/*'
            capture={!client.ios}
            // capture={true}
            hidden
          />
        </label>
      </form> */}
      <Icon
        size={size}
        color={color}
        current
        onClick={() => {
          setVisible(true);
        }}
        name='icon-bianjiqi_tupianshangchuan745'
      />
      <ModalWrapper
        title={t('上传图片')}
        creactOnUse
        visible={visible}
        setVisible={setVisible}
      >
        <Box height='500px' maxHeight='80vh' width='800px' maxWidth='80vw'>
          {imgList.length ? (
            <Flex
              padding='5px 0'
              flexDirection='column'
              width='100%'
              height='100%'
            >
              <form action=''>
                <label htmlFor='upload-images' title={t('editorUploadImg')}>
                  <UpdateBtnSmall>
                    <Icon
                      size={size}
                      color={color}
                      current
                      name='icon-bianjiqi_tupianshangchuan745'
                    />
                    <Text ml='8px'>本地上传</Text>
                  </UpdateBtnSmall>
                  <input
                    id='upload-images'
                    name='upload-images'
                    onChange={handleChange}
                    multiple={multiple}
                    type='file'
                    accept='image/*'
                    capture={!client.ios}
                    // capture={true}
                    hidden
                  />
                </label>
              </form>
              <Flex flex={1} width='100%'>
                <DraggableImages imgList={imgList} setImgList={setImgList} />
              </Flex>
              <Flex alignItems='center' justifyContent='flex-end'>
                <Text>已上传 {imgList.length} 张图片，拖拽可调整顺序</Text>
                <Button onClick={handleInsetImgList} ml='16px'>
                  插入图片
                </Button>
              </Flex>
            </Flex>
          ) : (
            <Flex
              width='100%'
              height='100%'
              justifyContent='center'
              alignItems='center'
            >
              <Flex flexDirection='column' alignItems='center'>
                <form action=''>
                  <label htmlFor='upload-images' title={t('editorUploadImg')}>
                    <UpdateBtn>
                      <Icon size={28} color='white_black' name='icon-tianjia' />
                    </UpdateBtn>
                    <input
                      id='upload-images'
                      name='upload-images'
                      onChange={handleChange}
                      multiple={multiple}
                      type='file'
                      accept='image/*'
                      capture={!client.ios}
                      // capture={true}
                      hidden
                    />
                  </label>
                </form>
                <Text mt='12px'>上传图片</Text>
                <Text fontSize='14px' color='textTips'>
                  支持 JPG、JPEG、PNG 等格式
                </Text>
              </Flex>
            </Flex>
          )}
        </Box>
      </ModalWrapper>
    </>
  );
};

export default InsertImageForm;
