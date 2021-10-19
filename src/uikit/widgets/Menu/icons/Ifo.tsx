import React from "react";
import Svg from "../../../components/Svg/Svg";
import { SvgProps } from "../../../components/Svg/types";

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 1024 1024" {...props}>
      <path d="M521.472 206.933333C351.303111 206.933333 213.333333 344.888889 213.333333 515.086222c0 170.183111 137.969778 308.138667 308.138667 308.138667 170.197333 0 308.152889-137.955556 308.152889-308.138667 0-170.197333-137.955556-308.152889-308.152889-308.152889z m164.252444 276.238223l-75.164444 72.931555 16.967111 100.48c0.611556 1.578667 0.938667 6.684444 0.938667 8.490667 0 7.864889-6.357333 17.592889-14.222222 17.592889h-0.284445c-2.275556 0-4.551111-3.911111-6.656-5.034667l-92.515555-50.673778-92.814223 47.630222c-4.792889 2.503111-10.609778 1.607111-14.976-1.550222a14.606222 14.606222 0 0 1-5.632-14.136889l17.962667-103.210666-74.766222-73.329778a14.264889 14.264889 0 0 1 7.950222-24.277333l103.608889-14.776889 46.563555-93.923556c2.417778-4.835556 7.338667-8.035556 12.743112-8.035555h0.028444c5.418667 0 10.368 3.256889 12.743111 8.106666l46.051556 94.08 103.594666 15.331556a14.250667 14.250667 0 0 1 7.879111 24.305778z" fill="#4eceb4" p-id="2708"></path>
      <path d="M864.469333 910.606222c-35.768889-6.869333-71.68-12.245333-107.377777-16.455111 124.928-80.796444 202.666667-220.16 202.666666-372.110222 0-244.337778-198.798222-443.121778-443.136-443.121778S73.486222 277.703111 73.486222 522.040889c0 151.765333 78.748444 292.579556 204.572445 373.304889-68.124444 7.395556-110.094222 15.018667-111.288889 15.232a21.319111 21.319111 0 1 0 7.793778 41.941333c2.872889-0.540444 240.625778-43.662222 510.037333-22.656 0.312889 0.014222 0.625778 0.142222 0.938667 0.142222l0.341333-0.042666c56.092444 4.437333 113.536 11.562667 170.524444 22.528a21.333333 21.333333 0 0 0 8.064-41.884445z m-512-22.101333a20.622222 20.622222 0 0 0-4.906666-3.299556C206.990222 819.626667 116.152889 677.063111 116.152889 522.040889c0-220.814222 179.655111-400.455111 400.469333-400.455111S917.091556 301.226667 917.091556 522.040889a400.568889 400.568889 0 0 1-235.477334 364.842667c-122.695111-9.102222-238.492444-5.361778-329.144889 1.621333z" fill="#067d73" p-id="2709"></path>
    </Svg>
  );
};

export default Icon;
