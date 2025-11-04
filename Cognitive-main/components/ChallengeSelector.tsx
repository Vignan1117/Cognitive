import React, { useState, useEffect, useMemo } from 'react';
import { CHALLENGES_BY_LANGUAGE, LANGUAGES, CHALLENGE_UNLOCK_REQUIREMENTS } from '../constants';
import { BrainIcon, PlayIcon, LockIcon } from './icons';
import type { Language } from '../types';

interface ChallengeSelectorProps {
    onSelectExample: (code: string, title: string, language: Language) => void;
    completedChallenges: Record<Language, string[]>;
}

const MindMapNode: React.FC<{
    id: string;
    title: string;
    difficulty: number;
    position: { top: string; left: string };
    onClick: () => void;
    isCompleted: boolean;
    isLocked: boolean;
}> = ({ id, title, difficulty, position, onClick, isCompleted, isLocked }) => {
    const animationStyle = useMemo(() => ({
        top: position.top,
        left: position.left,
        animation: isLocked ? 'none' : `float ${6 + Math.random() * 4}s ease-in-out infinite`
    }), [position, isLocked]);

    return (
        <button
            onClick={onClick}
            disabled={isLocked}
            className={`mind-map-node difficulty-${difficulty} absolute flex items-center justify-center w-28 h-28 rounded-full border-current bg-slate-900/50 backdrop-blur-sm shadow-xl ${isCompleted ? 'completed' : ''} ${isLocked ? 'locked' : ''}`}
            style={animationStyle}
            title={isLocked ? 'Locked' : title}
        >
            {isLocked ? <LockIcon /> : <span className="text-center text-xs font-semibold text-white p-2">{title}</span>}
        </button>
    );
};


const ChallengeSelector: React.FC<ChallengeSelectorProps> = ({ onSelectExample, completedChallenges }) => {
    const [mode, setMode] = useState<'challenges' | 'sandbox'>('challenges');
    const [sandboxCode, setSandboxCode] = useState('');
    const [sandboxLanguage, setSandboxLanguage] = useState<Language>('Python');

    // The mind map currently only displays Python challenges.
    const totalChallenges = CHALLENGES_BY_LANGUAGE['Python'].reduce((total, difficulty) => total + difficulty.examples.length, 0);
    const completedCount = completedChallenges['Python']?.length || 0;
    const completionPercentage = totalChallenges > 0 ? (completedCount / totalChallenges) * 100 : 0;
    
    const pythonCompletedCounts = useMemo(() => {
        const pythonChallenges = completedChallenges['Python'] || [];
        return {
            0: CHALLENGES_BY_LANGUAGE['Python'][0].examples.filter(ex => pythonChallenges.includes(ex.title)).length,
            1: CHALLENGES_BY_LANGUAGE['Python'][1].examples.filter(ex => pythonChallenges.includes(ex.title)).length,
        };
    }, [completedChallenges]);

    const isDifficultyUnlocked = (difficultyIndex: number) => {
        if (difficultyIndex === 0) return true;
        const prevDifficultyIndex = difficultyIndex - 1;
        const requiredCount = CHALLENGE_UNLOCK_REQUIREMENTS[difficultyIndex as keyof typeof CHALLENGE_UNLOCK_REQUIREMENTS];
        const completedCount = pythonCompletedCounts[prevDifficultyIndex as keyof typeof pythonCompletedCounts];
        return completedCount >= requiredCount;
    };

    useEffect(() => {
        try {
            const savedCode = localStorage.getItem('sandboxCode');
            const defaultCode = `// Welcome to the Sandbox!\n// Craft your own sequence in ${sandboxLanguage}.`;
            setSandboxCode(savedCode || defaultCode);
            
            const savedLanguage = localStorage.getItem('sandboxLanguage') as Language | null;
            if (savedLanguage && LANGUAGES.includes(savedLanguage)) {
                setSandboxLanguage(savedLanguage);
            }
        } catch (error) {
            console.error("Could not access localStorage:", error);
        }
    }, []);

    useEffect(() => {
        if(sandboxCode.startsWith('// Welcome to the Sandbox!')) {
            setSandboxCode(`// Welcome to the Sandbox!\n// Craft your own sequence in ${sandboxLanguage}.`);
        }
    }, [sandboxLanguage]);
    
    const handleAnalyzeCustomCode = () => {
        if (sandboxCode.trim()) {
            onSelectExample(sandboxCode, 'Custom Sequence Sandbox', sandboxLanguage);
        }
    };
    
    const handleCustomCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newCode = e.target.value;
        setSandboxCode(newCode);
        try {
            localStorage.setItem('sandboxCode', newCode);
        } catch (error) {
            console.error("Could not save code to localStorage:", error);
        }
    };

    const handleSandboxLanguageChange = (lang: Language) => {
        setSandboxLanguage(lang);
        try {
            localStorage.setItem('sandboxLanguage', lang);
        } catch (error) {
            console.error("Could not save language to localStorage:", error);
        }
    };

    // Define positions for nodes in a visually appealing way
    const nodePositions = [
        // Beginner
        { top: '20%', left: '15%' }, { top: '50%', left: '5%' }, { top: '80%', left: '15%' },
        // Intermediate
        { top: '10%', left: '45%' }, { top: '35%', left: '50%' }, { top: '65%', left: '40%' }, { top: '85%', left: '50%' },
        // Advanced
        { top: '20%', left: '75%' }, { top: '50%', left: '85%' }, { top: '80%', left: '75%' }
    ];

    return (
        <div className="game-panel">
            <div className="game-panel-header">
                 <div className="text-center">
                    <BrainIcon />
                    <h2 className="text-3xl font-bold text-glow text-cyan-300 font-orbitron mt-2">The Cognitive Labyrinth</h2>
                    <p className="text-gray-400">Choose a logic sequence to decipher, or enter the sandbox to craft your own.</p>
                </div>
            </div>
            <div className="game-panel-content">
                <div className="mb-8 max-w-md mx-auto">
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-semibold text-gray-300">Mind Map Progress</span>
                        <span className="text-sm font-mono text-cyan-300">{completedCount} / {totalChallenges}</span>
                    </div>
                    <div className="w-full bg-slate-800/50 rounded-full h-2.5 border border-cyan-500/20 p-px">
                        <div
                            className="bg-cyan-400 h-1.5 rounded-full transition-all duration-500 ease-out"
                            style={{ width: `${completionPercentage}%` }}>
                        </div>
                    </div>
                </div>

                 <div className="flex justify-center mb-8 p-1 bg-black/20 rounded-lg max-w-sm mx-auto">
                    <button 
                        onClick={() => setMode('challenges')}
                        className={`px-6 py-2 text-sm font-semibold rounded-md w-1/2 transition-colors duration-200 ${mode === 'challenges' ? 'bg-cyan-500/20 text-cyan-300' : 'text-gray-400 hover:bg-gray-700/50'}`}
                    >
                        Mind Map
                    </button>
                    <button 
                        onClick={() => setMode('sandbox')}
                        className={`px-6 py-2 text-sm font-semibold rounded-md w-1/2 transition-colors duration-200 ${mode === 'sandbox' ? 'bg-cyan-500/20 text-cyan-300' : 'text-gray-400 hover:bg-gray-700/50'}`}
                    >
                        Sandbox
                    </button>
                </div>

                {mode === 'challenges' ? (
                    <div className="relative h-[500px] w-full">
                         <svg className="absolute top-0 left-0 w-full h-full" style={{ zIndex: 1 }}>
                            <line x1="25%" y1="50%" x2="45%" y2="50%" className={`mind-map-connector ${isDifficultyUnlocked(1) ? 'unlocked' : ''}`} strokeDasharray={isDifficultyUnlocked(1) ? 'none' : '5 5'} />
                            <line x1="60%" y1="50%" x2="80%" y2="50%" className={`mind-map-connector ${isDifficultyUnlocked(2) ? 'unlocked' : ''}`} strokeDasharray={isDifficultyUnlocked(2) ? 'none' : '5 5'} />
                         </svg>
                        {/* Render a subset of Python challenges for the map */}
                        {CHALLENGES_BY_LANGUAGE['Python'].map((difficulty, diffIndex) => 
                            difficulty.examples.slice(0, diffIndex === 0 ? 3 : (diffIndex === 1 ? 4 : 3)).map((example, exIndex) => {
                                const nodeIndex = (diffIndex === 0 ? 0 : (diffIndex === 1 ? 3 : 7)) + exIndex;
                                const isCompleted = completedChallenges['Python']?.includes(example.title) ?? false;
                                return (
                                    <MindMapNode
                                        key={`${diffIndex}-${exIndex}`}
                                        id={`${diffIndex}-${exIndex}`}
                                        title={example.title}
                                        difficulty={diffIndex}
                                        position={nodePositions[nodeIndex]}
                                        onClick={() => onSelectExample(example.code, example.title, 'Python')}
                                        isCompleted={isCompleted}
                                        isLocked={!isDifficultyUnlocked(diffIndex)}
                                    />
                                )
                            })
                        )}
                    </div>
                ) : (
                    <div>
                         <div className="mb-4">
                            <label className="block text-sm font-semibold mb-2 text-gray-400">Select Language Paradigm:</label>
                            <div className="flex flex-wrap justify-center gap-2 p-2 bg-black/20 rounded-lg">
                                {LANGUAGES.map((lang) => (
                                    <button
                                        key={lang}
                                        onClick={() => handleSandboxLanguageChange(lang)}
                                        className={`px-4 py-1.5 text-sm font-semibold rounded-md transition-colors duration-200 focus:outline-none ${
                                            sandboxLanguage === lang ? `bg-cyan-500/20 text-cyan-300` : `text-gray-400 hover:bg-cyan-500/10`
                                        }`}
                                    >
                                        {lang}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <textarea
                            value={sandboxCode}
                            onChange={handleCustomCodeChange}
                            className="w-full bg-slate-900/80 text-gray-200 font-mono text-sm p-4 rounded-lg border border-cyan-500/20 focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-y"
                            rows={12}
                            placeholder={`// Enter your ${sandboxLanguage} code here...`}
                            spellCheck="false"
                        />
                        <div className="mt-4 flex justify-end">
                            <button
                                onClick={handleAnalyzeCustomCode}
                                disabled={!sandboxCode.trim()}
                                className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 disabled:bg-cyan-800/50 disabled:cursor-not-allowed disabled:text-gray-400 text-white font-bold py-2 px-6 rounded-md transition-all duration-300 text-lg button-glow"
                            >
                                <PlayIcon /> Illuminate Sequence
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChallengeSelector;