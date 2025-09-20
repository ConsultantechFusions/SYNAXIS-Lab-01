import { GoogleGenAI } from "@google/genai";
import type { FileData, Language } from '../types';

// Per Gemini API guidelines, API key must be from process.env.API_KEY directly.
if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const languageInstruction = (lang: Language) => {
    switch(lang) {
        case 'ar': return 'Please respond in Arabic.';
        case 'ur': return 'Please respond in Urdu.';
        case 'es': return 'Please respond in Spanish.';
        case 'fr': return 'Please respond in French.';
        case 'de': return 'Please respond in German.';
        case 'hi': return 'Please respond in Hindi.';
        default: return 'Please respond in English.';
    }
}

export const getAiResponse = async (fileData: FileData[], query: string, lang: Language): Promise<string> => {
    try {
        const textFiles = fileData.filter(f => !f.isImage);
        const imageFiles = fileData.filter(f => f.isImage);

        let fileContext = '';
        if (textFiles.length > 0) {
            const textContexts = textFiles.map(f => `Document content for "${f.name}":\n\n${f.content}`);
            fileContext = `The user has uploaded ${textFiles.length} text document(s). Their contents are provided below:\n\n` + textContexts.join('\n\n---\n\n');
        }
        
        const imageParts = imageFiles.map(f => ({
            inlineData: {
                mimeType: f.type,
                data: f.content,
            },
        }));

        let userQueryText = `${languageInstruction(lang)}\n\nBased on the uploaded content, please answer the following user query: "${query}"`;
        if (textFiles.length === 0 && imageFiles.length > 0) {
            userQueryText = `The user has uploaded ${imageFiles.length} image(s).\n${userQueryText}`;
        }
        const userQueryPart = { text: userQueryText };

        // Fix: Explicitly type `parts` as an array that can contain both image and text parts
        // to resolve TypeScript type inference error when pushing text parts to an array
        // initialized with only image parts.
        const parts: ({ inlineData: { mimeType: string; data: string; }; } | { text: string; })[] = [...imageParts];
        if (fileContext) {
            parts.push({ text: fileContext });
        }
        parts.push(userQueryPart);
        
        const response = await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: { parts }});
        return response.text;

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to get response from AI model.");
    }
};

export const getAiCanvasResponse = async (fileData: FileData[], query: string, lang: Language): Promise<string> => {
    try {
        const systemInstruction = `You are a data analysis assistant. Your task is to process the user's request based on the provided document content and generate a response formatted exclusively in Markdown. Do not include any conversational text, greetings, or explanations outside of the a Markdown structure. If the user asks for a table, provide only the Markdown table. If they ask for a summary, provide a well-structured summary in Markdown. ${languageInstruction(lang)}`;

        const textFiles = fileData.filter(f => !f.isImage);
        const imageFiles = fileData.filter(f => f.isImage);

        const textContext = textFiles.map(f => `Document Content from "${f.name}":\n\`\`\`\n${f.content}\n\`\`\``).join('\n\n');
        
        const userPrompt = `User Request: "${query}"\n\n${textContext}`;
        
        const imageParts = imageFiles.map(f => ({
            inlineData: {
                mimeType: f.type,
                data: f.content,
            },
        }));

        // Fix: Explicitly type `parts` as an array that can contain both image and text parts
        // to resolve TypeScript type inference error when pushing text parts to an array
        // initialized with only image parts.
        const parts: ({ inlineData: { mimeType: string; data: string; }; } | { text: string; })[] = [...imageParts];
        // Ensure we always have at least one part, even if it's just the prompt
        if (userPrompt.trim().length > 0 || imageParts.length === 0) {
             parts.push({ text: userPrompt });
        }
       
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: { parts },
            config: {
                systemInstruction,
            },
        });
        
        return response.text;

    } catch (error) {
        console.error("Error calling Gemini API for canvas:", error);
        throw new Error("Failed to get structured response from AI model.");
    }
};

const languageMap: Record<Language, string> = {
    en: 'English', ar: 'Arabic', ur: 'Urdu', es: 'Spanish', fr: 'French', hi: 'Hindi', de: 'German'
};

export const translateText = async (text: string, targetLang: Language, sourceLang: Language): Promise<string> => {
    try {
        const systemInstruction = `You are an expert translator. Translate the following text from ${languageMap[sourceLang]} to ${languageMap[targetLang]}. Do not add any extra text, explanations, or formatting. Return only the translated text.`;
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: text,
            config: {
                systemInstruction,
            },
        });

        return response.text;
    } catch (error) {
        console.error(`Error translating text to ${targetLang}:`, error);
        throw new Error("Failed to translate text.");
    }
};
