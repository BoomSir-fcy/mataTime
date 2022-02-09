import React, { useCallback } from 'react';
import Modal from 'react-modal';
import styled, { DefaultTheme } from 'styled-components';
import { variant } from 'styled-system';
import { Heading, Flex, CloseLineIcon, Button, Box } from 'uikit';

import useTheme from 'hooks/useTheme';

const BoxStyle = styled(Box)<{ overflow?: string }>`
  overflow-y: ${({ overflow }) => overflow || 'auto'};
  max-height: calc(80vh - 100px);
`;

const getCustomStyles = (
  theme: DefaultTheme,
  fillBody?: boolean,
  top?: string,
  padding?: string,
  left?: string,
) => ({
  content: {
    top: top ? top : '50%',
    left: left ? left : '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    minWidth: '320px',
    // height: '238px',
    background: theme.colors.greyBackground,
    borderRadius: theme.radii.card,
    // boxShadow: theme.card.boxShadow,
    border: 0,
    overflow: 'visible',
    padding: padding ? padding : fillBody ? '18px 0' : '18px 20px',
    zIndex: 200,
    inset: '50% auto auto 50%',
    maxHeight: '80vh',
  },
  overlay: {
    backgroundColor: 'rgba(98, 98, 98, 0.3)',
    zIndex: 200,
  },
});

const ModalHeaderStyled = ({ title, onClose, fillBody }) => {
  return (
    <Flex
      padding={!fillBody ? '0' : '0 20px'}
      mb='8px'
      justifyContent='space-between'
      alignItems='center'
    >
      <Heading>{title}</Heading>
      <Button onClick={onClose} padding='0' variant='text'>
        <CloseLineIcon width={16} color='white_black'></CloseLineIcon>
      </Button>
    </Flex>
  );
};

const scales = {
  XS: 'xs',
  MD: 'md',
  XL: 'xl',
} as const;
interface ModalWrapperProps {
  visible: boolean;
  scale?: typeof scales[keyof typeof scales];
  setVisible?: (state: boolean) => void;
  title?: string;
  creactOnUse?: boolean;
  customizeTitle?: boolean;
  fillBody?: boolean;
  top?: string;
  padding?: string;
  overflow?: string;
  shouldCloseOnOverlayClick?: boolean;
}

export const ModalWrapper: React.FC<ModalWrapperProps> = React.memo(
  ({
    visible,
    setVisible,
    children,
    creactOnUse,
    title,
    customizeTitle,
    fillBody,
    top,
    padding,
    overflow,
    shouldCloseOnOverlayClick = true,
  }) => {
    var OutCenterBox: HTMLElement = document.querySelector('#OutCenterBox');
    const { theme } = useTheme();
    // let left;
    // if (OutCenterBox) {
    //   const rectObject = OutCenterBox.getBoundingClientRect();
    //   left = `${rectObject.left}px`;
    // }

    const customStyles = getCustomStyles(theme, fillBody, top, padding);
    const onClose = useCallback(() => {
      if (setVisible) {
        setVisible(false);
      }
    }, [setVisible]);
    if (!visible && creactOnUse) return null;
    return (
      <Modal
        isOpen={visible}
        onRequestClose={onClose}
        style={customStyles}
        ariaHideApp={false}
        shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
        contentLabel='Example Modal'
      >
        {!customizeTitle && (
          <ModalHeaderStyled
            fillBody={fillBody}
            onClose={onClose}
            title={title}
          />
        )}
        <BoxStyle overflow={overflow}>{children}</BoxStyle>
      </Modal>
    );
  },
);

ModalWrapper.defaultProps = {
  scale: scales.XL,
};
