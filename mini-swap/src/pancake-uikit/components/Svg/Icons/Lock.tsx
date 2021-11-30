import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 1024 1024" {...props}>
      <path d="M806.78735999 406.08784L217.20143999 406.08784c-50.92416 0-92.20175999 41.19248001-92.20175999 92.01920002l0 390.34127999c0 50.82784 41.27759999 92.0192 92.20175999 92.0192l589.58704001 0c50.92528001 0 92.21408-41.19136 92.21408-92.0192L899.00256 498.10704002C899.00143999 447.28032001 857.71264 406.08784 806.78735999 406.08784zM550.82592 690.63728l0 102.45648001c0 21.4368-17.37231999 38.83376001-38.83152001 38.83376001-21.44688001 0-38.83152001-17.39695999-38.83151999-38.83376001l0-102.45647999c-23.18735999-13.43104-38.83264-38.46640001-38.83264-67.20112001 0-42.896 34.76816001-77.66528 77.66415999-77.66528s77.67648 34.76928 77.67648 77.66528C589.67088001 652.17088001 574.03791999 677.20624002 550.82592 690.63728zM511.99439999 37.13408001c-150.13263999 0-271.84864 120.00016001-271.84864 277.66368l2e-8 120.58479999 543.71072 25.88768L783.85648001 314.79776001C783.85648001 157.13424 662.14048 37.13408001 511.99439999 37.13408001zM317.85807999 428.56960001L317.85807999 312.09744c0-107.20192 86.92096-194.13632 194.13520001-194.13632 107.22656 0 194.13632 86.9344 194.13632 194.13632l0 119.19712L317.85807999 428.56960001z" p-id="1878"></path>
    </Svg>
  );
};

export default Icon;