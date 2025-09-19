
import React, { useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useLocalization } from '../hooks/useLocalization';
import { exportToPdf, exportToDocx, exportToXlsx, exportToPng } from '../services/exportService';
import { PdfIcon, DocxIcon, XlsxIcon, PngIcon } from './icons';

interface CanvasPanelProps {
    content: string;
}

export const CanvasPanel: React.FC<CanvasPanelProps> = ({ content }) => {
    const { t } = useLocalization();
    const canvasRef = useRef<HTMLDivElement>(null);
    const exportButtonsRef = useRef<HTMLDivElement>(null);

    const handleExport = (format: 'pdf' | 'docx' | 'xlsx' | 'png') => {
        if (!canvasRef.current || !exportButtonsRef.current) return;

        // Temporarily hide the export buttons for capture
        exportButtonsRef.current.style.display = 'none';

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

        // Show buttons again
        exportButtonsRef.current.style.display = 'flex';
    };

    return (
        <div className="bg-brand-medium rounded-lg flex flex-col flex-grow h-[70vh] lg:h-auto">
            <div className="p-4 border-b border-brand-light flex justify-between items-center">
                <h2 className="text-lg font-semibold">{t('canvas_panel')}</h2>
                <div ref={exportButtonsRef} className="flex items-center gap-2">
                    <button onClick={() => handleExport('pdf')} className="p-2 hover:bg-brand-light rounded-full transition-colors" title={t('export_pdf')}><PdfIcon className="w-5 h-5"/></button>
                    <button onClick={() => handleExport('docx')} className="p-2 hover:bg-brand-light rounded-full transition-colors" title={t('export_docx')}><DocxIcon className="w-5 h-5"/></button>
                    <button onClick={() => handleExport('xlsx')} className="p-2 hover:bg-brand-light rounded-full transition-colors" title={t('export_xlsx')}><XlsxIcon className="w-5 h-5"/></button>
                    <button onClick={() => handleExport('png')} className="p-2 hover:bg-brand-light rounded-full transition-colors" title={t('export_png')}><PngIcon className="w-5 h-5"/></button>
                </div>
            </div>
            <div ref={canvasRef} className="flex-grow p-4 overflow-y-auto bg-slate-900/50 rounded-b-lg">
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    className="prose prose-invert max-w-none prose-table:w-full prose-table:table-auto prose-td:px-2 prose-td:py-1 prose-th:px-2 prose-th:py-1 prose-th:bg-brand-light"
                >
                    {content}
                </ReactMarkdown>
            </div>
        </div>
    );
};
