
import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { FileUpload } from './components/FileUpload';
import { ChatInterface } from './components/ChatInterface';
import { CanvasPanel } from './components/CanvasPanel';
import { parseFile } from './services/fileParserService';
import { getAiResponse, getAiCanvasResponse } from './services/geminiService';
// Fix: Import setCurrentLanguage to update localization state.
import { setCurrentLanguage } from './hooks/useLocalization';
import type { Language, Message, FileData } from './types';
import { LoadingSpinner } from './components/icons';

const App: React.FC = () => {
    const [language, setLanguage] = useState<Language>('en');
    const [fileData, setFileData] = useState<FileData | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [canvasContent, setCanvasContent] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        document.documentElement.lang = language;
        document.documentElement.dir = (language === 'ar' || language === 'ur') ? 'rtl' : 'ltr';
        document.body.className = `bg-brand-dark text-slate-200 font-sans`;
        if (language === 'ar') {
            document.body.classList.add('font-arabic');
        } else if (language === 'ur') {
            document.body.classList.add('font-urdu');
        }
        // Fix: Set the current language for the localization hook.
        setCurrentLanguage(language);
    }, [language]);
    
    const handleFileProcess = async (file: File) => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await parseFile(file);
            setFileData(data);
            setMessages([{ 
                sender: 'system', 
                text: `File "${file.name}" processed successfully. You can now ask questions about it.` 
            }]);
            setCanvasContent(`## ${file.name}\n\n*   **Type:** ${data.type}\n*   **Size:** ${(file.size / 1024).toFixed(2)} KB\n\nReady for your questions.`);
        } catch (err) {
            setError('Failed to process file. Please try a different file.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSendMessage = useCallback(async (text: string, isCanvasQuery: boolean = false) => {
        if (!fileData) {
            setError('Please upload a file first.');
            return;
        }

        const userMessage: Message = { sender: 'user', text };
        setMessages(prev => [...prev, userMessage]);
        setIsLoading(true);
        setError(null);

        try {
            if (isCanvasQuery) {
                const responseText = await getAiCanvasResponse(fileData, text, language);
                setCanvasContent(responseText);
                const systemMessage: Message = { sender: 'system', text: "Canvas updated based on your request." };
                setMessages(prev => [...prev, systemMessage]);
            } else {
                const responseText = await getAiResponse(fileData, text, language);
                const aiMessage: Message = { sender: 'ai', text: responseText };
                setMessages(prev => [...prev, aiMessage]);
            }
        } catch (err) {
            const errorMessage = 'An error occurred while communicating with the AI. Please check your API key and try again.';
            setError(errorMessage);
            setMessages(prev => [...prev, { sender: 'system', text: errorMessage }]);
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, [fileData, language]);
    
    return (
        <div className="min-h-screen flex flex-col p-4 bg-brand-dark text-slate-200 selection:bg-brand-accent selection:text-white">
            <Header />
            <div className="absolute top-4 right-4 rtl:left-4 rtl:right-auto">
                <LanguageSwitcher selectedLanguage={language} onSelectLanguage={setLanguage} />
            </div>

            <main className="flex-grow flex flex-col lg:flex-row gap-4 w-full max-w-7xl mx-auto mt-4">
                <div className="flex flex-col gap-4 lg:w-1/2">
                    <FileUpload onFileProcess={handleFileProcess} disabled={isLoading} />
                    <ChatInterface 
                        messages={messages} 
                        onSendMessage={handleSendMessage} 
                        disabled={!fileData || isLoading}
                        currentLang={language}
                    />
                </div>
                <div className="lg:w-1/2 flex flex-col">
                    <CanvasPanel content={canvasContent} />
                </div>
            </main>
            
            {isLoading && (
              <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
                  <LoadingSpinner className="w-16 h-16 text-brand-accent"/>
              </div>
            )}

            {error && (
                <div className="fixed bottom-4 right-4 bg-red-500 text-white p-4 rounded-lg shadow-lg z-50">
                    <p>{error}</p>
                    <button onClick={() => setError(null)} className="absolute top-1 right-2 text-xl">&times;</button>
                </div>
            )}
        </div>
    );
};

export default App;
