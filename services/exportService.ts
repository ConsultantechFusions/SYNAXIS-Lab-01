import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Packer } from 'docx';
// Fix: Use default import for file-saver as it does not have a named export for 'saveAs'.
import saveAs from 'file-saver';
import * as XLSX from 'xlsx';
import { Document, Paragraph, TextRun, Table, TableRow, TableCell, WidthType } from 'docx';

// Helper function to convert markdown table to 2D array
const markdownTableToArray = (markdown: string): string[][] => {
    const lines = markdown.split('\n').filter(line => line.includes('|'));
    if (lines.length < 2) return [];

    const cleanCell = (cell: string) => cell.trim();
    const header = lines[0].split('|').slice(1, -1).map(cleanCell);
    const rows = lines.slice(2).map(line => line.split('|').slice(1, -1).map(cleanCell));
    
    return [header, ...rows];
}

export const exportToPdf = (element: HTMLElement) => {
    html2canvas(element).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('report.pdf');
    });
};

export const exportToPng = (element: HTMLElement) => {
    html2canvas(element).then(canvas => {
        canvas.toBlob(blob => {
            if (blob) {
                saveAs(blob, 'report.png');
            }
        });
    });
};

export const exportToDocx = (markdownContent: string) => {
    const paragraphs: (Paragraph | Table)[] = [];
    const sections = markdownContent.split(/(\n---\n)/); // split by horizontal rules

    sections.forEach(section => {
        if (section.trim().startsWith('|')) { // This is a table
             const tableArray = markdownTableToArray(section);
             if (tableArray.length > 0) {
                const docxTable = new Table({
                    width: {
                        size: 100,
                        // Fix: The correct property on WidthType is PERCENTAGE, not PERCENT.
                        type: WidthType.PERCENTAGE,
                    },
                    rows: tableArray.map((row, rowIndex) => new TableRow({
                        children: row.map(cell => new TableCell({
                            children: [new Paragraph(cell)],
                        })),
                        tableHeader: rowIndex === 0,
                    })),
                });
                paragraphs.push(docxTable);
             }
        } else { // This is text
            const textParagraphs = section.split('\n').map(line => new Paragraph({
                children: [new TextRun(line.replace(/#+\s*/, ''))], // Basic markdown cleanup
            }));
            paragraphs.push(...textParagraphs);
        }
    });

    const doc = new Document({
        sections: [{
            children: paragraphs,
        }],
    });

    Packer.toBlob(doc).then(blob => {
        saveAs(blob, "report.docx");
    });
};

export const exportToXlsx = (tableElement: HTMLTableElement) => {
    const wb = XLSX.utils.table_to_book(tableElement);
    XLSX.writeFile(wb, "report.xlsx");
};
