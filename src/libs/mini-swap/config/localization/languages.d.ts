export interface Language {
    code: string;
    language: string;
    locale: string;
}
export declare const AR: Language;
export declare const BN: Language;
export declare const EN: Language;
export declare const DE: Language;
export declare const EL: Language;
export declare const ESES: Language;
export declare const FI: Language;
export declare const FIL: Language;
export declare const FR: Language;
export declare const HI: Language;
export declare const HU: Language;
export declare const ID: Language;
export declare const IT: Language;
export declare const JA: Language;
export declare const KO: Language;
export declare const NL: Language;
export declare const PL: Language;
export declare const PTBR: Language;
export declare const PTPT: Language;
export declare const RO: Language;
export declare const RU: Language;
export declare const SVSE: Language;
export declare const TA: Language;
export declare const TR: Language;
export declare const UK: Language;
export declare const VI: Language;
export declare const ZHCN: Language;
export declare const ZHTW: Language;
export declare const languages: {
    'en-US': Language;
    'zh-CN': Language;
};
export declare const languageList: Language[];
export declare type SupportLanguage = keyof typeof languages;
