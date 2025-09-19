
import React from 'react';
import { SynaxisLogo } from './icons';

export const Header: React.FC = () => {
    return (
        <header className="text-center w-full">
            <div className="flex justify-center items-center mb-2">
                <SynaxisLogo className="h-16 w-auto text-slate-300" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-slate-100">
                SYNAXIS LAB
            </h1>
            <p className="mt-2 text-md text-slate-400">
                Design by Mostafa Abu El-Yazid
            </p>
        </header>
    );
};
