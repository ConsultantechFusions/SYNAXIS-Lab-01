
import { LOCALIZATION } from '../constants';
import type { Language } from '../types';

let currentLanguage: Language = 'en';

export const setCurrentLanguage = (lang: Language) => {
    currentLanguage = lang;
};

// The components will import and use this hook. App.tsx will call setCurrentLanguage.
export const useLocalization = () => {
    return {
        t: (key: string) => LOCALIZATION[key]?.[currentLanguage] || key
    };
};
