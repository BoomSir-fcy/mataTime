import { ARTICLE_IMAGE_CLASS_NAME } from 'config';
import React, { useState, useCallback, useRef, useEffect } from 'react';
import Carousel, { Modal, ModalGateway } from 'react-images';
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
  const preViewImg = index => {
    setPreviewImgList(
      [...list.slice(index), ...list.slice(0, index)].map(item => ({
        source: item,
      })),
    );
    setModalIsOpen(true);
  };

  const imgRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const imgDoms = imgRef?.current?.getElementsByClassName(
      ARTICLE_IMAGE_CLASS_NAME,
    );
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
          imgDom.style.width = '50%';
          imgDom.style.maxHeight = '540px';
        }
      });
    }
  }, [imgRef, list]);

  const setBorderRadius = useCallback(
    (index: number) => {
      if (list.length === 1) {
        return '10px';
      }
      if (index === 0) {
        return '10px 0 0 0';
      }
      if (index === 1) {
        return '0 10px 0 0';
      }
      if (index === list.length - 2) {
        return '0 0 0 10px';
      }
      if (index === list.length - 1) {
        return '0 0 10px 0';
      }
      return '0';
    },
    [list],
  );

  return list.length > 0 ? (
    <ImgListBox ref={imgRef} onClick={e => e.stopPropagation()}>
      {modalIsOpen && (
        <ModalGateway>
          <Modal onClose={() => setModalIsOpen(false)}>
            <Carousel views={previewImgList} />
          </Modal>
        </ModalGateway>
      )}
      {list.length === 3 ? (
        <>
          <img
            className={ARTICLE_IMAGE_CLASS_NAME}
            style={{ maxHeight: '300px', borderRadius: '10px 0 0 10px' }}
            onClick={() => preViewImg(0)}
            src={list[0]}
            alt=''
          />
          <div className='imgListRightBox'>
            <img
              className={ARTICLE_IMAGE_CLASS_NAME}
              style={{ borderRadius: '0 10px 0 0' }}
              onClick={() => preViewImg(1)}
              src={list[1]}
              alt=''
            />
            <img
              className={ARTICLE_IMAGE_CLASS_NAME}
              style={{ borderRadius: '0 0 10px 0' }}
              onClick={() => preViewImg(2)}
              src={list[2]}
              alt=''
            />
          </div>
        </>
      ) : (
        list.map((item, index) => (
          <img
            className={ARTICLE_IMAGE_CLASS_NAME}
            style={{ borderRadius: setBorderRadius(index) }}
            onClick={() => preViewImg(index)}
            src={item}
            key={index}
            alt=''
          />
        ))
      )}
    </ImgListBox>
  ) : null;
};
