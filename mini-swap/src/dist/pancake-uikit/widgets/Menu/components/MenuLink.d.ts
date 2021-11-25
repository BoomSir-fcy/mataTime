import React, { AnchorHTMLAttributes } from "react";
import { DropdownMenuItemType } from "../types";
export interface MenuLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
    menuType?: DropdownMenuItemType;
}
declare const MenuLink: React.FC<MenuLinkProps>;
export default MenuLink;
