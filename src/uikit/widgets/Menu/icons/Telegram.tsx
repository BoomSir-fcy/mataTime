import React from "react";
import Svg from "../../../components/Svg/Svg";
import { SvgProps } from "../../../components/Svg/types";

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 1024 1024" {...props}>
      <path d="M512 1024A512 512 0 1 0 0 512 512 512 0 0 0 512 1024" fill="#4eceb4" p-id="3119"></path>
      <path d="M725.4016 245.76L163.84 450.56a11.8784 11.8784 0 0 0 0 21.7088L295.7312 532.48l63.488 178.176a9.4208 9.4208 0 0 0 9.0112 6.144H368.64a8.6016 8.6016 0 0 0 5.3248-2.048l100.7616-81.92-65.1264-49.152L619.7248 737.28a11.8784 11.8784 0 0 0 18.432-6.9632l102.8096-471.8592a11.8784 11.8784 0 0 0-15.5648-12.6976zM368.64 672.9728l-54.8864-147.8656 311.7056-190.8736L393.216 573.44a13.5168 13.5168 0 0 0-2.4576 4.096z" fill="#067d73" p-id="3120"></path>
    </Svg>
  );
};

export default Icon;