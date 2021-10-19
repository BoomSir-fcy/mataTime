import React from "react";
import { Image, ImageProps } from "../../Image";
import vdsg from './assets/vdsg.png'


const Icon: React.FC<ImageProps> = ({
  width,
  height,
  ...props
}) => <Image wrapperProps={{width, height}} width={width} height={height} src={vdsg} {...props} />

export default Icon;
