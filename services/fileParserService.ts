import * as pdfjsLib from 'pdfjs-dist/build/pdf';
import * as mammoth from 'mammoth';
import * as XLSX from 'xlsx';
import Papa from 'papaparse';
import type { FileData } from '../types';

// Set worker path for pdf.js, pointing to the same CDN as the library
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://aistudiocdn.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.js`;

const readFileAsText = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsText(file);
    });
};

const readFileAsBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const base64 = (reader.result as string).split(',')[1];
            resolve(base64);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

const readFileAsArrayBuffer = (file: File): Promise<ArrayBuffer> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as ArrayBuffer);
        reader.onerror = reject;
        reader.readAsArrayBuffer(file);
    });
};

export const parseFile = async (file: File): Promise<FileData> => {
    const extension = file.name.split('.').pop()?.toLowerCase();
    let content: string = '';
    let isImage = false;

    switch (extension) {
        case 'pdf':
            const pdfData = await readFileAsArrayBuffer(file);
            const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;
            const numPages = pdf.numPages;
            let pdfText = '';
            for (let i = 1; i <= numPages; i++) {
                const page = await pdf.getPage(i);
                const textContent = await page.getTextContent();
                pdfText += textContent.items.map(item => ('str' in item ? item.str : '')).join(' ');
            }
            content = pdfText;
            break;

        case 'docx':
            const docxData = await readFileAsArrayBuffer(file);
            const docxResult = await mammoth.extractRawText({ arrayBuffer: docxData });
            content = docxResult.value;
            break;

        case 'xlsx':
            const xlsxData = await readFileAsArrayBuffer(file);
            const workbook = XLSX.read(xlsxData, { type: 'array' });
            let xlsxContent = '';
            workbook.SheetNames.forEach(sheetName => {
                xlsxContent += `Sheet: ${sheetName}\n`;
                const csv = XLSX.utils.sheet_to_csv(workbook.Sheets[sheetName]);
                xlsxContent += csv + '\n\n';
            });
            content = xlsxContent;
            break;

        case 'csv':
            const csvText = await readFileAsText(file);
            // We just pass the text, Gemini can understand CSV structure
            content = csvText;
            break;
        
        case 'json':
        case 'md':
            content = await readFileAsText(file);
            break;

        case 'png':
        case 'jpg':
        case 'jpeg':
            content = await readFileAsBase64(file);
            isImage = true;
            break;

        default:
            throw new Error(`Unsupported file type: ${extension}`);
    }

    return {
        name: file.name,
        type: file.type,
        content: content,
        isImage: isImage,
    };
};