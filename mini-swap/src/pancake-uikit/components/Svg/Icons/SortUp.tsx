import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";
import bag from './assets/sort-up.png'

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 16 25" {...props}>
        {/* <embed {...props} src={bag} type="image/svg+xml"></embed> */}
        <image xlinkHref={bag}/>
    </Svg>
  );
};

export default Icon;
