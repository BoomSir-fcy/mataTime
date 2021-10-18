import React from "react";
import { MemberIcon } from "../../../components/Svg";
import { SvgProps } from "../../../components/Svg/types";

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <MemberIcon {...props} />
  );
};

export default Icon;
