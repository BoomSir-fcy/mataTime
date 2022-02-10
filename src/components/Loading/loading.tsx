import React from 'react';
import styled from 'styled-components';
import { Flex, Box, Overlay } from 'uikit';

const LoadingWraper = styled(Flex)`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100%;
  height: 100%;
  margin: auto;
  background-color: rgba(255, 255, 255, 0.01);
  justify-content: center;
  align-items: center;
  @keyframes sk-chase {
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes sk-chase-dot {
    80%,
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes sk-chase-dot-before {
    50% {
      transform: scale(0.4);
    }
    100%,
    0% {
      transform: scale(1);
    }
  }
`;
const LoadingContent = styled(Box)`
  width: 40px;
  height: 40px;
  position: relative;
  animation: sk-chase 2.5s infinite linear both;
`;
const Dot = styled(Box)`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  animation: sk-chase-dot 2s infinite ease-in-out both;
  &::before {
    content: '';
    display: block;
    width: 25%;
    height: 25%;
    background-color: #fff;
    border-radius: 100%;
    animation: sk-chase-dot-before 2s infinite ease-in-out both;
  }
  &:nth-child(1) {
    animation-delay: -1.1s;
  }
  &:nth-child(2) {
    animation-delay: -1s;
  }
  &:nth-child(3) {
    animation-delay: -0.9s;
  }
  &:nth-child(4) {
    animation-delay: -0.8s;
  }
  &:nth-child(5) {
    animation-delay: -0.7s;
  }
  &:nth-child(6) {
    animation-delay: -0.6s;
  }
  &:nth-child(1):before {
    animation-delay: -1.1s;
  }
  &:nth-child(2):before {
    animation-delay: -1s;
  }
  &:nth-child(3):before {
    animation-delay: -0.9s;
  }
  &:nth-child(4):before {
    animation-delay: -0.8s;
  }
  &:nth-child(5):before {
    animation-delay: -0.7s;
  }
  &:nth-child(6):before {
    animation-delay: -0.6s;
  }
`;

const OverlayStyled = styled(Overlay)`
  position: absolute;
`;

export const Loading: React.FC<{
  visible: boolean;
  overlay?: boolean;
}> = React.memo(({ visible, overlay }) => {
  return (
    <React.Fragment>
      {visible && (
        <LoadingWraper>
          <OverlayStyled show={overlay} />
          <LoadingContent>
            {[...new Array(6)].map((item, index) => (
              <Dot key={`${item}_${index}`} />
            ))}
          </LoadingContent>
        </LoadingWraper>
      )}
    </React.Fragment>
  );
});
