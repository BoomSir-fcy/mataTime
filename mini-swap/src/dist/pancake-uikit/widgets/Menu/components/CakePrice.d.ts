import React from "react";
import { Scale } from "../types";
interface Props {
    cakePriceUsd?: number;
    cakeToken?: string;
    fontColor?: string;
    tokenLable?: string;
    isLoading?: boolean;
    dollar?: boolean;
    formatLocal?: number;
    suffix?: string;
    logo?: string;
    scale?: Scale;
    isBalance?: boolean;
}
declare const _default: React.NamedExoticComponent<Props>;
export default _default;
