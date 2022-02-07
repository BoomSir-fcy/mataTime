import { ARTICLE_IMAGE_CLASS_NAME } from 'config';
import React, { useState, useCallback, useRef, useEffect } from 'react';
import styled from 'styled-components';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { Image } from 'uikit';
import { ImgListBox } from './style';
type Iprops = {
  list: string[];
};
const BlockLink = styled.a`
  display: block;
`;
export const ImgList = (props: Iprops) => {
  const { list = [] } = props;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [previewImgList, setPreviewImgList] = useState([]);
  const [photoIndex, setPhotoIndex] = useState(0);

  const preViewImg = useCallback(
    index => {
      const preList = [...list.slice(index), ...list.slice(0, index)];
      setPreviewImgList(preList);
      setPhotoIndex(0);
      setModalIsOpen(true);
    },
    [list, setPreviewImgList, setModalIsOpen],
  );

  const imgRef = useRef<HTMLDivElement>(null);
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

  return list.length > 0 ? (
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
              pre => (pre + previewImgList.length - 1) % previewImgList.length,
            )
          }
          onMoveNextRequest={() =>
            setPhotoIndex(pre => (pre + 1) % previewImgList.length)
          }
        />
      )}
      {list.length === 1 && (
        <img
          className={ARTICLE_IMAGE_CLASS_NAME}
          onClick={() => preViewImg(0)}
          src={list[0]}
          alt=''
          style={{
            paddingBottom: 0,
            paddingRight: 0,
          }}
        />
      )}
      {list.length === 2 && (
        <>
          <img
            className={ARTICLE_IMAGE_CLASS_NAME}
            onClick={() => preViewImg(0)}
            src={list[0]}
            alt=''
            style={{ maxHeight: '300px', paddingBottom: '0' }}
          />
          <img
            className={ARTICLE_IMAGE_CLASS_NAME}
            onClick={() => preViewImg(1)}
            src={list[1]}
            alt=''
            style={{ maxHeight: '300px', paddingBottom: '0' }}
          />
        </>
      )}
      {list.length === 3 && (
        <>
          <img
            className={ARTICLE_IMAGE_CLASS_NAME}
            onClick={() => preViewImg(0)}
            src={list[0]}
            alt=''
            style={{ maxHeight: '300px', paddingBottom: '0' }}
          />
          <div className='imgListRightBox'>
            <img
              className={ARTICLE_IMAGE_CLASS_NAME}
              onClick={() => preViewImg(1)}
              src={list[1]}
              alt=''
              style={{ paddingRight: '0' }}
            />
            <img
              className={ARTICLE_IMAGE_CLASS_NAME}
              onClick={() => preViewImg(2)}
              src={list[2]}
              alt=''
              style={{ paddingBottom: '0' }}
            />
          </div>
        </>
      )}
      {list.length > 3 &&
        list.map((item, index) => (
          <img
            key={item}
            className={ARTICLE_IMAGE_CLASS_NAME}
            onClick={() => preViewImg(index)}
            src={item}
            alt=''
            style={{
              paddingBottom:
                index === list.length - 2 || index === list.length - 1
                  ? '0'
                  : '1px',
            }}
          />
        ))}
    </ImgListBox>
  ) : null;
};
