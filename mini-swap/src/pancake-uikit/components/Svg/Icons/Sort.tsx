import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 1024 1024" {...props}>
      <path d="M275.364 912.684l221.297-294.967h-144.27v-431.244h-154.039v431.244h-144.275l221.286 294.967zM571.899 186.881h393.898v88.512h-393.898v-88.512zM571.899 434.716h314.231v-88.511h-314.231v88.511zM571.899 594.036h234.567v-88.513h-234.567v88.513zM571.899 753.361h154.903v-88.512h-154.903v88.512zM571.899 912.684h75.236v-88.512h-75.236v88.512z" fill="#067d73" p-id="3522"></path>
    </Svg>
  );
};

export default Icon;
