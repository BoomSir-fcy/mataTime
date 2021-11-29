import React from "react";
import Svg from "../../../components/Svg/Svg";
import { SvgProps } from "../../../components/Svg/types";

const Icon: React.FC<SvgProps> = ({ children, ...props }) => {
  return (
    <Svg viewBox="0 0 240 80" {...props}>
      <text x="0" y="30">{children}</text>
    </Svg>
  );
};

export default Icon;
