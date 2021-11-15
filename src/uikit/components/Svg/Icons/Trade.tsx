import React from "react";
import Svg from "../../../components/Svg/Svg";
import { SvgProps } from "../../../components/Svg/types";
import trade from './assets/trade.png'

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 60 60" {...props}>
      <image xlinkHref={trade} />
      {/* <path d="M778.0352 204.8a406.20032 406.20032 0 0 1 43.0592 182.4256c0 225.2288-182.5792 407.8592-407.8592 407.8592-100.1472 0-191.8464-36.1472-262.8096-96.0512 66.9696 133.632 205.1072 225.4336 364.8 225.4336 225.2288 0 407.8592-182.5792 407.8592-407.8592-0.0512-125.0816-56.4224-236.9536-145.0496-311.808z" fill="#4eceb4" p-id="2845"></path>
      <path d="M733.2352 376.3712H363.7248l56.0128-68.4544c10.752-13.1584 8.8064-32.512-4.3008-43.2128-13.1584-10.752-32.512-8.8064-43.2128 4.3008L275.1488 387.6352a30.72 30.72 0 1 0 23.7568 50.176h434.3296c16.9472 0 30.72-13.7728 30.72-30.72s-13.7728-30.72-30.72-30.72zM733.2352 565.6064H298.9056c-16.9472 0-30.72 13.7728-30.72 30.72s13.7728 30.72 30.72 30.72h370.176l-56.832 70.6048a30.74048 30.74048 0 0 0 23.9104 50.0224c8.96 0 17.8688-3.9424 23.9616-11.4688l97.0752-120.576c7.424-9.216 8.9088-21.8624 3.7888-32.512a30.75584 30.75584 0 0 0-27.7504-17.5104z" fill="#067d73" p-id="2846"></path>
      <path d="M515.1744 78.0288c-241.8176 0-438.5792 196.7616-438.5792 438.5792s196.7616 438.5792 438.5792 438.5792 438.5792-196.7616 438.5792-438.5792-196.7104-438.5792-438.5792-438.5792z m0 815.7184c-207.9744 0-377.1392-169.1648-377.1392-377.1392S307.2 139.4688 515.1744 139.4688s377.1392 169.1648 377.1392 377.1392-169.1648 377.1392-377.1392 377.1392z" fill="#067d73" p-id="2847"></path> */}
    </Svg>
  );
};

export default Icon;