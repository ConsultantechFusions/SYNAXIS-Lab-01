
import React from 'react';
import type { Language } from '../types';

interface LanguageSwitcherProps {
    selectedLanguage: Language;
    onSelectLanguage: (language: Language) => void;
}

const languages: { code: Language; name: string }[] = [
    { code: 'en', name: 'EN' },
    { code: 'ar', name: 'AR' },
    { code: 'ur', name: 'UR' },
];

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ selectedLanguage, onSelectLanguage }) => {
    return (
        <div className="flex space-x-1 rtl:space-x-reverse bg-brand-medium p-1 rounded-full">
            {languages.map(({ code, name }) => (
                <button
                    key={code}
                    onClick={() => onSelectLanguage(code)}
                    className={`px-3 py-1 text-sm font-semibold rounded-full transition-colors duration-200 ${
                        selectedLanguage === code
                            ? 'bg-brand-accent text-white'
                            : 'text-slate-300 hover:bg-brand-light'
                    }`}
                >
                    {name}
                </button>
            ))}
        </div>
    );
};
