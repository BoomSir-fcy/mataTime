import React from 'react'
import styled, { keyframes } from 'styled-components'
import { Icon } from 'components'
import { Link } from 'react-router-dom';
import { Circle } from 'rc-progress';
import { Box, Flex, Text, Image, BoxProps } from 'uikit'
import { useTranslation } from 'contexts/Localization'
import { ProfileMenu } from './ProfileMenu';

export interface ShalouProps {
  // seconds?: number
}

const hourglassSpin = keyframes`
  0% {
    transform: rotate(180deg) scale(0.4);
  }

  10% {
    transform: rotate(360deg) scale(0.4);
  }

  50% {
    transform: rotate(360deg) scale(0.4);
  }

  60% {
    transform: rotate(540deg) scale(0.4);
  }

  100% {
    transform: rotate(540deg) scale(0.4)
  }
`
const hourglassSand = keyframes`
  0% {
    background-position: 0 25px;
  }

  50% {
    background-position: 0 0;
  }

  100% {
    background-position: 0 -25px;
  }
`

const hourglassStream = keyframes`
  0% {
    top: 29px;
    opacity: 0;
  }

  10% {
    opacity: 1;
  }

  49.9% {
    top: 29px;
    opacity: 1;
  }

  50% {
    top: 2px;
    opacity: 0;
  }

  60% {
    opacity: 1;
  }

  100% {
    top: 2px;
    opacity: 1;
  }
`

const Hourglass = styled.div`
  position: relative;
  width: 28px;
  height: 56px;
  animation: ${hourglassSpin} 8s ease-in-out 0s infinite;
  &::before,
  &::after{
    position: absolute;
    content: '';
    left: 0;
    bottom: 0;
    width: 24px;
    height: 25px;
    background: ${({ theme }) => theme.colors.textTips};
    border: 2px solid ${({ theme }) => theme.colors.textTips};
    border-top-left-radius: 15px 25px;
    border-top-right-radius: 15px 25px;
  }
  &::before {
    top: 0;
    transform: rotate(180deg);
  }
`

const HourglassStand = styled.div`
  &::before,
  &::after{
    position: absolute;
    content: '';
    z-index: 3;
    left: -4px;
    bottom: 0;
    width: 36px;
    height: 5px;
    background: ${({ theme }) => theme.colors.textTips};
  }
  &::before {
    top: 0;
  }
`

const HourglassSand = styled.div`
  &::before,
  &::after{
    position: absolute;
      content: '';
      z-index: 2;
      left: 2px;
      bottom: 2px;
      width: 24px;
      height: 25px;
      /* background: ${({ theme }) => `linear-gradient(${theme.colors.textTips} 0%, ${theme.colors.textTips} 50%, #fff 50%, transparent 100%);`}; */
      background: linear-gradient(#fff 0%, #fff 50%, #0f0f0f 50%, #666 100%);
      background-size: 30px 50px;
      border-top-left-radius: 13px 23px;
      border-top-right-radius: 13px 23px;
      animation: ${hourglassSand} 8s ease-in-out 0s infinite;
  }
  &::before {
    top: 2px;
    transform: rotate(180deg);
    animation-delay: -4s;
  }
`

const HourglassStream = styled.div`
  position: absolute;
  z-index: 2;
  left: 13px;
  width: 2px;
  height: 25px;
  opacity: 0;
  background: ${({ theme }) => theme.colors.textTips};
  animation: ${hourglassStream} 8s linear 0.6s infinite;
`

const BoxStyled = styled(Box)`
  position: absolute;
  top: 50%;
  transform: translate(0, -50%) scale(0.8);
`

const Shalou: React.FC<BoxProps> = (...props) => {

  return (
    <BoxStyled {...props}>
      <Hourglass>
        <HourglassStand />
        <HourglassSand />
        <HourglassStream />
      </Hourglass>
    </BoxStyled>
  )
}
export default Shalou
