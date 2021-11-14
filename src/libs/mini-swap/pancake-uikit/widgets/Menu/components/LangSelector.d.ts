import React from "react";
import { Position } from "../../../components/Dropdown/types";
import { Language } from "../types";
interface Props {
    currentLang: string;
    position?: Position;
    langs: Language[];
    setLang: (lang: Language) => void;
}
declare const _default: React.NamedExoticComponent<Props>;
export default _default;
