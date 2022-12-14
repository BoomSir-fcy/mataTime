import { AlertTheme } from "../components/Alert/types";
import { CardTheme } from "../components/Card/types";
import { PancakeToggleTheme } from "../components/PancakeToggle/types";
import { RadioTheme } from "../components/Radio/types";
import { ToggleTheme } from "../components/Toggle/types";
import { TooltipTheme } from "../components/Tooltip/types";
import { ModalTheme } from "../widgets/Modal/types";
import { Colors, Breakpoints, MediaQueries, BreakpointMap, Spacing, Shadows, Radii, ZIndices, MediaQueriesSize, Filters } from "./types";

export interface PancakeTheme {
  siteWidth: number;
  isDark: boolean;
  alert: AlertTheme;
  filter: Filters;
  colors: Colors;
  card: CardTheme;
  modal: ModalTheme;
  pancakeToggle: PancakeToggleTheme;
  radio: RadioTheme;
  toggle: ToggleTheme;
  tooltip: TooltipTheme;
  breakpoints: Breakpoints;
  mediaQueries: MediaQueries;
  // breakpointMap: BreakpointMap;
  spacing: Spacing;
  shadows: Shadows;
  radii: Radii;
  zIndices: ZIndices;
  mediaQueriesSize: MediaQueriesSize;
}

export { default as dark } from "./dark";
export { default as light } from "./light";

export { lightColors } from "./colors";
export { darkColors } from "./colors";
