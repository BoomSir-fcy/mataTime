import { MediaQueries, Breakpoints, Spacing, MediaQueriesSize } from './types';

export const breakpointMap: { [key: string]: number } = {
  xxs: 369,
  xs: 370,
  sm: 576,
  md: 768,
  lg: 968,
  xl: 1280,
  xxl: 1600,
};

const breakpoints: Breakpoints = Object.values(breakpointMap).map(
  breakpoint => `${breakpoint}px`,
);

export const mediaQueries: MediaQueries = {
  xxs: `@media screen and (max-width: ${breakpointMap.xs}px)`,
  xs: `@media screen and (min-width: ${breakpointMap.xs}px)`,
  sm: `@media screen and (min-width: ${breakpointMap.sm}px)`,
  md: `@media screen and (min-width: ${breakpointMap.md}px)`,
  lg: `@media screen and (min-width: ${breakpointMap.lg}px)`,
  xl: `@media screen and (min-width: ${breakpointMap.xl}px)`,
  xxl: `@media screen and (min-width: ${breakpointMap.xxl}px)`,
  nav: `@media screen and (min-width: ${breakpointMap.lg}px)`,
};

const mediaMarginUpAndDown = `
  ${mediaQueries.lg} {
    margin: 24px 0 12px;
  }
  ${mediaQueries.xl} {
    margin: 24px 0 12px;
  }
`;

const mediaMarginLeftAndRightMd = `
  ${mediaQueries.lg} {
    margin: 0 10px;
  }
  ${mediaQueries.xl} {
    margin: 0 15px;
  }
`;

const mediaQueriesMargin = `
  ${mediaQueries.xxs} {
    margin: 8px 4px;
  }
  ${mediaQueries.xs} {
    margin: 16px 8px;
  }

  ${mediaQueries.sm} {
    margin: 16px 16px;
  }

  ${mediaQueries.lg} {
    margin: 16px 24px;
  }
  ${mediaQueries.xl} {
    margin: 24px 32px;
  }
`;

const mediaMarginBottom = `
  ${mediaQueries.xxs} {
    margin-bottom: 8px;
  }
  ${mediaQueries.xs} {
    margin-bottom: 8px;
  }

  ${mediaQueries.sm} {
    margin-bottom: 12px;
  }

  ${mediaQueries.lg} {
    margin-bottom: 18px;
  }
  ${mediaQueries.xl} {
    margin-bottom: 32px;
  }
`;
const mediaMarginBottomMd = `
  ${mediaQueries.lg} {
    margin-bottom: 10px;
  }
  ${mediaQueries.xl} {
    margin-bottom: 20px;
  }
`;

const mediaMarginBottomSm = `
  ${mediaQueries.lg} {
    margin-bottom: 10px;
  }
  ${mediaQueries.xl} {
    margin-bottom: 12px;
  }
`;

const mediaMarginTop = `
  ${mediaQueries.xxs} {
    margin-top: 4px;
  }
  ${mediaQueries.xs} {
    margin-top: 8px;
  }

  ${mediaQueries.sm} {
    margin-top: 16px;
  }

  ${mediaQueries.lg} {
    margin-top: 30px;
  }
  ${mediaQueries.xl} {
    margin-top: 30px;
  }
`;

const mediaMarginLeft = `
  ${mediaQueries.lg} {
    margin-left: 10px;
  }
  ${mediaQueries.xl} {
    margin-left: 15px;
  }
`;

const mediaMarginLeftMd = `
  ${mediaQueries.lg} {
    margin-left: 4px;
  }
  ${mediaQueries.xl} {
    margin-left: 8px;
  }
`;

const mediaQueriesMarginRight = `
  ${mediaQueries.xxs} {
    margin-right: 4px;
  }
  ${mediaQueries.xs} {
    margin-right: 8px;
  }

  ${mediaQueries.sm} {
    margin-right: 16px;
  }

  ${mediaQueries.lg} {
    margin-right: 24px;
  }
  ${mediaQueries.xl} {
    margin-right: 32px;
  }

`;

const mediaMarginRightMd = `
  ${mediaQueries.lg} {
    margin-right: 10px;
  }
  ${mediaQueries.xl} {
    margin-right: 14px;
  }
`;

// xxs: 369,
// xs: 370,
// sm: 576,
// md: 768,
// lg: 968,
// xl: 1280,
// xxl: 1600
const mediaQueriesPadding = `
  ${mediaQueries.xxs} {
    padding: 8px 4px;
  }
  ${mediaQueries.xs} {
    padding: 8px 15px;
  }

  ${mediaQueries.sm} {
    padding: 8px 15px;
  }

  ${mediaQueries.lg} {
    padding: 16px 14px;
  }

  ${mediaQueries.xl} {
    padding: 20px 25px;
  }
`;

const mediaQueriesAbsMargin = `
  ${mediaQueries.xxs} {
    margin: 0 -4px;
  }
  ${mediaQueries.xs} {
    margin: 0 -15px;
  }

  ${mediaQueries.sm} {
    margin: 0 -15px;
  }

  ${mediaQueries.lg} {
    margin: 0 -14px;
  }

  ${mediaQueries.xl} {
    margin: 0 -25px;
  }
`;

const mediaPaddingSM = `
  ${mediaQueries.sm} {
    padding: 15px 12px;
  }
  ${mediaQueries.lg} {
    padding: 15px 12px;
  }
`;

const mediaPaddingXs = `
  ${mediaQueries.xxs} {
    padding: 0 8px;
  }
  ${mediaQueries.xs} {
    padding: 0 10px;
  }
  ${mediaQueries.sm} {
    padding: 0 14px;
  }
  ${mediaQueries.lg} {
    padding: 0 14px;
  }
`;

export const mediaQueriesSize: MediaQueriesSize = {
  margin: mediaQueriesMargin,
  marginr: mediaQueriesMarginRight,
  marginrmd: mediaMarginRightMd,
  marginb: mediaMarginBottom,
  marginbmd: mediaMarginBottomMd,
  marginbsm: mediaMarginBottomSm,
  margint: mediaMarginTop,
  marginl: mediaMarginLeft,
  marginlmd: mediaMarginLeftMd,
  marginUD: mediaMarginUpAndDown,
  marginLRmd: mediaMarginLeftAndRightMd,
  padding: mediaQueriesPadding,
  paddingsm: mediaPaddingSM,
  paddingxs: mediaPaddingXs,
  absmargin: mediaQueriesAbsMargin,
};

export const shadows = {
  level1:
    '0px 2px 12px -8px rgba(25, 19, 38, 0.1), 0px 1px 1px rgba(25, 19, 38, 0.05)',
  active: '0px 0px 0px 1px #0098A1, 0px 0px 4px 8px rgba(31, 199, 212, 0.4)',
  success: '0px 0px 0px 1px #4168ED, 0px 0px 0px 4px rgba(52, 86, 199, 0.2)',
  warning: '0px 0px 0px 1px #ED4B9E, 0px 0px 0px 4px rgba(237, 75, 158, 0.2)',
  focus: '0px 0px 0px 1px #00000000, 0px 0px 0px 2px rgba(65, 104, 237,0.6)',
  input: 'inset 0px 1px 3px 0px rgba(65, 104, 237, 0.21);',
  inset: 'inset 0px 1px 3px 0px rgba(65, 104, 237, 0.21)',
  box: '0px 0px 5px 0px rgba(34, 30, 28, 0.14)',
  nav: '0px 0px 10px 0px rgba(51, 51, 51, 0.4)',
};

const spacing: Spacing = [0, 4, 8, 16, 24, 32, 48, 64];

const radii = {
  small: '4px',
  default: '16px',
  nftImage: '10px',
  card: '10px',
  circle: '50%',
};

const zIndices = {
  dropdown: 10,
  modal: 100,
};

/* eslint-disable */
export default {
  siteWidth: 1200,
  breakpoints,
  mediaQueries,
  spacing,
  shadows,
  radii,
  zIndices,
  mediaQueriesSize,
  // breakpointMap,
};
