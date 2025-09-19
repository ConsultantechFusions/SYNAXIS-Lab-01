
import React, { useState, useCallback } from 'react';
import { useLocalization } from '../hooks/useLocalization';
import { UploadIcon, FileIcon } from './icons';

interface FileUploadProps {
    onFileProcess: (file: File) => void;
    disabled: boolean;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileProcess, disabled }) => {
    const [dragActive, setDragActive] = useState(false);
    const [fileName, setFileName] = useState<string | null>(null);
    const { t } = useLocalization();

    const handleFile = useCallback((files: FileList | null) => {
        if (files && files[0]) {
            setFileName(files[0].name);
            onFileProcess(files[0]);
        }
    }, [onFileProcess]);

    const handleDrag = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files);
        }
    }, [handleFile]);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files);
        }
    }, [handleFile]);

    return (
        <div className="bg-brand-medium p-4 rounded-lg border-2 border-dashed border-brand-light h-48 flex flex-col justify-center items-center text-center transition-colors duration-300">
            <form id="form-file-upload" onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()} className="h-full w-full">
                <input
                    type="file"
                    id="input-file-upload"
                    className="hidden"
                    onChange={handleChange}
                    disabled={disabled}
                    accept=".pdf,.docx,.xlsx,.csv,.json,.md,.png,.jpg,.jpeg"
                />
                <label
                    id="label-file-upload"
                    htmlFor="input-file-upload"
                    className={`h-full flex flex-col justify-center items-center cursor-pointer ${dragActive ? "bg-brand-light" : ""}`}
                >
                    {fileName ? (
                        <div className="flex flex-col items-center">
                            <FileIcon className="w-10 h-10 text-brand-accent mb-2"/>
                            <p className="font-semibold text-slate-200 break-all px-2">{fileName}</p>
                            <p className="text-sm text-slate-400">{t(disabled ? 'processing_file' : 'file_processed')}</p>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center">
                            <UploadIcon className="w-10 h-10 text-slate-400 mb-2"/>
                            <p className="font-semibold text-slate-200">{t('drop_files_here')}</p>
                            <p className="text-xs text-slate-500 mt-1">{t('supported_formats')}</p>
                        </div>
                    )}
                </label>
                {dragActive && <div className="absolute w-full h-full top-0 left-0" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div>}
            </form>
        </div>
    );
};
