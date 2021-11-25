import { scales, variants } from "./types";
import aFront from '../../image/button/a-front.png';
import eFront from '../../image/button/e-front.png';
import btn from '../../image/button/btn.png';
import btn1 from '../../image/button/btn-1.png';
import btn2 from '../../image/button/btn-2.png';
import e1 from '../../image/button/e1.png';
import e2 from '../../image/button/e2.png';
import e3 from '../../image/button/e3.png';
import btnLeft from '../../image/button/btn-left.png';
import btnRight from '../../image/button/btn-right.png';

export const scaleVariants = {
  [scales.LD]: {
    height: "40px",
    minWidth: "108px",
    padding: "0 24px",
  },
  [scales.MD]: {
    height: "36px",
    padding: "0 24px",
  },
  [scales.SM]: {
    height: "32px",
    padding: "0 16px",
  },
  [scales.XS]: {
    height: "20px",
    fontSize: "12px",
    padding: "0 8px",
  },
};

export const styleVariants = {
  [variants.PRIMARY]: {
    backgroundColor: "primary",
    color: "white",
    // boxShadow: "0px -3px 0px 0px rgba(14, 14, 44, 0.4) inset,  0px -2px 0px 0px rgba(250, 250, 253, 0.4), 1px 0px 0px 0px rgba(14, 14, 44, 0.4)",
    
  },
  [variants.SECONDARY]: {
    backgroundColor: "transparent",
    border: "2px solid",
    borderColor: "primary",
    boxShadow: "none",
    color: "primary",
    ":disabled": {
      backgroundColor: "transparent",
      color: "primary",
    },
  },
  [variants.TERTIARY]: {
    backgroundColor: "tertiary",
    boxShadow: "none",
    color: "primary",
  },
  [variants.SUBTLE]: {
    backgroundColor: "textSubtle",
    color: "backgroundAlt",
  },
  [variants.DANGER]: {
    backgroundColor: "failure",
    color: "white",
  },
  [variants.LEFT]: {
    color: "white",
    backgroundColor: "primary",
    // backgroundRepeat: "no-repeat",
    // backgroundImage: `url(${btnLeft})`,
    // backgroundPosition: "0",
    // backgroundSize: "57px 60px",
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    boxShadow: "0px -3px 0px 0px rgba(14, 14, 44, 0.4) inset,  0px -2px 0px 0px rgba(250, 250, 253, 0.4), 1px 0px 0px 0px rgba(14, 14, 44, 0.4)",

  },
  [variants.RIGHT]: {
    color: "white",
    backgroundColor: "primary",
    // backgroundRepeat: "no-repeat",
    // backgroundImage: `url(${btnRight})`,
    // backgroundPosition: "right",
    // backgroundSize: "57px 60px",
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    boxShadow: "0px -3px 0px 0px rgba(14, 14, 44, 0.4) inset,  0px -2px 0px 0px rgba(250, 250, 253, 0.4), -1px 0px 0px 0px rgba(14, 14, 44, 0.4)",
  },
  [variants.SUCCESS]: {
    backgroundColor: "success",
    color: "white",
  },
  [variants.ORANGE]: {
    backgroundColor: "orange",
    color: "white",
    boxShadow: "none",
  },
  [variants.TEXT]: {
    backgroundColor: "transparent",
    color: "primary",
    boxShadow: "none",
  },
  [variants.TEXTLINE]: {
    backgroundColor: "transparent",
    color: "primary",
    boxShadow: "none",
    padding: 0,
    margin: 0,
  },
  [variants.CIRCULAR]: {
    backgroundColor: "primary",
    color: "white",
    width: "36px",
    height: "36px",
    padding: "0",
  },
};
