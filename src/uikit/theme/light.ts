import { DefaultTheme } from 'styled-components';
// import { light as lightAlert } from "../components/Alert/theme";
import { light as lightCard } from '../components/Card/theme';
// import { light as lightPancakeToggle } from "../components/PancakeToggle/theme";
import { light as lightRadio } from '../components/Radio/theme';
import { light as lightToggle } from '../components/Toggle/theme';
import { light as lightTooltip } from '../components/Tooltip/theme';
import { light as lightNav } from '../widgets/Menu/theme';
// import { light as lightModal } from "../widgets/Modal/theme";
import base from './base';
import { lightColors } from './colors';
import { lightFilter } from './filter';

const lightTheme: DefaultTheme = {
  ...base,
  isDark: false,
  filter: lightFilter,
  // alert: lightAlert,
  colors: lightColors,
  nav: lightNav,
  radio: lightRadio,
  card: lightCard,
  toggle: lightToggle,
  tooltip: lightTooltip,
  main: ''
};

export default lightTheme;