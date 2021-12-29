import { Colors } from './types';

export const baseColors = {
  failure: '#EC612B',
  primary: '#FFFFFF',
  primaryBright: '#FFFFFF',
  primaryDark: '#000',
  secondary: '#7645D9',
  success: '#4168ED',
  primaryGreen: "#287452",
  warning: '#FFB237',
  transparent: 'transparent',
  blue: '#5A79F8',
  switch: '#2B303F',
  switchChecked: '#4168ED',
};

export const additionalColors = {
  binance: '#F0B90B',
  overlay: '#626262',
  gold: '#FFC700',
  silver: '#B2B2B2',
  bronze: '#E7974D',
  orange: '#FF780B',
  upPrice: '#287452',
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
  backgroundLight: '#EAF2FF',
  backgroundDisabled: '#E9EAEB',
  backgroundPrimary: '#4168ED',
  backgroundThemeCard: '#131314',
  backgroundCard: '#FAFCFF',
  backgroundAlt: '#FFFFFF',
  backgroundTextArea: '#EAF2FF',
  backgroundMenu: '#EAF2FF',
  greyBackground: '#4A4A4A',
  cardBorder: '#E7E3EB',
  invertedContrast: '#FFFFFF',
  input: '#F9F7F8',
  inpuShadows: 'inset 0px 1px 3px 0px rgba(16, 64, 54, 0.21)',
  inputSecondary: '#7393FF',
  inputSelect: '#DBDBDB',
  tertiary: '#4D535F',
  text: '#283433',
  white_black: '#000',
  textPrimary: '#7393FF',
  textSubtle: '#000000',
  textTips: '#4E4E4E',
  textDisabled: '#BDC2C4',
  textOrigin: '#EC612B',
  textgrey: '#7A83A0',
  borderThemeColor: '#EAF2FF',
  borderColor: '#EFF4F5',
  disableStep: '#4D535F',
  ThemeText: '#4168ED',
  CircleBg: '#e8f0fd',
  gradients: {
    footer: 'linear-gradient(90deg, #5B3CE0, #5A7EFA)',
    signinBackground: 'radial-gradient(circle, #262f38, #050a0e)',
    bubblegum: 'linear-gradient(139.73deg, #E5FDFF 0%, #F3EFFF 100%)',
    cardHeader: 'linear-gradient(111.68deg, #F2ECF2 0%, #E8F2F6 100%)',
    blue: 'linear-gradient(180deg, #A7E8F1 0%, #94E1F2 100%)',
    violet: 'linear-gradient(180deg, #E2C9FB 0%, #CDB8FA 100%)',
    gold: 'linear-gradient(180deg, #FFD800 0%, #FDAB32 100%)',
    progress: 'linear-gradient(90deg, #5B3CE0, #5A7EFA)',
    buttonBg: 'linear-gradient(90deg, #353535, #080808)'
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
  hoverList: '#070707'
};

export const darkColors: Colors = {
  ...baseColors,
  ...additionalColors,
  ...nftTokenColors,
  white: 'white',
  secondary: '#9A6AFF',
  background: '#000',
  backgroundLight: '#2B303F',
  backgroundDisabled: '#343434',
  backgroundPrimary: '#4168ED',
  backgroundThemeCard: '#131314',
  backgroundCard: '#131314',
  backgroundAlt: '#FFFFFF',
  backgroundTextArea: '#343434',
  backgroundMenu: '#232A3D',
  greyBackground: '#4A4A4A',
  cardBorder: '#383241',
  invertedContrast: '#191326',
  input: '#343434',
  inpuShadows: 'inset 0px 3px 2px 0px rgba(0, 0, 0, 0.35)',
  inputSelect: '#343434',
  inputSecondary: '#262130',
  primaryDark: '#000',
  tertiary: '#4D535F',
  text: '#FFF',
  white_black: '#FFFFFF',
  textPrimary: '#7393FF',
  textSubtle: '#EAEAEA',
  textTips: '#B5B5B5',
  textDisabled: '#666171',
  textOrigin: '#EC612B',
  textgrey: '#B5B5B5',
  borderThemeColor: '#3A4459',
  borderColor: '#4D535F',
  disableStep: '#000',
  ThemeText: '#4168ED',
  CircleBg: '#3f3f3f',
  gradients: {
    footer: '#000',
    signinBackground: 'radial-gradient(circle, #262f38, #050a0e)',
    bubblegum: 'linear-gradient(139.73deg, #313D5C 0%, #3D2A54 100%)',
    cardHeader: 'linear-gradient(166.77deg, #3B4155 0%, #3A3045 100%)',
    blue: 'linear-gradient(180deg, #00707F 0%, #19778C 100%)',
    violet: 'linear-gradient(180deg, #6C4999 0%, #6D4DB2 100%)',
    gold: 'linear-gradient(180deg, #FFD800 0%, #FDAB32 100%)',
    progress: 'linear-gradient(90deg, #5B3CE0, #5A7EFA)',
    buttonBg: 'linear-gradient(90deg, #353535, #080808)'
  },
  shadow: {
    box: '0px 0px 5px 0px rgba(180, 200, 169, 0.3)'
  },
  editorText: '#FFFFFF',
  editorBoxBg: 'transparent',
  searchTopicBg: '#4A4A4A',
  searchTopicHoverBg: '#191f2d',
  searchTopicTxt: '#fff',
  commentBorder: '#ccc',
  hoverList: '#1f1f1f'
};
