export type Breakpoints = string[];

export type MediaQueries = {
  xxs: string;
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl: string;
  nav: string;
};
export type MediaQueriesSize = {
  margin: string;
  marginUD: string;
  marginLRmd: string;
  marginb: string;
  marginbmd: string;
  marginbsm: string;
  margint: string;
  marginr: string;
  marginrmd: string;
  marginl: string;
  marginlmd: string;
  padding: string;
  paddingsm: string;
  paddingxs: string;
};

export type BreakpointMap = {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  nav: number;
};

export type Spacing = number[];

export type Radii = {
  small: string;
  default: string;
  card: string;
  nftImage: string;
  circle: string;
};

export type Shadows = {
  level1: string;
  active: string;
  success: string;
  warning: string;
  focus: string;
  inset: string;
  box: string;
  nav: string;
};

export type Gradients = {
  footer: string;
  signinBackground: string;
  bubblegum: string;
  inverseBubblegum: string;
  cardHeader: string;
  blue: string;
  violet: string;
  tags: string;
  violetAlt: string;
  gold: string;
};

export type Colors = {
  protrudeColor: string;
  ThemeText: string;
  upPrice: string;
  white: string;
  downPrice: string;
  primary: string;
  primaryBright: string;
  primaryDark: string;
  secondary: string;
  tertiary: string;
  success: string;
  failure: string;
  warning: string;
  cardBorder: string;
  contrast: string;
  dropdown: string;
  dropdownDeep: string;
  invertedContrast: string;
  input: string;
  inputPanel: string;
  inpuShadows: string;
  inputSecondary: string;
  inputSelect: string;
  background: string;
  backgroundPage: string;
  backgroundLight: string;
  backgroundSelect: string;
  backgroundDisabled: string;
  backgroundPrimary: string;
  backgroundMember: string;
  backgroundThemeCard: string;
  backgroundCard: string;
  backgroundTextArea: string;
  backgroundMenu: string;
  backgroundMenuIcon: string;
  backgroundMenuBack: string;
  textValue: string;
  backgroundAlt: string;
  text: string;
  white_black: string;
  member_num: string;
  textPrimary: string;
  textTips: string;
  textDisabled: string;
  textSubtle: string;
  textOrigin: string;
  textgrey: string;
  disabled: string;
  borderThemeColor: string;
  borderColor: string;
  searchTopicBg: string;
  searchTopicTxt: string;
  // Gradients
  gradients: Gradients;

  // box shadow
  shadow: {
    box: string;
  };

  // Additional colors
  binance: string;
  overlay: string;
  gold: string;
  silver: string;
  bronze: string;

  // NFT Token Colors
  triangleDinosaur: string;
  meat: string;
  editorText: string;
  editorBoxBg: string;
  searchTopicHoverBg: string;
  commentHoverBg: string;
  commentBorder: string;
};

export type Filters = {
  brightness: string;
  grayscale: string;
  blur: string;
};

export type ZIndices = {
  dropdown: number;
  modal: number;
};
