import { useState, useEffect, useRef, useCallback } from 'react';
import type { Language, VoiceGender } from '../types';
import { speechEvents } from '../services/speechEvents';

const getLangCode = (lang: Language) => {
    switch (lang) {
        case 'en': return 'en-US';
        case 'ar': return 'ar-SA';
        case 'ur': return 'ur-PK';
        case 'es': return 'es-ES';
        case 'fr': return 'fr-FR';
        case 'hi': return 'hi-IN';
        case 'de': return 'de-DE';
        default: return 'en-US';
    }
};

interface SpeechRecognition extends EventTarget {
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    start: () => void;
    stop: () => void;
    onresult: (event: any) => void;
    onerror: (event: any) => void;
    onend: () => void;
}

// Fix: Augment the global Window interface to include SpeechRecognition APIs
declare global {
    interface Window {
        SpeechRecognition: { new(): SpeechRecognition; };
        webkitSpeechRecognition: { new(): SpeechRecognition; };
    }
}

export const useSpeech = ({ lang }: { lang: Language }) => {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const recognitionRef = useRef<SpeechRecognition | null>(null);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

    useEffect(() => {
        const loadVoices = () => {
            const availableVoices = window.speechSynthesis.getVoices();
            if (availableVoices.length > 0) {
                setVoices(availableVoices);
            }
        };
        window.speechSynthesis.onvoiceschanged = loadVoices;
        loadVoices(); // Initial load
        return () => {
            window.speechSynthesis.onvoiceschanged = null; // Cleanup
        };
    }, []);

    useEffect(() => {
        const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!Recognition) {
            console.error("Speech recognition not supported in this browser.");
            return;
        }

        const recognition = new Recognition();
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = getLangCode(lang);

        recognition.onresult = (event) => {
            let finalTranscript = '';
            let interimTranscript = '';
            for (let i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    finalTranscript += event.results[i][0].transcript;
                } else {
                    interimTranscript += event.results[i][0].transcript;
                }
            }
            setTranscript(finalTranscript || interimTranscript);
        };
        
        recognition.onerror = (event) => {
            console.error('Speech recognition error', event.error);
            setIsListening(false);
        };

        recognition.onend = () => {
            setIsListening(false);
        };

        recognitionRef.current = recognition;

    }, [lang]);

    const startListening = () => {
        if (recognitionRef.current && !isListening) {
            setTranscript('');
            recognitionRef.current.start();
            setIsListening(true);
        }
    };

    const stopListening = () => {
        if (recognitionRef.current && isListening) {
            recognitionRef.current.stop();
            setIsListening(false);
        }
    };
    
    const cancelSpeaking = useCallback(() => {
        if ('speechSynthesis' in window && window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
            // onend will fire, which handles state changes and event emissions
        }
    }, []);
    
    const speak = useCallback((text: string, gender: VoiceGender) => {
        if ('speechSynthesis' in window) {
            cancelSpeaking(); // Stop any current speech before starting a new one
            
            const utterance = new SpeechSynthesisUtterance(text);
            const langCode = getLangCode(lang);
            utterance.lang = langCode;

            const languageVoices = voices.filter(v => v.lang.startsWith(langCode.split('-')[0]));
            let selectedVoice: SpeechSynthesisVoice | undefined;

            const maleKeywords = ['male', 'man', 'homme', 'männlich', 'رجل'];
            const femaleKeywords = ['female', 'woman', 'femme', 'weiblich', 'امرأة'];
            const keywords = gender === 'male' ? maleKeywords : femaleKeywords;
            
            selectedVoice = languageVoices.find(v => keywords.some(kw => v.name.toLowerCase().includes(kw)));
            
            if (!selectedVoice) {
                const fallbackKeywords = gender === 'male' ? femaleKeywords : maleKeywords;
                selectedVoice = languageVoices.find(v => !fallbackKeywords.some(kw => v.name.toLowerCase().includes(kw)));
            }
            
            if (!selectedVoice && languageVoices.length > 0) {
                selectedVoice = languageVoices[0];
            }

            if (selectedVoice) {
                utterance.voice = selectedVoice;
            }

            utterance.onstart = () => {
                setIsSpeaking(true);
                speechEvents.emit('speech:start', { text, lang });
            };
            utterance.onend = () => {
                setIsSpeaking(false);
                utteranceRef.current = null;
                speechEvents.emit('speech:end');
            };
            utterance.onerror = (e) => {
                console.error("Speech synthesis error", e);
                setIsSpeaking(false);
                utteranceRef.current = null;
                speechEvents.emit('speech:end');
            };
            
            utteranceRef.current = utterance;
            window.speechSynthesis.speak(utterance);
        } else {
            console.error("Text-to-speech not supported in this browser.");
        }
    }, [lang, voices, cancelSpeaking]);

    return { isListening, transcript, startListening, stopListening, isSpeaking, speak, cancelSpeaking };
};
