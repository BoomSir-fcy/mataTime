import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";
import bag from './assets/bag.png'

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 60 60" {...props}>
        {/* <embed {...props} src={bag} type="image/svg+xml"></embed> */}
        <image xlinkHref={bag}/>
    </Svg>
  );
};

export default Icon;
