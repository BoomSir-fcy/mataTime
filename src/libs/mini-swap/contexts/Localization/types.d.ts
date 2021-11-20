import { ReactText } from 'react';
import { Language } from 'config/localization/languages';
export declare type ContextData = {
    [key: string]: ReactText;
};
export interface ProviderState {
    isFetching: boolean;
    currentLanguage: Language;
}
export interface ContextApi extends ProviderState {
    setLanguage: (language: Language) => void;
    t: (key: string, data?: ContextData) => string;
    getHTML: (key: string, data?: ContextData) => any;
}