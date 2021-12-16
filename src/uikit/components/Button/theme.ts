import { scales, variants } from './types';
// import aFront from '../../image/button/a-front.png';
// import eFront from '../../image/button/e-front.png';
// import btn from '../../image/button/btn.png';
// import btn1 from '../../image/button/btn-1.png';
// import btn2 from '../../image/button/btn-2.png';
// import e1 from '../../image/button/e1.png';
// import e2 from '../../image/button/e2.png';
// import e3 from '../../image/button/e3.png';
// import btnLeft from '../../image/button/btn-left.png';
// import btnRight from '../../image/button/btn-right.png';

export const scaleVariants = {
  [scales.LD]: {
    fontSize: '18px',
    height: '44px',
    minWidth: '108px',
    padding: '0 30px'
  },
  [scales.MD]: {
    height: '35px',
    padding: '0 20px'
  },
  [scales.SM]: {
    height: '32px',
    padding: '0 16px'
  },
  [scales.XS]: {
    height: '20px',
    fontSize: '12px',
    padding: '0 8px'
  }
};

export const styleVariants = {
  [variants.PRIMARY]: {
    background: 'linear-gradient(90deg, #353535, #080808)',
    color: 'primary',
    border: '1px solid',
    borderColor: 'primary',
    // backgroundRepeat: "no-repeat",
    // backgroundImage: `url(${btn1}), url(${btn}), url(${btn2})`,
    // backgroundPosition: "0 0px, 10px 0px, 100% -1px",
    // backgroundSize: "20px 36px, calc(100% - 20px) 36px, 20px 38px",
  },
  [variants.SECONDARY]: {
    backgroundColor: 'transparent',
    boxShadow: 'none',
    border: '1px solid',
    borderColor: 'white',
    color: 'white',
    ':disabled': {
      backgroundColor: 'primary'
    }
  },
  [variants.TERTIARY]: {
    backgroundColor: 'backgroundDisabled',
    boxShadow: 'none',
    color: 'primary'
  },
  [variants.SUBTLE]: {
    backgroundColor: 'textSubtle',
    color: 'backgroundAlt'
  },
  [variants.DANGER]: {
    // backgroundColor: "failure",
    // color: "white",
    color: 'white',
    backgroundRepeat: 'no-repeat',
    // backgroundImage: `url(${e1}), url(${e2}), url(${e3})`,
    backgroundPosition: '0 0px, 10px 0px, 100% -1px',
    backgroundSize: '20px 36px, calc(100% - 20px) 36px, 20px 38px'
  },
  [variants.SUCCESS]: {
    backgroundColor: 'success',
    color: 'white',
    border: '1px solid',
    borderColor: 'primary',
  },
  [variants.ORANGE]: {
    backgroundColor: 'orange',
    color: 'white',
    boxShadow: 'none'
  },
  [variants.PRIMARY_GREEN]: {
    backgroundColor: 'primaryGreen',
    color: 'white',
    border: '1px solid',
    borderColor: 'primary',
  },
  [variants.TEXT]: {
    backgroundColor: 'transparent',
    color: 'primary',
    boxShadow: 'none',
    ':disabled': {
      color: 'white'
    }
  },
  [variants.CIRCULAR]: {
    // backgroundImage: `url(${eFront})`,
    color: 'white',
    width: '36px',
    height: '36px',
    padding: '0'
  }
};
