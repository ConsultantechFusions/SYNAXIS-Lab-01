
import React, { useState, useCallback } from 'react';
import { useLocalization } from '../hooks/useLocalization';
import { UploadIcon, FileIcon } from './icons';

interface FileUploadProps {
    onFileProcess: (files: File[]) => void;
    disabled: boolean;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileProcess, disabled }) => {
    const [dragActive, setDragActive] = useState(false);
    const [fileNames, setFileNames] = useState<string[]>([]);
    const { t } = useLocalization();

    const handleFiles = useCallback((files: FileList | null) => {
        if (files && files.length > 0) {
            const fileArray = Array.from(files);
            setFileNames(fileArray.map(f => f.name));
            onFileProcess(fileArray);
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
            handleFiles(e.dataTransfer.files);
        }
    }, [handleFiles]);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFiles(e.target.files);
        }
    }, [handleFiles]);

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
                    multiple
                />
                <label
                    id="label-file-upload"
                    htmlFor="input-file-upload"
                    className={`h-full w-full flex flex-col justify-center items-center cursor-pointer ${dragActive ? "bg-brand-light" : ""}`}
                >
                    {fileNames.length > 0 ? (
                        <div className="flex flex-col items-center w-full px-4 h-full">
                            <FileIcon className="w-8 h-8 text-brand-accent mb-2 flex-shrink-0"/>
                            <p className="font-semibold text-slate-200 text-sm mb-1 flex-shrink-0">
                                {disabled ? `Processing ${fileNames.length} file(s)...` : `${fileNames.length} file(s) processed`}
                            </p>
                            <div className="overflow-y-auto text-xs text-slate-400 text-left w-full">
                                <ul className="list-disc list-inside">
                                    {fileNames.map((name, index) => <li key={index} className="truncate">{name}</li>)}
                                </ul>
                            </div>
                            {disabled && (
                                <div className="w-full bg-brand-light rounded-full h-2 mt-auto">
                                    <div className="bg-brand-accent h-2 rounded-full animate-pulse"></div>
                                </div>
                            )}
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
