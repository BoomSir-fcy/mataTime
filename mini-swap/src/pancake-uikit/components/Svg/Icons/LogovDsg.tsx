import React from "react";
import { Image, ImageProps } from "pancake-uikit";
import vmbt from './assets/vMBT.png'


const Icon: React.FC<ImageProps> = ({
  width,
  height,
  ...props
}) => <Image wrapperProps={{width, height}} width={width} height={height} src={vmbt} {...props} />

export default Icon;
