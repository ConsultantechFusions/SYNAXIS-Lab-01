
import React, { useState, useRef, useEffect } from 'react';
import type { Message, Language } from '../types';
import { useLocalization } from '../hooks/useLocalization';
import { useSpeech } from '../hooks/useSpeech';
import { SendIcon, MicIcon, UserIcon, AiIcon, SystemIcon } from './icons';

interface ChatInterfaceProps {
    messages: Message[];
    onSendMessage: (text: string, isCanvasQuery?: boolean) => void;
    disabled: boolean;
    currentLang: Language;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ messages, onSendMessage, disabled, currentLang }) => {
    const [inputText, setInputText] = useState('');
    const { t } = useLocalization();
    const { isListening, transcript, startListening, stopListening } = useSpeech({ lang: currentLang });
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (transcript) {
            setInputText(transcript);
        }
    }, [transcript]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = (isCanvasQuery: boolean = false) => {
        if (inputText.trim()) {
            onSendMessage(inputText, isCanvasQuery);
            setInputText('');
        }
    };
    
    const toggleListen = () => {
        if (isListening) {
            stopListening();
        } else {
            setInputText('');
            startListening();
        }
    };

    const getMessageIcon = (sender: Message['sender']) => {
        switch (sender) {
            case 'user': return <UserIcon className="w-6 h-6 text-slate-300" />;
            case 'ai': return <AiIcon className="w-6 h-6 text-brand-accent" />;
            case 'system': return <SystemIcon className="w-6 h-6 text-slate-500" />;
        }
    };

    return (
        <div className="bg-brand-medium rounded-lg flex flex-col flex-grow h-[50vh] lg:h-auto">
            <div className="flex-grow p-4 overflow-y-auto space-y-4">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                        {msg.sender !== 'user' && <div className="flex-shrink-0">{getMessageIcon(msg.sender)}</div>}
                        <div className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-lg ${
                            msg.sender === 'user' ? 'bg-brand-accent text-white rounded-br-none' : 'bg-brand-light text-slate-200 rounded-bl-none'
                        }`}>
                            <p className="text-sm break-words">{msg.text}</p>
                        </div>
                        {msg.sender === 'user' && <div className="flex-shrink-0">{getMessageIcon(msg.sender)}</div>}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <div className="p-4 border-t border-brand-light">
                <div className="flex items-center gap-2 bg-brand-dark rounded-lg p-1">
                    <input
                        type="text"
                        value={isListening ? t('listening') : inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        placeholder={t('type_message')}
                        disabled={disabled || isListening}
                        className="flex-grow bg-transparent focus:outline-none px-3 py-2 text-slate-200"
                    />
                    <button onClick={toggleListen} disabled={disabled} className={`p-2 rounded-full transition-colors ${isListening ? 'bg-red-500 animate-pulse' : 'hover:bg-brand-light'}`}>
                        <MicIcon className="w-5 h-5" />
                    </button>
                    <button onClick={() => handleSend(false)} disabled={disabled || !inputText} className="px-3 py-2 text-sm font-semibold rounded-md bg-brand-light hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                        {t('ask_about_file')}
                    </button>
                    <button onClick={() => handleSend(true)} disabled={disabled || !inputText} className="px-3 py-2 text-sm font-semibold rounded-md bg-brand-accent hover:bg-brand-accent-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-white">
                        {t('generate_on_canvas')}
                    </button>
                </div>
            </div>
        </div>
    );
};
