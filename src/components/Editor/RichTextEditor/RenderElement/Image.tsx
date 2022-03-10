import React, { useCallback, useState } from 'react';
import { Box, BoxProps, Button, Flex } from 'uikit';
import styled from 'styled-components';
import {
  useSlateStatic,
  ReactEditor,
  useSelected,
  useFocused,
} from 'slate-react';
import {
  Transforms,
  createEditor,
  Descendant,
  Editor,
  Element as SlateElement,
} from 'slate';
import { Loading, Icon } from 'components';
import { mt } from './styleds';
import { ImageElement } from 'components/Editor/custom-types';
import { useTranslation } from 'contexts';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

export const ImageStyled = styled.img`
  max-width: 100%;
  max-height: 20em;
  min-width: 105px;
  text-align: center;
`;

export const ImageStyledFull = styled.img`
  max-width: 100%;
  min-width: 105px;
`;

export const BoxStyled = styled(Box)<{ selected?: boolean }>`
  display: inline-block;
  line-height: 0; /* 去除 inline-block 底部间距 */
  outline: ${({ selected, theme }) =>
    selected ? `3px solid ${theme.colors.textPrimary}` : 'none'};
`;

export const BoxStyledWrapper = styled(Box)<{ align?: string }>`
  ${mt};
  text-align: center;
  /* text-align: ${({ align }) => align || 'right'}; */
`;

const CloseBtnBox = styled(Box)`
  position: absolute;
  right: -10px;
  z-index: 23;
  top: -10px;
  background: ${({ theme }) => theme.colors.primaryDark};
  border-radius: 50%;
`;
const CloseBtn = styled(Button)`
  padding: 5px;
  height: 24px;
  width: 24px;
`;

interface ImageProps {
  attributes: unknown;
  element: unknown;
  isEditor?: boolean;
}

interface ImageStyledRenderProps extends BoxProps {
  full?: boolean; // 全屏展示
  src: string;
  list?: string[];
  index?: number;
}

export const ImageStyledRender: React.FC<ImageStyledRenderProps> = ({
  full,
  src,
  list,
  index,
  ...props
}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [previewImgList, setPreviewImgList] = useState([]);
  const [photoIndex, setPhotoIndex] = useState(0);

  const preViewImg = useCallback(
    i => {
      if (!i) return;
      if (list) return;
      const preList = [...list.slice(i), ...list.slice(0, i)];
      setPreviewImgList(preList);
      setPhotoIndex(0);
      setModalIsOpen(true);
    },
    [list, setPreviewImgList, setModalIsOpen],
  );

  return (
    <BoxStyledWrapper {...props}>
      {modalIsOpen && (
        <Lightbox
          mainSrc={previewImgList[photoIndex]}
          nextSrc={previewImgList[(photoIndex + 1) % previewImgList.length]}
          prevSrc={
            previewImgList[
              (photoIndex + previewImgList.length - 1) % previewImgList.length
            ]
          }
          onCloseRequest={() => setModalIsOpen(false)}
          onMovePrevRequest={() =>
            setPhotoIndex(
              pre => (pre + previewImgList.length - 1) % previewImgList.length,
            )
          }
          onMoveNextRequest={() =>
            setPhotoIndex(pre => (pre + 1) % previewImgList.length)
          }
        />
      )}
      <BoxStyled>
        {full ? (
          <ImageStyledFull
            style={{ cursor: list ? 'zoom-in' : 'inherit' }}
            onClick={() => preViewImg(index)}
            src={src}
          />
        ) : (
          <ImageStyled
            style={{ cursor: list ? 'zoom-in' : 'inherit' }}
            onClick={() => preViewImg(index)}
            src={src}
            alt=''
          />
        )}
      </BoxStyled>
    </BoxStyledWrapper>
  );
};

const Image = ({ attributes, children, element, isEditor }) => {
  const editor = useSlateStatic();
  const { t } = useTranslation();

  const removeHandle = useCallback(() => {
    try {
      const path = ReactEditor.findPath(editor, element);
      const [nextEle, nextPath] = Editor.next(editor, { at: path }) || [
        null,
        null,
      ];
      if (
        nextEle &&
        (nextEle as any).type === 'image-empty' &&
        (nextEle as any).children[0]?.text === ''
      ) {
        Transforms.removeNodes(editor, { at: nextPath }); // 图片节点后面或默认更一个空节点
      }
      Transforms.removeNodes(editor, { at: path });
    } catch (error) {
      console.error(error);
    }
  }, [editor]);

  const changeAlignHandle = useCallback(() => {
    const path = ReactEditor.findPath(editor, element);
    const newProperties: Partial<ImageElement> = {
      full: !element.full,
    };
    Transforms.setNodes<ImageElement>(editor, newProperties, { at: path });
  }, [editor, element]);

  const selected = useSelected();
  const focused = useFocused();

  return (
    <Box {...attributes}>
      {children}
      <BoxStyledWrapper align={element?.align}>
        <BoxStyled
          contentEditable={false}
          selected={isEditor && selected && focused}
          position='relative'
          display='inline-block'
        >
          <Loading zIndex={2} overlay visible={element.loading} />
          {/* <ImageStyled src={element.url} alt='' /> */}
          {element.full ? (
            <ImageStyledFull src={element.url} />
          ) : (
            <ImageStyled src={element.url} alt='' />
          )}
          <Flex
            justifyContent='center'
            position='absolute'
            bottom='0'
            width='100%'
          >
            <Box
              style={{
                opacity: isEditor && selected && focused ? 1 : 1,
              }}
              background='rgba(0,0,0, 0.8)'
            >
              <Button onClick={changeAlignHandle} variant='text'>
                {element.full
                  ? t('Switch to center')
                  : t('Switch to full screen')}
              </Button>
            </Box>
          </Flex>
          {isEditor && (
            <CloseBtnBox>
              <CloseBtn onClick={removeHandle} variant='tertiary'>
                <Icon size={16} name='icon-guanbi' />
              </CloseBtn>
            </CloseBtnBox>
          )}
        </BoxStyled>
      </BoxStyledWrapper>
    </Box>
  );
};

export default Image;
