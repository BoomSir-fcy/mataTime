import React, { useState, useCallback, useEffect } from 'react';
import { bgCricle, Box, centerCricle, Flex } from 'uikit';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
    0% {
        opacity: 0;
    }
    40% {
        opacity: 0.6;
    }
    100% {
        opacity: 1;
    }
`;
const btnFade = keyframes`
    0% {
        opacity: 1;
    }
    40% {
        opacity: 0.2;
    }
    80% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
`;
const breathe = keyframes`
    0% {
        opacity: 0.2;
    }
    100% {
        opacity: 1;
    }
`;
const rotate = keyframes`
    from {
        transform: rotate(0deg)
    }
    to {
        transform: rotate(359deg)
    }
`;
export const CircleBox = styled.div<CircleProps>`
  position: relative;
  display: ${({ isShow }) => (isShow ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  width: ${({ width, showDots }) =>
    showDots && width ? `calc(${width} + 34vw)` : ''};
  height: ${({ height }) => height || '100%'};
  left: 0;
  top: 0;
  transition: opacity 0.3s;
  opacity: ${({ isShow }) => (isShow ? 1 : 0)};
  ${({ showDots }) =>
    showDots
      ? `
        &::before{
            content: '';
            width: 100%;
            height: 100%;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            background: url('/images/RingPoint.png') no-repeat;
            background-size: 87%;
            background-position: center;
        }
    `
      : ''}
`;
export const E2center = styled.div<CircleProps>`
  transform: scale(1) translate(-50%, -50%);
  left: 50%;
  top: 50%;
  max-width: ${({ maxWidth }) => maxWidth || '640px'};
  width: ${({ width }) => width || '66vw'};
  position: absolute;
  cursor: ${({ cursor }) => cursor};
  ${({ theme }) => theme.mediaQueries.md} {
    width: ${({ width }) => width || '640px'};
  }
`;
export const AnimationE2center = styled(E2center)`
  opacity: 0;
  animation: ${fadeIn} 0.5s ease-in-out 0s 1 normal;
  animation-fill-mode: forwards;
`;

export const E3center = styled.div<CircleProps>`
  transform: scale(1.15);
  max-width: ${({ maxWidth }) => maxWidth || '640px'};
  width: ${({ width }) => width || '66vw'};
  margin: auto;
  /* display: none; */
  cursor: ${({ cursor }) => cursor};
  ${({ theme }) => theme.mediaQueries.md} {
    width: ${({ width }) => width || '640px'};
  }
`;
export const AnimationE3center = styled(E3center)`
  opacity: 0;
  animation: ${breathe} 5s linear 0s infinite alternate;
`;

export const BgCircleIcon = styled(bgCricle)`
  width: 100%;
  height: 100%;
`;
export const AnimationBgCircleIcon = styled(BgCircleIcon)`
  animation: ${rotate} 10s linear infinite;
`;
export const CenterCircleIcon = styled(centerCricle)`
  width: 100%;
  height: 100%;
`;
export const AnimationCenterCircleIcon = styled(CenterCircleIcon)`
  animation: ${rotate} 50s linear infinite;
`;
export const CircleText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
`;
export const ContentBox = styled.div<CircleProps>`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  max-width: ${({ maxWidth }) => maxWidth || '640px'};
  max-height: ${({ maxWidth }) => maxWidth || '640px'};
  width: ${({ width }) => width || '66vw'};
  height: ${({ height }) => height || '66vw'};
  ${({ theme }) => theme.mediaQueries.md} {
    width: ${({ width }) => width || '640px'};
    height: ${({ height }) => height || '640px'};
  }
  .content-box {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
interface CircleProps {
  maxWidth?: string;
  width?: string;
  height?: string;
  isShow?: boolean;
  cursor?: string;
  isAnimation?: boolean;
  showDots?: boolean;
  color?: string;
}

const Circle: React.FC<CircleProps> = ({
  maxWidth,
  width,
  height,
  isShow,
  cursor,
  children,
  isAnimation,
  showDots,
  color,
}) => {
  const E2Circle = isAnimation ? AnimationE2center : E2center;
  const E2CircleIcon = isAnimation ? AnimationBgCircleIcon : BgCircleIcon;
  const E3Circle = isAnimation ? AnimationE3center : E3center;
  const E3CircleIcon = isAnimation
    ? AnimationCenterCircleIcon
    : CenterCircleIcon;
  return (
    <CircleBox
      isShow={isShow}
      height={height}
      showDots={showDots}
      width={width}
    >
      <E2Circle width={width} height={height} maxWidth={maxWidth}>
        <E2CircleIcon color={color} />
      </E2Circle>
      <E3Circle
        width={width}
        height={height}
        cursor={cursor}
        maxWidth={maxWidth}
      >
        <E3CircleIcon color={color} />
      </E3Circle>
      <ContentBox width={width} height={height} maxWidth={maxWidth}>
        <Box className='content-box'>{children}</Box>
      </ContentBox>
    </CircleBox>
  );
};

Circle.defaultProps = {
  isShow: true,
  isAnimation: true,
  showDots: false,
};

export default Circle;
