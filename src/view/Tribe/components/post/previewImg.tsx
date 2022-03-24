import React, { useState, useCallback, useRef, useEffect } from 'react';
import styled from 'styled-components';
import Lightbox from 'react-image-lightbox';
import { Flex, Box } from 'uikit';
import { ARTICLE_IMAGE_CLASS_NAME } from 'config';

import 'react-image-lightbox/style.css';

const ImgListBox = styled(Flex)`
  margin-top: 10px;
  justify-content: space-between;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 100%;
    justify-content: flex-start;
  }
`;

const ImgBox = styled(Box)`
  width: 108px;
  height: 108px;
  overflow: hidden;
  margin-right: 15px;
  border-radius: ${({ theme }) => theme.radii.card};
  &:last-child {
    margin-right: 0;
  }
`;

export const PreviewImg: React.FC<{
  list: string[];
}> = ({ list }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [previewImgList, setPreviewImgList] = useState([]);
  const [photoIndex, setPhotoIndex] = useState(0);
  const imgRef = useRef<HTMLDivElement>(null);

  const preViewImg = useCallback(
    index => {
      const preList = [...list.slice(index), ...list.slice(0, index)];
      setPreviewImgList(preList);
      setPhotoIndex(0);
      setModalIsOpen(true);
    },
    [list, setPreviewImgList, setModalIsOpen],
  );

  useEffect(() => {
    const imgDoms = imgRef?.current?.getElementsByClassName(
      ARTICLE_IMAGE_CLASS_NAME,
    );
    // 图片未加载出来，去掉边框
    if (imgRef?.current) {
      const divDom: HTMLDivElement = imgRef.current;
      if (!divDom.hasChildNodes()) {
        divDom.style.border = '0';
      }
    }
    if (imgDoms?.length === 1) {
      const imgDom = (Array.from(imgDoms) as HTMLImageElement[])[0];
      imgDom.addEventListener('load', () => {
        // 正方形图片
        if (imgDom.naturalHeight === imgDom.naturalWidth) {
          imgDom.parentElement.style.maxWidth = '300px';
          imgDom.style.width = '100%';
          imgDom.style.maxHeight = '300px';
        }
        // 宽大于高的图片
        if (imgDom.naturalWidth > imgDom.naturalHeight) {
          imgDom.style.width = '100%';
          imgDom.style.maxHeight = '540px';
        }
        // 高大于宽的图片
        if (imgDom.naturalHeight > imgDom.naturalWidth) {
          imgDom.parentElement.style.width = '50%';
          imgDom.style.width = '100%';
          imgDom.style.maxHeight = '540px';
        }
      });
    }
  }, [imgRef, list]);

  return (
    list.length > 0 && (
      <ImgListBox
        ref={imgRef}
        onClick={e => {
          e.stopPropagation();
          e.preventDefault();
        }}
      >
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
                pre =>
                  (pre + previewImgList.length - 1) % previewImgList.length,
              )
            }
            onMoveNextRequest={() =>
              setPhotoIndex(pre => (pre + 1) % previewImgList.length)
            }
          />
        )}
        {list.slice(0, 3).map((item, index) => (
          <ImgBox key={index}>
            <img
              className={ARTICLE_IMAGE_CLASS_NAME}
              onClick={() => preViewImg(index)}
              src={item}
              alt=''
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </ImgBox>
        ))}
      </ImgListBox>
    )
  );
};
