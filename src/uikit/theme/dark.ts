import { DefaultTheme } from "styled-components";
// import { dark as darkAlert } from "../components/Alert/theme";
// import { dark as darkCard } from "../components/Card/theme";
// import { dark as darkPancakeToggle } from "../components/PancakeToggle/theme";
// import { dark as darkRadio } from "../components/Radio/theme";
// import { dark as darkToggle } from "../components/Toggle/theme";
import { dark as darkNav } from "../widgets/Menu/theme";
// import { dark as darkModal } from "../widgets/Modal/theme";
// import { dark as darkTooltip } from "../components/Tooltip/theme";
import base from "./base";
import { darkColors } from "./colors";
import { darkFilter } from "./filter";

const darkTheme: DefaultTheme = {
  ...base,
  isDark: true,
  filter: darkFilter,
  // alert: darkAlert,
  colors: darkColors,
  nav: darkNav,
  main: ""
};

export default darkTheme;
