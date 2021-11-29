import React from "react";
import Link from "./Link";
import { LinkProps } from "./types";
import OpenNewIcon from "../Svg/Icons/OpenNew";

const LinkExternal: React.FC<LinkProps> = ({ children, ...props }) => {
  return (
    <Link external {...props}>
      {children}
      <OpenNewIcon width="18px" color={props.color ? props.color : "textPrimary"} ml="4px" />
    </Link>
  );
};

export default LinkExternal;
