import { Colors } from "./types";

export const baseColors = {
  failure: "#ec4f2b",
  primary: "#5D95E7",
  primaryBright: "#53DEE9",
  primaryDark: "#0098A1",
  secondary: "#7645D9",
  success: "#5D95E7",
  warning: "#FFB237",
  transparent: "transparent",
};

export const additionalColors = {
  binance: "#F0B90B",
  overlay: "#626262",
  gold: "#FFC700",
  silver: "#B2B2B2",
  bronze: "#E7974D",
  orange: "#FF780B",
};

export const nftTokenColors = {
  triangleDinosaur: "#F3A5C4",
  meat: "#8A260E",
};

export const lightColors: Colors = {
  ...baseColors,
  ...additionalColors,
  ...nftTokenColors,
  smHeadText: '#56604E',
  smTitletext: '#759290',
  white_blue: '#010101',
  white: "white",
  background: "#FAF9FA",
  backgroundPage: "#f5fdfc",
  backgroundLight: "#E7EFF9",
  backgroundSelect: "#F5F5F5",
  backgroundDisabled: "#969696",
  backgroundPrimary: "#8EB5EF",
  backgroundMember: "#5D95E7",
  backgroundCard: "#FFFFFF",
  backgroundAlt: "#FFFFFF",
  cardBorder: "#E7E3EB",
  contrast: "#191326",
  dropdown: "#F6F6F6",
  dropdownDeep: "#EEEEEE",
  invertedContrast: "#FFFFFF",
  input: "#F5F5F5",
  inputPanel: "#E7EFF9",
  inpuShadows: "inset 0px 1px 3px 0px rgba(16, 64, 54, 0.21)",
  inputSecondary: "#d7caec",
  inputSelect: "#DBDBDB",
  tertiary: "#EFF4F5",
  text: "#283433",
  white_black: '#000',
  member_num: '#305C9C',
  textValue: "#7E7E7E",
  textPrimary: "#5D95E7",
  textSubtle: "#5D95E7",
  textDisabled: "#BDC2C4",
  disabled: "#E9EAEB",
  gradients: {
    bubblegum: "linear-gradient(139.73deg, #E5FDFF 0%, #F3EFFF 100%)",
    inverseBubblegum: "linear-gradient(139.73deg, #F3EFFF 0%, #E5FDFF 100%)",
    cardHeader: "linear-gradient(111.68deg, #F2ECF2 0%, #E8F2F6 100%)",
    blue: "linear-gradient(180deg, #A7E8F1 0%, #94E1F2 100%)",
    violet: "linear-gradient(180deg, #E2C9FB 0%, #CDB8FA 100%)",
    violetAlt: "linear-gradient(180deg, #CBD7EF 0%, #9A9FD0 100%)",
    gold: "linear-gradient(180deg, #FFD800 0%, #FDAB32 100%)",
  },
};

export const darkColors: Colors = {
  ...baseColors,
  ...additionalColors,
  ...nftTokenColors,
  smHeadText: '#B3C7E3',
  smTitletext: '#759290',
  white_blue: '#5D95E7',
  white: "white",
  secondary: "#9A6AFF",
  background: "#08060B",
  backgroundPage: "#0B1513",
  backgroundLight: "#334542",
  backgroundSelect: "#2f3836",
  backgroundDisabled: "#3c3742",
  backgroundPrimary: "#8EB5EF",
  backgroundMember: 'rgba(93, 149, 231, 0.498)',
  backgroundCard: "#191F2D",
  backgroundAlt: "#212827",
  cardBorder: "#383241",
  contrast: "#FFFFFF",
  dropdown: "#1E1D20",
  dropdownDeep: "#212827",
  invertedContrast: "#191326",
  input: "#292D34",
  inputPanel: "#21262A",
  inpuShadows: "inset 0px 3px 2px 0px rgba(0, 0, 0, 0.35)",
  inputSelect: "#292D34",
  inputSecondary: "#262130",
  primaryDark: "#0098A1",
  tertiary: "#353547",
  text: "#bad1bd",
  white_black: '#FFFFFF',
  member_num: '#FFFFFF',
  textValue: "#7E7E7E",
  textPrimary: "#5D95E7",
  textSubtle: "#5D95E7",
  textDisabled: "#666171",
  disabled: "#524B63",
  gradients: {
    bubblegum: "linear-gradient(139.73deg, #313D5C 0%, #3D2A54 100%)",
    inverseBubblegum: "linear-gradient(139.73deg, #3D2A54 0%, #313D5C 100%)",
    cardHeader: "linear-gradient(166.77deg, #3B4155 0%, #3A3045 100%)",
    blue: "linear-gradient(180deg, #00707F 0%, #19778C 100%)",
    violet: "linear-gradient(180deg, #6C4999 0%, #6D4DB2 100%)",
    violetAlt: "linear-gradient(180deg, #434575 0%, #66578D 100%)",
    gold: "linear-gradient(180deg, #FFD800 0%, #FDAB32 100%)",
  },
};
