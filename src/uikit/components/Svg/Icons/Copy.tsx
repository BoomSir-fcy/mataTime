import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";
import copy from './assets/copy.png'

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 60 60" {...props}>
      <image xlinkHref={copy} transform="translate(14)"/>
      {/* <path d="M675.84 266.24H389.12c-67.584 0-122.88 55.296-122.88 122.88v286.72c-53.248-2.048-81.92-32.768-81.92-90.112V272.384c0-57.344 30.72-90.112 90.112-90.112h313.344c53.248 2.048 86.016 30.72 88.064 83.968z" fill="#4eceb4" p-id="1356"></path>
      <path d="M438.272 348.16h313.344c57.344 0 90.112 30.72 90.112 90.112v313.344c0 57.344-30.72 90.112-90.112 90.112H438.272c-57.344 0-90.112-30.72-90.112-90.112V438.272c0-59.392 30.72-90.112 90.112-90.112z" fill="#067d73" p-id="1357"></path> */}
    </Svg>
  );
};


export default Icon;
