import { ARTICLE_IMAGE_CLASS_NAME } from 'config';
import React, { useState, useCallback, useRef, useEffect } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { Image } from 'uikit';
import { ImgListBox } from './style';
type Iprops = {
  list: string[];
};
// export const UploadList = (props: Iprops) => {
//   const { list = [] } = props
//   const [modalIsOpen, setModalIsOpen] = useState(false)
//   const [isMore, setIsore] = useState(false)
//   const [previewImgList, setPreviewImgList] = useState([])
//   const clickMore = (e) => {
//     e.stopPropagation()
//     setIsore(true)
//   }
//   const preViewImg = (index) => {
//     setPreviewImgList([...list.slice(index), ...list.slice(0, index)].map(item => ({ source: item })))
//     setModalIsOpen(true)
//   }
//   return (
//     list.length > 0 ?
//         <ImgListBox style={{ overflowX: isMore ? 'auto' : 'hidden' }} onClick={(e) => e.stopPropagation()}>
//         {
//           modalIsOpen ?
//             <ModalGateway >
//               <Modal onClose={() => setModalIsOpen(false)}>
//                 <Carousel views={previewImgList} />
//               </Modal>
//             </ModalGateway>
//             : null
//         }
//           {
//             Array(isMore ? list.length : list.length > 3 ? 3 : list.length).fill(null).map((item, index) => (
//               <ImgItem src={list[index]} key={index} onClick={() => preViewImg(index)}>
//               </ImgItem>
//             ))
//           }
//           {
//             !isMore && list.length > 3 ?
//               <MoreImg onClick={clickMore}>
//                 +
//                 <br />
//                 3
//               </MoreImg>
//               : null
//           }
//         </ImgListBox>
//       : null
//   )
// }
export const ImgList = (props: Iprops) => {
  const { list = [] } = props;
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [previewImgList, setPreviewImgList] = useState([]);
  const [photoIndex, setPhotoIndex] = useState(0);
  // const preViewImg = index => {
  //   const preList = [...list.slice(index), ...list.slice(0, index)];
  //   setPreviewImgList(preList);
  //   setPhotoIndex(index % preList.length);
  //   setModalIsOpen(true);
  // };

  const preViewImg = useCallback(
    index => {
      const preList = [...list.slice(index), ...list.slice(0, index)];
      setPreviewImgList(preList);
      setPhotoIndex(0);
      setModalIsOpen(true);
    },
    [list, setPreviewImgList, setPreviewImgList, setModalIsOpen],
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
          imgDom.style.width = '300px';
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
    <ImgListBox ref={imgRef} onClick={e => e.stopPropagation()}>
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
        <>
          <img
            className={ARTICLE_IMAGE_CLASS_NAME}
            style={{
              paddingBottom: 0,
            }}
            onClick={() => preViewImg(0)}
            src={list[0]}
            alt=''
          />
        </>
      )}
      {list.length === 2 && (
        <>
          <img
            className={ARTICLE_IMAGE_CLASS_NAME}
            style={{ maxHeight: '300px', paddingBottom: '0' }}
            onClick={() => preViewImg(0)}
            src={list[0]}
            alt=''
          />
          <img
            className={ARTICLE_IMAGE_CLASS_NAME}
            style={{ maxHeight: '300px', paddingBottom: '0' }}
            onClick={() => preViewImg(1)}
            src={list[1]}
            alt=''
          />
        </>
      )}
      {list.length === 3 && (
        <>
          <img
            className={ARTICLE_IMAGE_CLASS_NAME}
            style={{
              maxHeight: '300px',
              paddingBottom: '0',
            }}
            onClick={() => preViewImg(0)}
            src={list[0]}
            alt=''
          />
          <div className='imgListRightBox'>
            <img
              className={ARTICLE_IMAGE_CLASS_NAME}
              style={{ paddingRight: '0' }}
              onClick={() => preViewImg(1)}
              src={list[1]}
              alt=''
            />
            <img
              className={ARTICLE_IMAGE_CLASS_NAME}
              style={{ paddingBottom: '0' }}
              onClick={() => preViewImg(2)}
              src={list[2]}
              alt=''
            />
          </div>
        </>
      )}
      {list.length > 3 &&
        list.map((item, index) => (
          <img
            className={ARTICLE_IMAGE_CLASS_NAME}
            style={{
              paddingBottom:
                index === list.length - 2 || index === list.length - 1
                  ? '0'
                  : '1px',
            }}
            onClick={() => preViewImg(index)}
            src={item}
            key={index}
            alt=''
          />
        ))}
    </ImgListBox>
  ) : null;
};
