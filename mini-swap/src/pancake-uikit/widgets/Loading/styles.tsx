import React from "react";
import styled, { keyframes } from "styled-components";
import Flex from "../../components/Box/Flex";
import { Box } from "../../components/Box";
import { ArrowBackIcon, CloseIcon } from "../../components/Svg";
import { IconButton } from "../../components/Button";
import Overlay from "../../components/Overlay/Overlay";
import { ModalProps } from "./types";

export const ModalHeader = styled.div<{ background?: string }>`
  align-items: center;
  /* background: ${({ background }) => background || "transparent"}; */
  /* border-bottom: 1px solid ${({ theme }) => theme.colors.cardBorder}; */
  display: flex;
  padding: 12px 24px;
`;

export const ModalTitle = styled(Flex)`
  align-items: center;
  flex: 1;
`;

export const ModalBody = styled(Flex)`
  flex-direction: column;
  max-height: 90vh;
  overflow-y: auto;
  padding-top: 0;
`;

export const ModalCloseButton: React.FC<{ onDismiss: ModalProps["onDismiss"] }> = ({ onDismiss }) => {
  return (
    <IconButton variant="text" onClick={onDismiss} aria-label="Close the dialog">
      <CloseIcon color="primary" />
    </IconButton>
  );
};

export const ModalBackButton: React.FC<{ onBack: ModalProps["onBack"] }> = ({ onBack }) => {
  return (
    <IconButton variant="text" onClick={onBack} area-label="go back" mr="8px">
      <ArrowBackIcon width={32} color="primary" />
    </IconButton>
  );
};

export const ModalContainer = styled(Box)<{ minWidth: string }>`
  overflow: hidden;
  background: ${({ theme }) => theme.modal.background};
  box-shadow: ${({ theme }) => theme.shadows.box};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  border-radius: ${({ theme }) => theme.radii.card};
  width: 100%;
  max-height: 100vh;
  z-index: ${({ theme }) => theme.zIndices.modal};

  ${({ theme }) => theme.mediaQueries.xs} {
    width: auto;
    min-width: ${({ minWidth }) => minWidth};
    max-width: 100%;
  }
`;

export const LoadingContainer = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: ${({ theme }) => theme.zIndices.modal};
  width: 650px;
  /* height: 200px; */
`

export const VideoStyled = styled.video`
  width: 500px;
  height: 500px;
  mix-blend-mode: screen;
  object-fit: fill;
  position: absolute;
  top: 0px;
  left: 0px;
  bottom: 0;
  right: 0;
  margin: auto;
  z-index: 2;
`
export const ImageStyled = styled.img<{zIndex?: number}>`
  /* width: 500px;
  height: 500px; */
  position: absolute;
  top: 0px;
  left: 0px;
  bottom: 0;
  right: 0;
  margin: auto;
  z-index: ${({ zIndex }) => zIndex || 2};
`
export const ChildrenWrapper = styled(Box)`
  width: auto;
  height: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
`

export const ShadowBox = styled(Box)`
  background: pink;
  position: absolute;
  top: 0px;
  left: 0px;
  bottom: 0;
  right: 0;
  z-index: 1;
  width: 100vw;
  height: 100vh;
`

const scaleFrame = keyframes`
  0% {
    opacity: 0;
    transform: scale(0);
  }

  90% {
    opacity: 0;
    transform: scale(0);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
`
const opacityFrame = keyframes`
  0% {
    opacity: 1;
  }
  90% {
    opacity: 0.8;
  }
  100% {
    opacity: 0;
  }
`

export const BoxAnimationStyled = styled(Box)`
  animation-name: ${scaleFrame};
  animation-duration: 3.2s;
  /* animation-delay: 0s; */
  animation-timing-function: linear;
  animation-iteration-count: 1;
`

export const WrapperAnimationStyled = styled(Box)`
  animation-name: ${opacityFrame};
  animation-duration: 0.5s;
  animation-delay: 30ms;
  animation-timing-function: linear;
  animation-iteration-count: 1;
  opacity: 0;
`