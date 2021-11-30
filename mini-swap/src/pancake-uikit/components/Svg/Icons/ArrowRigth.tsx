import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 1024 1024" {...props}>
      <path d="M511.01538462 989.53846154L511.01538463 762.09230769l-100.43076925-5.90769231c-11.81538462 0-21.66153846-9.84615385-21.66153846-21.66153846L388.92307692 289.47692308c0-11.81538462 9.84615385-21.66153846 22.64615384-21.66153846L511.01538462 265.84615385 511.01538462 35.44615385l5.9076923-6.8923077c4.92307692-5.9076923 11.81538462-8.86153846 19.6923077-8.86153846s14.76923077 2.95384615 18.7076923 8.86153846L996.43076923 492.30769232c4.92307692 4.92307692 7.87692308 11.81538462 7.87692308 19.69230768s-2.95384615 14.76923077-7.87692308 19.69230768l-441.10769231 464.73846155c-9.84615385 10.83076923-27.56923077 10.83076923-37.41538461 0l-6.89230769-6.89230769zM265.84615386 266.83076923c33.47692307 0 61.04615384 27.56923077 61.04615383 61.04615384l0 370.21538461c0 33.47692307-27.56923077 61.04615384-61.04615384 61.04615386-33.47692307 0-61.04615384-27.56923077-61.04615385-61.04615385L204.8 327.87692308c0-33.47692307 27.56923077-61.04615384 61.04615386-61.04615385z m-185.10769231 60.06153846c33.47692307 0 61.04615385 29.53846154 61.04615383 65.96923076l0 236.30769232c0 36.43076924-27.56923077 65.96923076-61.04615384 65.96923077-33.47692307 0-61.04615385-29.53846154-61.04615385-65.96923077L19.69230769 393.84615385c0-36.43076924 27.56923077-66.95384615 61.04615386-66.95384616z" p-id="2066"></path>
    </Svg>
  );
};

export default Icon;