
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
        default: return 'Please respond in English.';
    }
}

const buildPrompt = (fileData: FileData, query: string, lang: Language) => {
    const fileContext = fileData.isImage
        ? "The user has uploaded an image."
        : `Here is the content of the uploaded document titled "${fileData.name}":\n\n${fileData.content}`;
    
    return `${languageInstruction(lang)}\n\n${fileContext}\n\nBased on this, please answer the following user query: "${query}"`;
};

export const getAiResponse = async (fileData: FileData, query: string, lang: Language): Promise<string> => {
    try {
        const prompt = buildPrompt(fileData, query, lang);
        
        if (fileData.isImage) {
            const imagePart = {
                inlineData: {
                    mimeType: fileData.type,
                    data: fileData.content,
                },
            };
            const textPart = { text: `${languageInstruction(lang)}\n\nUser query about the image: "${query}"` };
            const response = await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: { parts: [imagePart, textPart] }});
            return response.text;
        } else {
            const response = await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: prompt });
            return response.text;
        }
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to get response from AI model.");
    }
};

export const getAiCanvasResponse = async (fileData: FileData, query: string, lang: Language): Promise<string> => {
    try {
        const systemInstruction = `You are a data analysis assistant. Your task is to process the user's request based on the provided document content and generate a response formatted exclusively in Markdown. Do not include any conversational text, greetings, or explanations outside of the Markdown structure. If the user asks for a table, provide only the Markdown table. If they ask for a summary, provide a well-structured summary in Markdown. ${languageInstruction(lang)}`;

        const userPrompt = `Document Content:\n\`\`\`\n${fileData.content}\n\`\`\`\n\nUser Request: "${query}"`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: userPrompt,
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
