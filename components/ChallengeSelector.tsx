

    import React, { useState, useEffect, useMemo } from 'react';
    import { CHALLENGES_BY_LANGUAGE, LANGUAGES, CHALLENGE_UNLOCK_REQUIREMENTS } from '../constants';
    // FIX: Imported BrainCircuitIcon to resolve a 'Cannot find name' error.
    import { BrainIcon, LockIcon, MapIcon, ListBulletIcon, ChevronDownIcon, CheckIcon, BrainCircuitIcon } from './icons';
    import type { Language, AlgorithmMeta } from '../types';
    import SequenceViewer from './CodeEditor';
    import AlgorithmLab from './AlgorithmLab';
    import CustomAlgorithmLab from './CustomAlgorithmLab';

    interface ChallengeSelectorProps {
        onStartVisualization: (code: string, title: string, language: Language, meta: AlgorithmMeta | null) => void;
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


    const ChallengeSelector: React.FC<ChallengeSelectorProps> = ({ onStartVisualization, completedChallenges }) => {
        const [mode, setMode] = useState<'mindMap' | 'listView' | 'sandbox' | 'algorithms' | 'designer'>('mindMap');
        const [sandboxCode, setSandboxCode] = useState('');
        const [sandboxLanguage, setSandboxLanguage] = useState<Language>('Python');
        const [selectedLanguage, setSelectedLanguage] = useState<Language>('Python');
        const [openAccordion, setOpenAccordion] = useState<Set<number>>(new Set([0]));

        const totalChallenges = useMemo(() => (
            CHALLENGES_BY_LANGUAGE[selectedLanguage].reduce((total, difficulty) => total + difficulty.examples.length, 0)
        ), [selectedLanguage]);
        
        const completedCount = completedChallenges[selectedLanguage]?.length || 0;
        const completionPercentage = totalChallenges > 0 ? (completedCount / totalChallenges) * 100 : 0;
        
        const completedCountsByDifficulty = useMemo(() => {
            const challengesForLang = completedChallenges[selectedLanguage] || [];
            const counts: Record<number, number> = {};
            CHALLENGES_BY_LANGUAGE[selectedLanguage].forEach((difficulty, index) => {
                counts[index] = difficulty.examples.filter(ex => challengesForLang.includes(ex.title)).length;
            });
            return counts;
        }, [completedChallenges, selectedLanguage]);

        const isDifficultyUnlocked = (difficultyIndex: number) => {
            if (difficultyIndex === 0) return true;
            const prevDifficultyIndex = difficultyIndex - 1;
            const requiredCount = CHALLENGE_UNLOCK_REQUIREMENTS[difficultyIndex as keyof typeof CHALLENGE_UNLOCK_REQUIREMENTS];
            const completedInPrevDifficulty = completedCountsByDifficulty[prevDifficultyIndex] || 0;
            return completedInPrevDifficulty >= requiredCount;
        };

        const toggleAccordion = (index: number) => {
            setOpenAccordion(prev => {
                const newSet = new Set(prev);
                if (newSet.has(index)) {
                    newSet.delete(index);
                } else {
                    newSet.add(index);
                }
                return newSet;
            });
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
                onStartVisualization(sandboxCode, 'Custom Sequence Sandbox', sandboxLanguage, null);
            }
        };
        
        const handleCustomCodeChange = (newCode: string) => {
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

        const nodePositions = [
            { top: '20%', left: '15%' }, { top: '50%', left: '5%' }, { top: '80%', left: '15%' },
            { top: '10%', left: '45%' }, { top: '35%', left: '50%' }, { top: '65%', left: '40%' }, { top: '85%', left: '50%' },
            { top: '20%', left: '75%' }, { top: '50%', left: '85%' }, { top: '80%', left: '75%' }
        ];

        const renderLanguageSelector = () => (
            <div className="mb-8">
                <div className="flex flex-wrap justify-center gap-2 p-2 bg-black/20 rounded-lg max-w-lg mx-auto">
                    {LANGUAGES.map((lang) => (
                        <button
                            key={lang}
                            onClick={() => setSelectedLanguage(lang)}
                            className={`px-4 py-1.5 text-sm font-semibold rounded-md transition-colors duration-200 focus:outline-none ${
                                selectedLanguage === lang ? `bg-cyan-500/20 text-cyan-300` : `text-gray-400 hover:bg-cyan-500/10`
                            }`}
                        >
                            {lang}
                        </button>
                    ))}
                </div>
            </div>
        );

        const renderProgressHeader = () => (
             <div className="mb-8 max-w-md mx-auto">
                <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-semibold text-gray-300">{selectedLanguage} Progress</span>
                    <span className="text-sm font-mono text-cyan-300">{completedCount} / {totalChallenges}</span>
                </div>
                <div className="w-full bg-slate-800/50 rounded-full h-2.5 border border-cyan-500/20 p-px">
                    <div
                        className="bg-cyan-400 h-1.5 rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${completionPercentage}%` }}>
                    </div>
                </div>
            </div>
        );
        
        const renderContent = () => {
            switch (mode) {
                case 'designer':
                    return <CustomAlgorithmLab onStartVisualization={onStartVisualization} />;
                case 'algorithms':
                    return <AlgorithmLab onStartVisualization={onStartVisualization} />;
                case 'sandbox':
                    return (
                        <div>
                            <div className="mb-4">
                                <label className="block text-sm font-semibold mb-2 text-gray-400 text-center">Select Language Paradigm:</label>
                                <div className="flex flex-wrap justify-center gap-2 p-2 bg-black/20 rounded-lg max-w-lg mx-auto">
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
                            
                            <div className="h-[350px]">
                                <SequenceViewer
                                    className="h-full !min-h-0"
                                    code={sandboxCode}
                                    onCodeChange={handleCustomCodeChange}
                                    language={sandboxLanguage}
                                    isExecuting={false}
                                    currentLine={-1}
                                    title={null}
                                    breakpoints={[]}
                                    onToggleBreakpoint={() => {}}
                                />
                            </div>

                            <div className="mt-4 flex justify-end">
                                <button
                                    onClick={handleAnalyzeCustomCode}
                                    disabled={!sandboxCode.trim()}
                                    className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 disabled:bg-cyan-800/50 disabled:cursor-not-allowed disabled:text-gray-400 text-white font-bold py-2 px-6 rounded-md transition-all duration-300 text-lg button-glow"
                                >
                                    <BrainCircuitIcon /> Illuminate Sequence
                                </button>
                            </div>
                        </div>
                    );
                 case 'listView':
                    return (
                        <>
                            {renderProgressHeader()}
                            {renderLanguageSelector()}
                            <div className="space-y-2 max-w-3xl mx-auto">
                               {CHALLENGES_BY_LANGUAGE[selectedLanguage].map((difficulty, diffIndex) => {
                                    const isUnlocked = isDifficultyUnlocked(diffIndex);
                                    const isOpen = openAccordion.has(diffIndex);
                                    return (
                                    <div key={difficulty.name} className="bg-slate-900/40 rounded-lg border border-cyan-500/10 overflow-hidden">
                                        <button
                                            onClick={() => isUnlocked && toggleAccordion(diffIndex)}
                                            disabled={!isUnlocked}
                                            className="accordion-header w-full flex items-center justify-between p-4 text-left"
                                        >
                                            <div className="flex items-center gap-4">
                                                { !isUnlocked ? <LockIcon className="w-5 h-5 text-slate-500"/> : <div className={`w-3 h-3 rounded-full difficulty-${diffIndex} bg-current`}></div> }
                                                <h3 className={`text-lg font-orbitron font-bold ${isUnlocked ? 'text-white' : 'text-slate-500'}`}>{difficulty.name}</h3>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <span className={`text-sm font-mono ${isUnlocked ? 'text-cyan-300' : 'text-slate-600'}`}>
                                                    {completedCountsByDifficulty[diffIndex] || 0} / {difficulty.examples.length}
                                                </span>
                                                {isUnlocked && <ChevronDownIcon className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />}
                                            </div>
                                        </button>
                                        {isOpen && isUnlocked && (
                                            <div className="accordion-content p-4 border-t border-slate-800">
                                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                                                    {difficulty.examples.map(example => {
                                                        const isCompleted = completedChallenges[selectedLanguage]?.includes(example.title);
                                                        return (
                                                            <button 
                                                                key={example.title}
                                                                onClick={() => onStartVisualization(example.code, example.title, selectedLanguage, null)}
                                                                className="challenge-list-item flex items-center gap-3 p-3 text-left rounded-md"
                                                            >
                                                                <div className="w-5 h-5 flex-shrink-0">
                                                                    {isCompleted && <CheckIcon className="text-cyan-400"/>}
                                                                </div>
                                                                <span className="text-sm font-medium text-gray-300">{example.title}</span>
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )})}
                            </div>
                        </>
                    );
                case 'mindMap':
                default:
                    return (
                        <>
                            {renderProgressHeader()}
                            {renderLanguageSelector()}
                            <div className="relative h-[500px] w-full mt-4">
                                <svg className="absolute top-0 left-0 w-full h-full" style={{ zIndex: 1 }}>
                                    <line x1="25%" y1="50%" x2="45%" y2="50%" className={`mind-map-connector ${isDifficultyUnlocked(1) ? 'unlocked' : ''}`} strokeDasharray={isDifficultyUnlocked(1) ? 'none' : '5 5'} />
                                    <line x1="60%" y1="50%" x2="80%" y2="50%" className={`mind-map-connector ${isDifficultyUnlocked(2) ? 'unlocked' : ''}`} strokeDasharray={isDifficultyUnlocked(2) ? 'none' : '5 5'} />
                                </svg>
                                {CHALLENGES_BY_LANGUAGE[selectedLanguage].map((difficulty, diffIndex) => 
                                    difficulty.examples.slice(0, diffIndex === 0 ? 3 : (diffIndex === 1 ? 4 : 3)).map((example, exIndex) => {
                                        const nodeIndex = (diffIndex === 0 ? 0 : (diffIndex === 1 ? 3 : 7)) + exIndex;
                                        const isCompleted = completedChallenges[selectedLanguage]?.includes(example.title) ?? false;
                                        return (
                                            <MindMapNode
                                                key={`${diffIndex}-${exIndex}`}
                                                id={`${diffIndex}-${exIndex}`}
                                                title={example.title}
                                                difficulty={diffIndex}
                                                position={nodePositions[nodeIndex]}
                                                onClick={() => onStartVisualization(example.code, example.title, selectedLanguage, null)}
                                                isCompleted={isCompleted}
                                                isLocked={!isDifficultyUnlocked(diffIndex)}
                                            />
                                        )
                                    })
                                )}
                            </div>
                        </>
                    );
            }
        }

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
                    <div className="flex justify-center mb-8 p-1 bg-black/20 rounded-lg max-w-3xl mx-auto">
                        <button 
                            onClick={() => setMode('mindMap')}
                            className={`px-4 py-2 text-sm font-semibold rounded-md flex-1 transition-colors duration-200 flex items-center justify-center gap-2 ${mode === 'mindMap' ? 'bg-cyan-500/20 text-cyan-300' : 'text-gray-400 hover:bg-gray-700/50'}`}
                        >
                            <MapIcon /> Mind Map
                        </button>
                         <button 
                            onClick={() => setMode('listView')}
                            className={`px-4 py-2 text-sm font-semibold rounded-md flex-1 transition-colors duration-200 flex items-center justify-center gap-2 ${mode === 'listView' ? 'bg-cyan-500/20 text-cyan-300' : 'text-gray-400 hover:bg-gray-700/50'}`}
                        >
                            <ListBulletIcon /> List View
                        </button>
                        <button 
                            onClick={() => setMode('algorithms')}
                            className={`px-4 py-2 text-sm font-semibold rounded-md flex-1 transition-colors duration-200 ${mode === 'algorithms' ? 'bg-cyan-500/20 text-cyan-300' : 'text-gray-400 hover:bg-gray-700/50'}`}
                        >
                            Algorithm Lab
                        </button>
                        <button 
                            onClick={() => setMode('designer')}
                            className={`px-4 py-2 text-sm font-semibold rounded-md flex-1 transition-colors duration-200 ${mode === 'designer' ? 'bg-cyan-500/20 text-cyan-300' : 'text-gray-400 hover:bg-gray-700/50'}`}
                        >
                            Designer
                        </button>
                        <button 
                            onClick={() => setMode('sandbox')}
                            className={`px-4 py-2 text-sm font-semibold rounded-md flex-1 transition-colors duration-200 ${mode === 'sandbox' ? 'bg-cyan-500/20 text-cyan-300' : 'text-gray-400 hover:bg-gray-700/50'}`}
                        >
                            Sandbox
                        </button>
                    </div>
                    {renderContent()}
                </div>
            </div>
        );
    };

    export default ChallengeSelector;