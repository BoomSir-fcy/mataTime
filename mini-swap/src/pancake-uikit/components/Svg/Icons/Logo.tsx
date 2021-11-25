import React from "react";
import { Image, ImageProps } from "pancake-uikit";
import styled from "styled-components";

// import Logo from './assets/dsg.png'
// import Logo1 from './assets/logo.png'
import Logo from './assets/mbt.png'
import Logo1 from './assets/logo.png'
import LogoDark from './assets/logo-dark.png'

// const ImageStyled = styled(Image)`
//   min-width: ${({ width }) => width}px;
//   min-height: ${({ height }) => height}px;
// `
// const ImageStyled = styled(Image)`
//   min-width: ${({ width }) => width}px;
//   min-height: ${({ height }) => height}px;
// `

const Icon: React.FC<ImageProps> = ({
  width,
  height,
  ...props
}) => <Image wrapperProps={{ width, height }} width={width} height={height} src={Logo} {...props} />

export const LogoWithText: React.FC<ImageProps> = ({
  width,
  height,
  ...props
}) => <Image wrapperProps={{ width, height }} width={width} height={height} src={Logo1} {...props} />
export const LogoDarkText: React.FC<ImageProps> = ({
  width,
  height,
  ...props
}) => <Image wrapperProps={{ width, height }} width={width} height={height} src={LogoDark} {...props} />
export default Icon;
