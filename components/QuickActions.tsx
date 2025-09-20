
import React from 'react';
import { useLocalization } from '../hooks/useLocalization';
import { SparklesIcon, SummarizeIcon, MindMapIcon, TableIcon } from './icons';

interface QuickAction {
    key: string;
    prompt: string;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

const actions: QuickAction[] = [
    { 
        key: 'summarize_file', 
        prompt: 'Create a concise summary of the provided document content.',
        icon: SummarizeIcon
    },
    { 
        key: 'create_mind_map', 
        prompt: 'Generate a mind map in Markdown format outlining the key topics, sub-topics, and relationships in the document.',
        icon: MindMapIcon
    },
    { 
        key: 'analyze_data', 
        prompt: 'Analyze the data in this document. Identify key trends, patterns, or insights. If applicable, present the most important information in one or more Markdown tables.',
        icon: TableIcon
    },
];


interface QuickActionsProps {
    onAction: (prompt: string, isCanvasQuery: boolean) => void;
    disabled: boolean;
}

export const QuickActions: React.FC<QuickActionsProps> = ({ onAction, disabled }) => {
    const { t } = useLocalization();

    return (
        <div className="bg-brand-medium p-4 rounded-lg">
            <h3 className="text-md font-semibold text-slate-300 mb-3 flex items-center gap-2">
                <SparklesIcon className="w-5 h-5 text-brand-gold" />
                {t('quick_actions')}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {actions.map(({ key, prompt, icon: Icon }) => (
                    <button
                        key={key}
                        onClick={() => onAction(prompt, true)}
                        disabled={disabled}
                        className="flex items-center justify-center text-center gap-2 w-full px-3 py-2 text-sm font-medium rounded-md bg-brand-light hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                        <Icon className="w-4 h-4" />
                        <span>{t(key)}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};
