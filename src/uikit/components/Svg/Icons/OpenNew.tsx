import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";
import openNew from './assets/openNew.png'

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 60 60" {...props}>
      <image {...props} xlinkHref={openNew} transform="translate(0, 6)"/>

      {/* <path d="M880 640v144c0 35.2-28.8 64-64 64H208c-35.2 0-64-28.8-64-64V240c0-35.2 28.8-64 64-64h208c17.6 0 32-14.4 32-32s-14.4-32-32-32H208c-70.4 0-128 57.6-128 128v544c0 70.4 57.6 128 128 128h608c70.4 0 128-57.6 128-128v-144c0-17.6-14.4-32-32-32s-32 14.4-32 32z" p-id="3797"></path>
      <path d="M835.2 176H624c-17.6 0-32-14.4-32-32s14.4-32 32-32h288c9.6 0 17.6 3.2 22.4 9.6 6.4 4.8 9.6 12.8 9.6 22.4v288c0 17.6-14.4 32-32 32s-32-14.4-32-32V220.8L403.2 699.2c-12.8 12.8-32 12.8-44.8 0s-12.8-32 0-44.8L835.2 176z" p-id="3798"></path> */}
    </Svg>
  );
};

export default Icon;
