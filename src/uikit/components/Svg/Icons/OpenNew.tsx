import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";
import openNew from './assets/openNew.png'

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 1024 1024" {...props}>
      <path d="M811.28993938 1006.4790294h-598.57987876A195.44934295 195.44934295 0 0 1 17.5209706 811.28993938v-598.57987876A195.44934295 195.44934295 0 0 1 212.71006062 17.5209706H512a39.03781822 39.03781822 0 0 1 0 78.07563646H212.71006062A117.37370649 117.37370649 0 0 0 95.59660706 212.71006062v598.57987876a117.37370649 117.37370649 0 0 0 117.11345356 117.11345356h598.57987876a117.37370649 117.37370649 0 0 0 117.11345356-117.11345356V512a39.03781822 39.03781822 0 0 1 78.07563646 0v299.28993938a195.44934295 195.44934295 0 0 1-195.18909002 195.18909002z" p-id="4187"></path><path d="M498.98739355 564.05042468a39.29807004 39.29807004 0 0 1-27.58672491-11.45109332 38.77756642 38.77756642 0 0 1 0-55.17344983l468.45381763-468.45381761a39.03781822 39.03781822 0 0 1 55.17344981 55.17344981l-468.45381761 468.45381763a39.29807004 39.29807004 0 0 1-27.58672492 11.45109332z" p-id="4188"></path><path d="M967.44121116 95.59660706h-208.20169646a39.03781822 39.03781822 0 0 1 0-78.07563646h208.20169646a39.03781822 39.03781822 0 0 1 0 78.07563646z" p-id="4189"></path><path d="M967.44121116 303.79830352a39.03781822 39.03781822 0 0 1-39.03781822-39.03781822v-208.20169646a39.03781822 39.03781822 0 0 1 78.07563646 0v208.20169646a39.03781822 39.03781822 0 0 1-39.03781824 39.03781822z" p-id="4190"></path>
    </Svg>
  );
};

export default Icon;
