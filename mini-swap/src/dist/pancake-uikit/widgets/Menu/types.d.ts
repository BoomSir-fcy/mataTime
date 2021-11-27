import { ReactElement } from "react";
import { Colors } from "../../theme/types";
export interface Language {
    code: string;
    language: string;
    locale: string;
}
export declare enum DropdownMenuItemType {
    INTERNAL_LINK = 0,
    EXTERNAL_LINK = 1,
    BUTTON = 2,
    DIVIDER = 3
}
export interface PushedProps {
    isPushed: boolean;
    pushNav: (isPushed: boolean) => void;
}
export interface NavTheme {
    background: string;
}
export interface LinkStatus {
    text: string;
    color: keyof Colors;
}
export interface MenuSubEntry {
    label: string;
    href: string;
    calloutClass?: string;
    status?: LinkStatus;
    type?: DropdownMenuItemType;
    icon?: string;
}
export interface MenuEntry {
    label: string;
    icon: string;
    items?: MenuSubEntry[];
    href?: string;
    calloutClass?: string;
    initialOpenState?: boolean;
    status?: LinkStatus;
    type?: DropdownMenuItemType;
}
export interface PanelProps {
    isDark: boolean;
    toggleTheme: (isDark: boolean) => void;
    cakePriceUsd?: number;
    currentLang: string;
    langs: Language[];
    setLang: (lang: Language) => void;
    links: Array<MenuEntry>;
}
export interface NavProps extends PanelProps {
    userMenu?: ReactElement<{
        isPushed?: boolean;
        isMobile?: boolean;
    }>;
    panelSlot?: ReactElement;
}
export declare const scales: {
    readonly LD: "ld";
    readonly MD: "md";
    readonly SM: "sm";
    readonly XS: "xs";
};
export declare type Scale = typeof scales[keyof typeof scales];
export declare const scaleVariants: {
    ld: {
        boxWidth: string;
        iconWidth: number;
        marginL: string;
        subMarginL: any;
        fontSize: any;
        subFontSize: string;
        skeletonW: number;
        skeletonH: number;
    };
    md: {
        boxWidth: string;
        iconWidth: number;
        subMarginL: any;
        marginL: string;
        fontSize: any;
        subFontSize: string;
        skeletonW: number;
        skeletonH: number;
    };
    sm: {
        boxWidth: string;
        iconWidth: number;
        marginL: string;
        subMarginL: any;
        subFontSize: string;
        fontSize: string;
        skeletonW: number;
        skeletonH: number;
    };
    xs: {
        boxWidth: string;
        iconWidth: number;
        marginL: string;
        subMarginL: string;
        fontSize: string;
        subFontSize: string;
        skeletonW: number;
        skeletonH: number;
    };
};
