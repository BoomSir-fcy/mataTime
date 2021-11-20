import React, { useState, useEffect, useRef } from 'react';
import { ImgListBox, ImgItem, MoreImg } from './style'
import Carousel, { Modal, ModalGateway } from 'react-images'
type Iprops = {
  list: string[]
}
export const ImgList = (props: Iprops) => {
  const { list = [] } = props
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [isMore, setIsore] = useState(false)
  const [previewImgList, setPreviewImgList] = useState([])
  const clickMore = (e) => {
    e.stopPropagation()
    setIsore(true)
  }
  const preViewImg = (index) => {
    setPreviewImgList([...list.slice(index), ...list.slice(0, index)].map(item => ({ source: item })))
    setModalIsOpen(true)
  }
  return (
    list.length > 0 ?
        <ImgListBox style={{ overflowX: isMore ? 'auto' : 'hidden' }} onClick={(e) => e.stopPropagation()}>
        {
          modalIsOpen ?
            <ModalGateway>
              <Modal onClose={() => setModalIsOpen(false)}>
                <Carousel views={previewImgList} />
              </Modal>
            </ModalGateway>
            : null
        }
          {
            Array(isMore ? list.length : list.length > 3 ? 3 : list.length).fill(null).map((item, index) => (
              <ImgItem src={list[index]} key={index} onClick={() => preViewImg(index)}>
              </ImgItem>
            ))
          }
          {
            !isMore && list.length > 3 ?
              <MoreImg onClick={clickMore}>
                +
                <br />
                3
              </MoreImg>
              : null
          }
        </ImgListBox>
      : null
  )
}
