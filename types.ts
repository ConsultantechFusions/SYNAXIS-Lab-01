
export type Language = 'en' | 'ar' | 'ur';

export interface Message {
    sender: 'user' | 'ai' | 'system';
    text: string;
}

export interface FileData {
    name: string;
    type: string;
    content: string; // Could be text content or base64 for images
    isImage: boolean;
}

export interface LocalizationContent {
    [key: string]: {
        [lang in Language]: string;
    };
}
