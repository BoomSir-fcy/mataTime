import React from 'react';
import Modal from 'react-modal';
import styled from "styled-components";

const PageContainer = styled.div`
  padding: 20px;
  margin-top: 0;
  flex: 1;
  min-height: auto;
`
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const Home: React.FC = () => {

  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  const openModal = () => {
    setIsOpen(true);
  }

  const afterOpenModal = () =>{
    subtitle.style.color = '#000';
  }

  const closeModal = () => {
    setIsOpen(false);
  }

  return (
    <PageContainer>
      <button onClick={openModal}>Open Modal</button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}
        contentLabel="Example Modal">
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
        <button onClick={closeModal}>close</button>
        <div>I am a modal</div>
      </Modal>
    </PageContainer>
  )
}

export default Home;