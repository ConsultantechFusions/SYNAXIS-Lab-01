import React, { useRef, useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useLocalization } from '../hooks/useLocalization';
import { useSpeech } from '../hooks/useSpeech';
import type { Language, VoiceGender } from '../types';
import { exportToPdf, exportToDocx, exportToXlsx, exportToPng } from '../services/exportService';
import { PdfIcon, DocxIcon, XlsxIcon, PngIcon, SpeakerWaveIcon, SpeakerXMarkIcon, FemaleVoiceIcon, MaleVoiceIcon } from './icons';

interface CanvasPanelProps {
    content: string;
    currentLang: Language;
}

export const CanvasPanel: React.FC<CanvasPanelProps> = ({ content, currentLang }) => {
    const { t } = useLocalization();
    const canvasRef = useRef<HTMLDivElement>(null);
    const controlsRef = useRef<HTMLDivElement>(null);
    const selectionTimeoutRef = useRef<number | null>(null);

    const { isSpeaking, speak, cancelSpeaking } = useSpeech({ lang: currentLang });
    const [selectedGender, setSelectedGender] = useState<VoiceGender>('female');

    useEffect(() => {
        const handleSelectionChange = () => {
            if (selectionTimeoutRef.current) {
                window.clearTimeout(selectionTimeoutRef.current);
            }

            selectionTimeoutRef.current = window.setTimeout(() => {
                const selection = window.getSelection();
                if (!selection) return;

                const selectedText = selection.toString().trim();
                
                if (selectedText.length > 2 && canvasRef.current && canvasRef.current.contains(selection.anchorNode)) {
                    speak(selectedText, selectedGender);
                }
            }, 500); // 500ms debounce to wait for selection to finish
        };

        document.addEventListener('selectionchange', handleSelectionChange);

        return () => {
            document.removeEventListener('selectionchange', handleSelectionChange);
            if (selectionTimeoutRef.current) {
                window.clearTimeout(selectionTimeoutRef.current);
            }
        };
    }, [speak, selectedGender]);


    const handleSpeakCanvas = () => {
        if (isSpeaking) {
            cancelSpeaking();
        } else {
            const textToSpeak = canvasRef.current?.textContent || content;
            if (textToSpeak.trim()) {
                speak(textToSpeak, selectedGender);
            }
        }
    };
    
    const handleExport = (format: 'pdf' | 'docx' | 'xlsx' | 'png') => {
        if (!canvasRef.current || !controlsRef.current) return;

        // Temporarily hide the controls for capture
        controlsRef.current.style.display = 'none';

        switch (format) {
            case 'pdf':
                exportToPdf(canvasRef.current);
                break;
            case 'docx':
                 // docx export works best with raw content, especially tables
                exportToDocx(content);
                break;
            case 'xlsx':
                // xlsx export requires table html, so we find it in the rendered output
                const tableEl = canvasRef.current.querySelector('table');
                if (tableEl) {
                    exportToXlsx(tableEl);
                } else {
                    alert('No table found on canvas to export as XLSX.');
                }
                break;
            case 'png':
                exportToPng(canvasRef.current);
                break;
        }

        // Show controls again
        controlsRef.current.style.display = 'flex';
    };

    return (
        <div className="bg-brand-medium rounded-lg flex flex-col flex-grow h-[70vh] lg:h-auto">
            <div className="p-4 border-b border-brand-light flex justify-between items-center">
                <h2 className="text-lg font-semibold">{t('canvas_panel')}</h2>
                <div ref={controlsRef} className="flex items-center gap-2">
                    {/* Voice Selection */}
                    <div className="flex items-center gap-1 bg-brand-dark p-1 rounded-full">
                        <button onClick={() => setSelectedGender('female')} className={`p-1.5 rounded-full transition-colors ${selectedGender === 'female' ? 'bg-brand-accent text-white' : 'hover:bg-brand-light'}`} title={t('select_female_voice')}><FemaleVoiceIcon className="w-4 h-4"/></button>
                        <button onClick={() => setSelectedGender('male')} className={`p-1.5 rounded-full transition-colors ${selectedGender === 'male' ? 'bg-brand-accent text-white' : 'hover:bg-brand-light'}`} title={t('select_male_voice')}><MaleVoiceIcon className="w-4 h-4"/></button>
                    </div>
                    
                    {/* Speak Button */}
                    <button onClick={handleSpeakCanvas} className="p-2 hover:bg-brand-light rounded-full transition-colors" title={isSpeaking ? t('stop_speaking') : t('speak_canvas')}>
                        {isSpeaking ? <SpeakerXMarkIcon className="w-5 h-5 text-brand-accent animate-pulse"/> : <SpeakerWaveIcon className="w-5 h-5"/>}
                    </button>
                    
                    <div className="w-px h-6 bg-brand-light mx-1"></div>

                    {/* Export Buttons */}
                    <button onClick={() => handleExport('pdf')} className="p-2 hover:bg-brand-light rounded-full transition-colors" title={t('export_pdf')}><PdfIcon className="w-5 h-5"/></button>
                    <button onClick={() => handleExport('docx')} className="p-2 hover:bg-brand-light rounded-full transition-colors" title={t('export_docx')}><DocxIcon className="w-5 h-5"/></button>
                    <button onClick={() => handleExport('xlsx')} className="p-2 hover:bg-brand-light rounded-full transition-colors" title={t('export_xlsx')}><XlsxIcon className="w-5 h-5"/></button>
                    <button onClick={() => handleExport('png')} className="p-2 hover:bg-brand-light rounded-full transition-colors" title={t('export_png')}><PngIcon className="w-5 h-5"/></button>
                </div>
            </div>
            {/* Fix: The 'className' prop is not valid on ReactMarkdown. Moved styling to the parent div. */}
            <div ref={canvasRef} className="flex-grow p-4 overflow-y-auto bg-slate-900/50 rounded-b-lg prose prose-invert max-w-none prose-table:w-full prose-table:table-auto prose-td:px-2 prose-td:py-1 prose-th:px-2 prose-th:py-1 prose-th:bg-brand-light">
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                >
                    {content}
                </ReactMarkdown>
            </div>
        </div>
    );
};