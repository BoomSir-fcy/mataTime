import React from 'react';
import Modal from 'react-modal';
import { useImmer } from 'use-immer';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '498px',
    height: '238px',
    background: '#191F2D',
    boxShadow: '0px 0px 21px 0px rgba(25, 95, 81, 0.2)',
    borderRadius: '20px',
    border: 0,
    padding: 0,
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)'
  }
};

export const ModalWrapper = React.memo((props) => {

  const [state, setState] = useImmer({
    visible: true
  })

  const closeModal = () => {
    setState(state => { state.visible = false });
  }

  return (
    <Modal
      isOpen={state.visible}
      onRequestClose={closeModal}
      style={customStyles}
      ariaHideApp={false}
      contentLabel="Example Modal">
      {props.children}
    </Modal>
  )
})