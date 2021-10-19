import { ReactElement } from "react";
import { Colors } from "../../theme/types";

export interface Language {
  code: string;
  language: string;
  locale: string;
}

export enum DropdownMenuItemType {
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
  isDark?: boolean;
  toggleTheme?: (isDark: boolean) => void;
  cakePriceUsd?: number;
  currentLang?: string;
  langs?: Language[];
  setLang?: (lang: Language) => void;
  links?: Array<MenuEntry>;
}

export interface NavProps extends PanelProps {
  userMenu?: ReactElement<{isPushed?: boolean, isMobile?: boolean}>;
  panelSlot?: ReactElement;
}

export const scales = {
  LD: "ld",
  MD: "md",
  SM: "sm",
  XS: "xs",
} as const;

export type Scale = typeof scales[keyof typeof scales];

export const scaleVariants = {
  [scales.LD]: {
    boxWidth: "32px",
    iconWidth: 32,
    marginL: '-8px',
    subMarginL: null,
    fontSize: null,
    subFontSize: '14px',
    skeletonW: 80,
    skeletonH: 24,
  },
  [scales.MD]: {
    boxWidth: "48px",
    iconWidth: 48,
    subMarginL: null,
    marginL: '-8px',
    fontSize: null,
    subFontSize: '14px',
    skeletonW: 80,
    skeletonH: 24,
  },
  [scales.SM]: {
    boxWidth: "72px",
    iconWidth: 72,
    marginL: '-16px',
    subMarginL: null,
    subFontSize: '16px',
    fontSize: '25px',
    skeletonW: 120,
    skeletonH: 48,
  },
  [scales.XS]: {
    boxWidth: "160px",
    iconWidth: 160,
    marginL: '-40px',
    subMarginL: '-16px',
    fontSize: '50px',
    subFontSize: '26px',
    skeletonW: 120,
    skeletonH: 48,
  },
};
