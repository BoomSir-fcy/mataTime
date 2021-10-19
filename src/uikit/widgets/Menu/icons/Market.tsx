import React from "react";
import { MallIcon } from "../../../components/Svg";
import { SvgProps } from "../../../components/Svg/types";

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <MallIcon {...props} />
  );
};

export default Icon;
