import React, { useCallback } from 'react';
import Modal from 'react-modal';
import { useImmer } from 'use-immer';
import { DefaultTheme } from 'styled-components';
import useTheme from 'hooks/useTheme'
import { Icon } from 'components';
import { Heading, Flex, CloseLineIcon, Button } from 'uikit'

const getCustomStyles = (theme: DefaultTheme) => ({
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    minWidth: '240px',
    // height: '238px',
    background: theme.card.background,
    borderRadius: theme.radii.card,
    boxShadow: theme.card.boxShadow,
    border: 0,
    padding: '18px 20px',
    zIndex: 200
  },
  overlay: {
    backgroundColor: 'rgba(98, 98, 98, 0.3)',
    zIndex: 200
  }
});

const ModalHeaderStyled = ({ title, onClose }) => {
  return (
    <Flex mb="8px" justifyContent="space-between" alignItems="center">
      <Heading>{title}</Heading>
      <Button onClick={onClose} padding="0" variant="text">
        <CloseLineIcon width={16} color="primary"></CloseLineIcon>
      </Button>
    </Flex>
  )
}

interface ModalWrapperProps {
  visible: boolean
  setVisible: (state: boolean) => void
  title?: string,
  creactOnUse?: boolean,
  customizeTitle?: boolean
}

export const ModalWrapper: React.FC<ModalWrapperProps> = React.memo(({
  visible,
  setVisible,
  children,
  creactOnUse,
  title,
  customizeTitle
}) => {
  const { theme } = useTheme()

  const customStyles = getCustomStyles(theme)
  const onClose = useCallback(() => setVisible(false), [setVisible])
  if (!visible && creactOnUse) return null

  return (
    <Modal
      isOpen={visible}
      onRequestClose={onClose}
      style={customStyles}
      ariaHideApp={false}
      contentLabel="Example Modal">
      {!customizeTitle && <ModalHeaderStyled onClose={onClose} title={title} />}
      {children}
    </Modal>
  )
})