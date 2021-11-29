import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 1024 1024" {...props}>
      <path d="M904 64c30.9 0 56 25.1 56 56v784c0 30.9-25.1 56-56 56H120c-30.9 0-56-25.1-56-56V120c0-30.9 25.1-56 56-56h784m0-64H120C53.7 0 0 53.7 0 120v784c0 66.3 53.7 120 120 120h784c66.3 0 120-53.7 120-120V120c0-66.3-53.7-120-120-120z" fill="" p-id="4422"></path><path d="M736 480H288c-17.7 0-32 14.3-32 32s14.3 32 32 32h448c17.7 0 32-14.3 32-32s-14.3-32-32-32z" fill="" p-id="4423"></path>
    </Svg>
  );
};

export default Icon;
