
import React, { useState, useRef, useEffect } from 'react';
import saveAs from 'file-saver';
import type { Message, Language } from '../types';
import { useLocalization } from '../hooks/useLocalization';
import { useSpeech } from '../hooks/useSpeech';
import { SendIcon, MicIcon, UserIcon, AiIcon, SystemIcon, SpeakerWaveIcon, SpeakerXMarkIcon, DownloadIcon } from './icons';

interface ChatInterfaceProps {
    messages: Message[];
    onSendMessage: (text: string, isCanvasQuery?: boolean) => void;
    disabled: boolean;
    currentLang: Language;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ messages, onSendMessage, disabled, currentLang }) => {
    const [inputText, setInputText] = useState('');
    const { t } = useLocalization();
    const { isListening, transcript, startListening, stopListening, isSpeaking, speak, cancelSpeaking } = useSpeech({ lang: currentLang });
    const [speakingMessageIndex, setSpeakingMessageIndex] = useState<number | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (transcript) {
            setInputText(transcript);
        }
    }, [transcript]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);
    
    useEffect(() => {
        // When speech naturally ends, reset the speaking index
        if (!isSpeaking && speakingMessageIndex !== null) {
            setSpeakingMessageIndex(null);
        }
    }, [isSpeaking, speakingMessageIndex]);

    const handleSend = (isCanvasQuery: boolean = false) => {
        if (inputText.trim()) {
            cancelSpeaking();
            onSendMessage(inputText, isCanvasQuery);
            setInputText('');
        }
    };
    
    const toggleListen = () => {
        if (isListening) {
            stopListening();
        } else {
            setInputText('');
            cancelSpeaking();
            startListening();
        }
    };

    const handleToggleSpeech = (text: string, index: number) => {
        if (isSpeaking && speakingMessageIndex === index) {
            cancelSpeaking();
            setSpeakingMessageIndex(null);
        } else {
            setSpeakingMessageIndex(index);
            // Fix: Expected 2 arguments, but got 1. Providing a default gender.
            speak(text, 'female');
        }
    };

    const handleExportChat = () => {
        if (messages.length === 0) return;
        const chatData = JSON.stringify(messages, null, 2);
        const blob = new Blob([chatData], { type: 'application/json' });
        saveAs(blob, 'chat_history.json');
    };

    const getMessageIcon = (sender: Message['sender']) => {
        switch (sender) {
            case 'user': return <UserIcon className="w-6 h-6 text-slate-300" />;
            case 'ai': return <AiIcon className="w-6 h-6 text-brand-accent" />;
            case 'system': return <SystemIcon className="w-6 h-6 text-slate-500" />;
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // If user starts typing, stop listening to allow manual input.
        if (isListening) {
            stopListening();
        }
        setInputText(e.target.value);
    };

    return (
        <div className="bg-brand-medium rounded-lg flex flex-col flex-grow h-[50vh] lg:h-auto">
            <div className="p-4 border-b border-brand-light flex justify-between items-center">
                <h2 className="text-lg font-semibold">{t('ask_about_file')}</h2>
                <button 
                    onClick={handleExportChat}
                    disabled={messages.length === 0}
                    className="p-2 hover:bg-brand-light rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    title={t('export_chat')}
                >
                    <DownloadIcon className="w-5 h-5" />
                </button>
            </div>
            <div className="flex-grow p-4 overflow-y-auto space-y-6">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                        {msg.sender !== 'user' && <div className="flex-shrink-0">{getMessageIcon(msg.sender)}</div>}
                         <div className="relative group">
                             <div className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-lg ${
                                msg.sender === 'user' ? 'bg-brand-accent text-white rounded-br-none' : 'bg-brand-light text-slate-200 rounded-bl-none'
                            }`}>
                                <p className="text-sm break-words">{msg.text}</p>
                            </div>
                            {(msg.sender === 'ai' || msg.sender === 'system') && msg.text && (
                                <button
                                    onClick={() => handleToggleSpeech(msg.text, index)}
                                    className="absolute top-1/2 -translate-y-1/2 -right-8 rtl:-left-8 rtl:right-auto p-1.5 bg-brand-dark rounded-full text-slate-400 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity hover:text-white disabled:opacity-50"
                                    aria-label="Read message aloud"
                                    title="Read message aloud"
                                >
                                    {isSpeaking && speakingMessageIndex === index ? (
                                        <SpeakerXMarkIcon className="w-4 h-4 text-brand-accent animate-pulse" />
                                    ) : (
                                        <SpeakerWaveIcon className="w-4 h-4" />
                                    )}
                                </button>
                            )}
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
                        value={inputText}
                        onChange={handleInputChange}
                        onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                        placeholder={isListening ? t('listening') : t('type_message')}
                        disabled={disabled}
                        className="flex-grow bg-transparent focus:outline-none px-3 py-2 text-slate-200"
                    />
                    <button onClick={toggleListen} disabled={disabled} className={`p-2 rounded-full transition-colors ${isListening ? 'bg-red-500 animate-pulse' : 'hover:bg-brand-light'}`}>
                        <MicIcon className="w-5 h-5" />
                    </button>
                    <button onClick={() => handleSend(false)} disabled={disabled || !inputText} className="px-3 py-2 text-sm font-semibold rounded-md bg-brand-light hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                        {t('send_to_chat')}
                    </button>
                    <button onClick={() => handleSend(true)} disabled={disabled || !inputText} className="px-3 py-2 text-sm font-semibold rounded-md bg-brand-accent hover:bg-brand-accent-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-white">
                        {t('generate_on_canvas')}
                    </button>
                </div>
            </div>
        </div>
    );
};
