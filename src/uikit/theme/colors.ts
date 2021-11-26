import { Colors } from './types';

export const baseColors = {
  failure: '#ED4B9E',
  primary: '#FFFFFF',
  primaryBright: '#FFFFFF',
  primaryDark: '#000',
  secondary: '#7645D9',
  success: '#4168ED',
  warning: '#FFB237',
  transparent: 'transparent',
  blue: '#5A79F8',
  switch: '#2B303F',
  switchChecked: '#4168ED'
};

export const additionalColors = {
  binance: '#F0B90B',
  overlay: '#626262',
  gold: '#FFC700',
  silver: '#B2B2B2',
  bronze: '#E7974D',
  orange: '#FF780B',
  upPrice: '#9AF170',
  downPrice: '#ec612b'
};

export const nftTokenColors = {
  triangleDinosaur: '#F3A5C4',
  meat: '#8A260E'
};

export const lightColors: Colors = {
  ...baseColors,
  ...additionalColors,
  ...nftTokenColors,
  white: 'white',
  background: '#FFF',
  backgroundPage: '#f5fdfc',
  backgroundLight: '#EAF2FF',
  backgroundSelect: '#ceece7',
  backgroundDisabled: '#E9EAEB',
  backgroundPrimary: '#4168ED',
  backgroundMember: '#85C559',
  backgroundThemeCard: '#1E2535',
  backgroundCard: '#FAFCFF',
  backgroundAlt: '#FFFFFF',
  backgroundTextArea: '#EAF2FF',
  backgroundMenu: '#EAF2FF',
  backgroundMenuBack: '#4168ED',
  backgroundMenuIcon: '#7A83A0',
  cardBorder: '#E7E3EB',
  contrast: '#191326',
  dropdown: '#F6F6F6',
  dropdownDeep: '#EEEEEE',
  invertedContrast: '#FFFFFF',
  input: '#F9F7F8',
  inputPanel: '#F6FFF0',
  inpuShadows: 'inset 0px 1px 3px 0px rgba(16, 64, 54, 0.21)',
  inputSecondary: '#7393FF',
  inputSelect: '#DBDBDB',
  tertiary: '#4D535F',
  text: '#283433',
  white_black: '#000',
  member_num: '#549A23',
  textValue: '#7E7E7E',
  textPrimary: '#7393FF',
  textSubtle: '#EAEAEA',
  textTips: '#B5B5B5',
  textDisabled: '#BDC2C4',
  textOrigin: '#EC612B',
  textgrey: '#7A83A0',
  disabled: '#E9EAEB',
  borderThemeColor: '#EAF2FF',
  borderColor: '#EFF4F5',
  protrudeColor: '#FFFFFF',
  ThemeText: '#4168ED',
  gradients: {
    footer: 'linear-gradient(90deg, #5B3CE0, #5A7EFA)',
    signinBackground: 'radial-gradient(circle, #262f38, #050a0e)',
    bubblegum: 'linear-gradient(139.73deg, #E5FDFF 0%, #F3EFFF 100%)',
    inverseBubblegum: 'linear-gradient(139.73deg, #F3EFFF 0%, #E5FDFF 100%)',
    cardHeader: 'linear-gradient(111.68deg, #F2ECF2 0%, #E8F2F6 100%)',
    blue: 'linear-gradient(180deg, #A7E8F1 0%, #94E1F2 100%)',
    violet: 'linear-gradient(180deg, #E2C9FB 0%, #CDB8FA 100%)',
    violetAlt: 'linear-gradient(180deg, #CBD7EF 0%, #9A9FD0 100%)',
    gold: 'linear-gradient(180deg, #FFD800 0%, #FDAB32 100%)'
  },
  shadow: {
    box: '0px 0px 5px 0px rgba(34, 30, 28, 0.14)'
  },
  editorText: '#000',
  editorBoxBg: '#fff',
  searchTopicBg: '#fff',
  searchTopicTxt: '#000',
  searchTopicHoverBg: '#eaf2ff',
  commentBorder: '#ccc',
  commentHoverBg: '#eaf2ff'
};

export const darkColors: Colors = {
  ...baseColors,
  ...additionalColors,
  ...nftTokenColors,
  white: 'white',
  secondary: '#9A6AFF',
  background: '#191F2D',
  backgroundPage: '#0B1513',
  backgroundLight: '#2B303F',
  backgroundSelect: '#4168ED',
  backgroundDisabled: '#3c3742',
  backgroundPrimary: '#4168ED',
  backgroundMember: 'rgba(49, 64, 111, 0.5)',
  backgroundThemeCard: '#1E2535',
  backgroundCard: '#1E2535',
  backgroundAlt: '#FFFFFF',
  backgroundTextArea: '#292D34',
  backgroundMenu: '#232A3D',
  backgroundMenuBack: '#FFFFFF',
  backgroundMenuIcon: '#FFFFFF',
  cardBorder: '#383241',
  contrast: '#FFFFFF',
  dropdown: '#1E1D20',
  dropdownDeep: '#212827',
  invertedContrast: '#191326',
  input: '#292D34',
  inputPanel: '#21262A',
  inpuShadows: 'inset 0px 3px 2px 0px rgba(0, 0, 0, 0.35)',
  inputSelect: '#292D34',
  inputSecondary: '#262130',
  primaryDark: '#0098A1',
  tertiary: '#4D535F',
  text: '#FFF',
  white_black: '#FFFFFF',
  member_num: '#FFFFFF',
  textValue: '#7E7E7E',
  textPrimary: '#7393FF',
  textSubtle: '#EAEAEA',
  textTips: '#B5B5B5',
  textDisabled: '#666171',
  textOrigin: '#EC612B',
  textgrey: '#B4C8A9',
  disabled: '#524B63',
  borderThemeColor: '#3A4459',
  borderColor: '#4D535F',
  protrudeColor: '#4168ED',
  ThemeText: '#4168ED',
  gradients: {
    footer: '#191F2D',
    signinBackground: 'radial-gradient(circle, #262f38, #050a0e)',
    bubblegum: 'linear-gradient(139.73deg, #313D5C 0%, #3D2A54 100%)',
    inverseBubblegum: 'linear-gradient(139.73deg, #3D2A54 0%, #313D5C 100%)',
    cardHeader: 'linear-gradient(166.77deg, #3B4155 0%, #3A3045 100%)',
    blue: 'linear-gradient(180deg, #00707F 0%, #19778C 100%)',
    violet: 'linear-gradient(180deg, #6C4999 0%, #6D4DB2 100%)',
    violetAlt: 'linear-gradient(180deg, #434575 0%, #66578D 100%)',
    gold: 'linear-gradient(180deg, #FFD800 0%, #FDAB32 100%)'
  },
  shadow: {
    box: '0px 0px 5px 0px rgba(180, 200, 169, 0.3)'
  },
  editorText: '#FFFFFF',
  editorBoxBg: '#191f2d',
  searchTopicBg: '#2F3749',
  searchTopicHoverBg: '#191f2d',
  searchTopicTxt: '#fff',
  commentHoverBg: '#1F2534',
  commentBorder: '#ccc'
};
