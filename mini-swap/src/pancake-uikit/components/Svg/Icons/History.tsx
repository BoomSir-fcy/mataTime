import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 1024 1024" {...props}>
      <path d="M839.104 192.96A460.48 460.48 0 0 0 511.488 57.216a460.352 460.352 0 0 0-327.68 135.744 460.352 460.352 0 0 0-135.744 327.68c0 90.176 25.92 177.6 74.944 252.8a32.192 32.192 0 1 0 53.952-35.2 397.824 397.824 0 0 1-64.512-217.6A399.36 399.36 0 0 1 511.36 121.792c219.968 0 398.848 178.944 398.848 398.848s-178.944 398.848-398.848 398.848a398.08 398.08 0 0 1-206.08-57.28 32.256 32.256 0 0 0-33.408 55.168 462.208 462.208 0 0 0 239.424 66.56 460.288 460.288 0 0 0 327.616-135.68c87.488-87.552 135.744-203.968 135.744-327.68s-48-240.064-135.552-327.616z m-345.472 10.496a40.768 40.768 0 0 0-40.768 40.832v293.504c0 1.408 0.384 2.816 0.512 4.16a40.32 40.32 0 0 0 40.768 35.84l0.128-0.896h231.488a40.832 40.832 0 1 0 0-81.6H534.464V244.288a40.832 40.832 0 0 0-40.832-40.832z m0 0" p-id="2168"></path>
    </Svg>
  );
};
export default Icon;
