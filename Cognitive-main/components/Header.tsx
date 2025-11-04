import React from 'react';
import type { Language } from '../types';
import { LANGUAGES } from '../constants';

interface HeaderProps {
    language: Language | null;
    onLanguageChange: (lang: Language) => void;
    level: number;
    xp: number;
    xpForNextLevel: number;
}

const Header: React.FC<HeaderProps> = ({ language, onLanguageChange, level, xp, xpForNextLevel }) => {
    const xpPercentage = xpForNextLevel > 0 ? (xp / xpForNextLevel) * 100 : 0;
    
    return (
        <header className="bg-slate-900/50 backdrop-blur-sm border-b border-cyan-500/20 sticky top-0 z-20">
            <div className="container mx-auto px-4 md:px-6 py-3 flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-white tracking-wider font-orbitron">
                            <span className="text-cyan-400 text-glow">Cognitive</span> Labyrinth
                        </h1>
                        <p className="text-sm text-gray-400">Decipher the pathways of logic.</p>
                    </div>
                     {language && (
                         <div className="relative">
                            <select
                                value={language}
                                onChange={(e) => onLanguageChange(e.target.value as Language)}
                                className="language-select bg-slate-800/60 border border-cyan-500/30 rounded-md text-sm font-semibold text-cyan-300 px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors cursor-pointer"
                                aria-label="Select programming language"
                            >
                                {LANGUAGES.map((lang) => (
                                    <option key={lang} value={lang} className="bg-slate-900 text-white font-semibold">
                                        {lang}
                                    </option>
                                ))}
                            </select>
                        </div>
                     )}
                </div>
                <div className="flex items-center gap-4">
                     <div className="level-display">
                        <svg className="level-display-hex" viewBox="0 0 60 68">
                            <path d="M30 0 L60 17 V51 L30 68 L0 51 V17 Z" />
                        </svg>
                        <div className="z-10 text-center">
                            <span className="text-xs text-gray-400 font-semibold tracking-widest font-orbitron -mb-1 block">LVL</span>
                            <p className="font-bold text-2xl text-white font-orbitron">{String(level).padStart(2, '0')}</p>
                        </div>
                    </div>
                    <div className="hidden sm:block">
                        <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-400 font-semibold tracking-widest font-orbitron">XP</span>
                            <span className="text-xs text-cyan-200 font-mono">{xp} / {xpForNextLevel}</span>
                        </div>
                        <div className="xp-bar-container">
                            <div className="xp-bar-fill" style={{width: `${xpPercentage}%`}}></div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;