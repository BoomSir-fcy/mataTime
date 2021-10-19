import React from "react";
import { MiningIcon } from "../../../components/Svg";
import { SvgProps } from "../../../components/Svg/types";

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <MiningIcon {...props} />
  );
};

export default Icon;
