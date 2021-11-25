import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 1024 1024" {...props}>
      <path d="M797.47878827 983.66060587h-570.95757654A186.4300608 186.4300608 0 0 1 40.33939413 797.47878827v-570.95757654A186.4300608 186.4300608 0 0 1 226.52121173 40.33939413H512a37.23636373 37.23636373 0 0 1 0 74.47272747H226.52121173A111.95733333 111.95733333 0 0 0 114.8121216 226.52121173v570.95757654a111.95733333 111.95733333 0 0 0 111.70909013 111.70909013h570.95757654a111.95733333 111.95733333 0 0 0 111.70909013-111.70909013V512a37.23636373 37.23636373 0 0 1 74.47272747 0v285.47878827a186.4300608 186.4300608 0 0 1-186.1818176 186.1818176z" p-id="2692"></path><path d="M499.5878784 561.64848533a37.48460587 37.48460587 0 0 1-26.31369707-10.92266666 36.9881216 36.9881216 0 0 1 0-52.62739414l446.83636374-446.83636373a37.23636373 37.23636373 0 0 1 52.62739413 52.62739413l-446.83636373 446.83636374a37.48460587 37.48460587 0 0 1-26.31369707 10.92266666z" p-id="2693"></path><path d="M946.42424213 114.8121216h-198.5939392a37.23636373 37.23636373 0 0 1 0-74.47272747h198.5939392a37.23636373 37.23636373 0 0 1 0 74.47272747z" p-id="2694"></path><path d="M946.42424213 313.4060608a37.23636373 37.23636373 0 0 1-37.23636373-37.23636373v-198.5939392a37.23636373 37.23636373 0 0 1 74.47272747 0v198.5939392a37.23636373 37.23636373 0 0 1-37.23636374 37.23636373z" p-id="2695"></path>
    </Svg>
  );
};

export default Icon;
