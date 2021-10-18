import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";
import arrowRight from './assets/arrowRight.png'

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 40 40" {...props}>
      <image xlinkHref={arrowRight}/>
      {/* <path d="M543.513369 316.093117a21.956036 21.956036 0 0 0-31.052108-31.052108l-190.224144 190.205694a28.487495 28.487495 0 0 0 0 40.295783l190.224144 190.205694a21.956036 21.956036 0 0 0 31.052108-31.052108l-154.983783-154.983784h326.203964a24.280793 24.280793 0 0 0 24.262342-24.723603c-0.239856-13.358126-11.716036-23.801081-25.074162-23.801081H388.474234z" fill="#067d73" p-id="4207"></path>
      <path d="M844.495568 317.347748a18.45045 18.45045 0 0 0-25.830631-6.715964 18.45045 18.45045 0 0 0-6.420757 24.723603 330.53982 330.53982 0 0 1 41.052252 160.279063c-0.129153 183.342126-150.684829 332.883027-333.953153 331.849802a332.108108 332.108108 0 0 1-330.170811-330.263063c-1.014775-181.44173 149.448649-333.381189 330.94573-333.953153A330.705874 330.705874 0 0 1 651.780613 190.03964a18.45045 18.45045 0 0 0 23.856432-8.745514 18.45045 18.45045 0 0 0-9.391279-25.221766c-65.11164-27.933982-139.835964-37.638919-217.89982-22.712504C319.820108 157.991207 190.03964 283.02991 161.607495 410.83618 107.824432 653.145946 292.45809 867.447928 526.188396 864.366703 728.792793 861.636036 892.300685 694.142847 890.215784 491.52a367.034811 367.034811 0 0 0-45.720216-174.172252z" fill="#067d73" p-id="4208"></path> */}
    </Svg>
  );
};

export default Icon;
