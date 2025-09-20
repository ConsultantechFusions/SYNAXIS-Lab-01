import React, { useState, useEffect } from 'react';
import { speechEvents } from '../services/speechEvents';
import { translateText } from '../services/geminiService';
import { useLocalization } from '../hooks/useLocalization';
import { TRANSLATION_LANGUAGES } from '../constants';
import type { Language } from '../types';
import { LoadingSpinner, TranslateIcon } from './icons';

export const LiveTranscription: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [originalText, setOriginalText] = useState('');
    const [translatedText, setTranslatedText] = useState('');
    const [sourceLang, setSourceLang] = useState<Language>('en');
    const [targetLang, setTargetLang] = useState<string>('none');
    const [isTranslating, setIsTranslating] = useState(false);
    const { t } = useLocalization();

    useEffect(() => {
        const handleSpeechStart = async ({ text, lang }: { text: string, lang: Language }) => {
            setIsVisible(true);
            setOriginalText(text);
            setSourceLang(lang);
            setTranslatedText(''); // Reset previous translation
            
            if (targetLang !== 'none' && targetLang !== lang) {
                setIsTranslating(true);
                try {
                    const translation = await translateText(text, targetLang as Language, lang);
                    setTranslatedText(translation);
                } catch (error) {
                    console.error("Translation failed", error);
                    setTranslatedText("Translation failed.");
                } finally {
                    setIsTranslating(false);
                }
            }
        };

        const handleSpeechEnd = () => {
            setIsVisible(false);
            setOriginalText('');
            setTranslatedText('');
        };

        speechEvents.on('speech:start', handleSpeechStart);
        speechEvents.on('speech:end', handleSpeechEnd);

        return () => {
            speechEvents.off('speech:start', handleSpeechStart);
            speechEvents.off('speech:end', handleSpeechEnd);
        };
    }, [targetLang]);

    const handleLangChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newLang = e.target.value;
        setTargetLang(newLang);
        // If speech is already active, re-translate
        if (isVisible && newLang !== 'none' && newLang !== sourceLang) {
             (async () => {
                setIsTranslating(true);
                try {
                    const translation = await translateText(originalText, newLang as Language, sourceLang);
                    setTranslatedText(translation);
                } catch (error) {
                    console.error("Translation failed", error);
                    setTranslatedText("Translation failed.");
                } finally {
                    setIsTranslating(false);
                }
            })();
        } else {
            setTranslatedText(''); // Clear translation if set to 'none'
        }
    };
    
    const displayLang = targetLang !== 'none' ? targetLang as Language : sourceLang;
    const isRtl = displayLang === 'ar' || displayLang === 'ur';

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-brand-dark/90 backdrop-blur-sm border-t border-brand-light z-40 shadow-2xl animate-fade-in-up">
            <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-center gap-4">
                <div className="flex-grow w-full">
                    <p 
                        className="text-slate-200 text-center sm:text-left"
                        dir={isRtl ? 'rtl' : 'ltr'}
                    >
                        {isTranslating ? (
                            <span className="flex items-center gap-2 justify-center sm:justify-start">
                                <LoadingSpinner className="w-4 h-4" /> {t('translating')}
                            </span>
                        ) : (
                            translatedText || originalText
                        )}
                    </p>
                </div>
                <div className="flex-shrink-0 flex items-center gap-2 bg-brand-medium rounded-full p-1 w-full sm:w-auto">
                    <label htmlFor="translation-lang" className="pl-2">
                        <TranslateIcon className="w-5 h-5 text-slate-400" />
                        <span className="sr-only">{t('translation_language')}</span>
                    </label>
                    <select
                        id="translation-lang"
                        value={targetLang}
                        onChange={handleLangChange}
                        className="bg-transparent text-slate-200 text-sm focus:outline-none cursor-pointer"
                        aria-label={t('translation_language')}
                    >
                        <option value="none" className="bg-brand-dark">{t('original_language')}</option>
                        {TRANSLATION_LANGUAGES.map(lang => (
                            <option key={lang.code} value={lang.code} className="bg-brand-dark">
                                {lang.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
};
