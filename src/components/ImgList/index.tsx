import { ARTICLE_IMAGE_CLASS_NAME } from 'config';
import React, { useState } from 'react';
import Carousel, { Modal, ModalGateway } from 'react-images';
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
        source: item
      }))
    );
    setModalIsOpen(true);
  };
  return list.length > 0 ? (
    <ImgListBox onClick={e => e.stopPropagation()}>
      {modalIsOpen && (
        <ModalGateway>
          <Modal onClose={() => setModalIsOpen(false)}>
            <Carousel views={previewImgList} />
          </Modal>
        </ModalGateway>
      )}
      {list.length === 3 ? (
        <>
          <img className={ARTICLE_IMAGE_CLASS_NAME} onClick={() => preViewImg(0)} src={list[0]} alt="" />
          <div className="imgListRightBox">
            <img className={ARTICLE_IMAGE_CLASS_NAME} onClick={() => preViewImg(1)} src={list[1]} alt="" />
            <img className={ARTICLE_IMAGE_CLASS_NAME} onClick={() => preViewImg(0)} src={list[2]} alt="" />
          </div>
        </>
      ) : (
        list.map((item, index) => (
          <img
            className={ARTICLE_IMAGE_CLASS_NAME}
            style={{ width: list.length === 1 ? '100%' : null }}
            onClick={() => preViewImg(index)}
            src={item}
            key={index}
            alt=""
          />
        ))
      )}
    </ImgListBox>
  ) : null;
};
