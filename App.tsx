
import React, { useState, useEffect, useRef } from 'react';
import type { ExecutionStep, Language, QuizQuestion, AlgorithmMeta } from './types';
import { getExecutionTrace, getQuizForCode } from './services/geminiService';
import Header from './components/Header';
import SequenceViewer from './components/CodeEditor';
import Controls from './components/Controls';
import DataCoreView from './components/MemoryView';
import EchoChamberView from './components/ConsoleView';
import CognitiveAnalysisView from './components/ExplanationView';
import PerformanceView from './components/PerformanceView';
import ChallengeSelector from './components/ChallengeSelector';
import MindLockView from './components/QuizView';
import { useUserData, XP_FOR_CHALLENGE_COMPLETION, XP_PER_CORRECT_ANSWER } from './hooks/useUserData';
import XpGainIndicator from './components/XpGainIndicator';
import ChallengeCompleteModal from './components/ChallengeCompleteModal';
import LevelUpModal from './components/LevelUpModal';
import AlgorithmVisualizer from './components/AlgorithmVisualizer';


const App: React.FC = () => {
    const [code, setCode] = useState<string>('');
    const [language, setLanguage] = useState<Language | null>(null);
    const [challengeTitle, setChallengeTitle] = useState<string | null>(null);
    const [trace, setTrace] = useState<ExecutionStep[]>([]);
    const [currentStep, setCurrentStep] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [breakpoints, setBreakpoints] = useState<Set<number>>(new Set());
    const [isDebugging, setIsDebugging] = useState<boolean>(false);
    const [quiz, setQuiz] = useState<QuizQuestion[] | null>(null);
    const [showQuiz, setShowQuiz] = useState<boolean>(false);
    const [xpGain, setXpGain] = useState<{ amount: number; key: number } | null>(null);
    const [completedChallengeTitle, setCompletedChallengeTitle] = useState<string | null>(null);
    const [showLevelUp, setShowLevelUp] = useState(false);
    const [algorithmMeta, setAlgorithmMeta] = useState<AlgorithmMeta | null>(null);

    const { userData, addXp, completeChallenge, xpProgress, xpForNextLevel } = useUserData();
    const prevLevelRef = useRef(userData.level);

    useEffect(() => {
        if (trace.length > 0 && currentStep === trace.length - 1 && quiz) {
            setShowQuiz(true);
        }
    }, [currentStep, trace, quiz]);
    
    useEffect(() => {
        if (userData.level > prevLevelRef.current) {
            setShowLevelUp(true);
        }
        prevLevelRef.current = userData.level;
    }, [userData.level]);

    const showXpGain = (amount: number) => {
        setXpGain({ amount, key: Date.now() });
        setTimeout(() => setXpGain(null), 2000); // Duration of animation
    };

    const handleStartVisualization = (newCode: string, title: string, lang: Language, meta: AlgorithmMeta | null) => {
        handleReset();
        setCode(newCode);
        setChallengeTitle(title);
        setLanguage(lang);
        setAlgorithmMeta(meta);
    };

    const handleLanguageChange = (newLanguage: Language) => {
        setLanguage(newLanguage);
        if (challengeTitle && challengeTitle !== 'Custom Sequence Sandbox') {
            setChallengeTitle("Custom Sequence Sandbox");
            setAlgorithmMeta(null);
        }
    };

    const handleStartAnalysis = async (debugMode: boolean) => {
        if (!language) {
            setError("A language must be selected before analysis.");
            return;
        }
        setIsLoading(true);
        setError(null);
        setTrace([]);
        setCurrentStep(0);
        setIsDebugging(debugMode);
        setShowQuiz(false);
        setQuiz(null);

        try {
            const traceResult = await getExecutionTrace(code, language, algorithmMeta);
            
            if (traceResult && traceResult.length > 0) {
                setTrace(traceResult);

                // Don't fetch quiz for algorithms
                if (!algorithmMeta) {
                    const quizResult = await getQuizForCode(code, language);
                    setQuiz(quizResult);
                }
                
                if (debugMode) {
                    const breakpointLines: number[] = Array.from(breakpoints);
                    if (breakpointLines.length > 0) {
                        const firstBreakpoint = Math.min(...breakpointLines);
                        const firstBreakpointStep = traceResult.findIndex(step => step.line === firstBreakpoint);
                        if (firstBreakpointStep !== -1) {
                            setCurrentStep(firstBreakpointStep);
                        }
                    }
                }
            } else {
                setError("Could not generate a visualization. The sequence might be empty or invalid.");
            }
        } catch (e) {
            console.error(e);
            setError("An error occurred while analyzing the sequence. Please check the console for details.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleNextStep = () => {
        if (currentStep < trace.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePrevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };
    
    const handleContinueDebugging = () => {
        if (currentStep < trace.length - 1) {
            const currentLine = trace[currentStep].line;
            const sortedBreakpoints = Array.from(breakpoints).sort((a: number, b: number) => a - b);
            const nextBreakpointLine = sortedBreakpoints.find(b => b > currentLine);
            
            if (nextBreakpointLine) {
                 const nextStepIndex = trace.findIndex((step, index) => index > currentStep && step.line === nextBreakpointLine);
                 if (nextStepIndex !== -1) {
                     setCurrentStep(nextStepIndex);
                     return;
                 }
            }
        }
        setCurrentStep(trace.length - 1);
    };

    const handleReset = () => {
        setCode('');
        setChallengeTitle(null);
        setLanguage(null);
        setTrace([]);
        setCurrentStep(0);
        setError(null);
        setBreakpoints(new Set());
        setIsDebugging(false);
        setShowQuiz(false);
        setQuiz(null);
        setAlgorithmMeta(null);
    };
    
    const handleQuizAnswer = (isCorrect: boolean) => {
        if (isCorrect) {
            addXp(XP_PER_CORRECT_ANSWER);
            showXpGain(XP_PER_CORRECT_ANSWER);
        }
    };

    const handleQuizComplete = () => {
        if (language && challengeTitle && challengeTitle !== 'Custom Sequence Sandbox' && challengeTitle !== 'Custom Algorithm') {
            const isAlreadyCompleted = userData.completedChallenges[language]?.includes(challengeTitle);

            if (!isAlreadyCompleted) {
                completeChallenge(language, challengeTitle);
                addXp(XP_FOR_CHALLENGE_COMPLETION);
                setCompletedChallengeTitle(challengeTitle);
            } else {
                handleReset();
            }
        } else {
            handleReset();
        }
    };
    
    const handleCloseCompletionModal = () => {
        setCompletedChallengeTitle(null);
        handleReset();
    };

    const handleCloseLevelUpModal = () => {
        setShowLevelUp(false);
    };

    const handleToggleBreakpoint = (lineNumber: number) => {
        setBreakpoints(prev => {
            const newBreakpoints = new Set(prev);
            if (newBreakpoints.has(lineNumber)) {
                newBreakpoints.delete(lineNumber);
            } else {
                newBreakpoints.add(lineNumber);
            }
            return newBreakpoints;
        });
    };

    const currentTraceStep = trace.length > 0 ? trace[currentStep] : null;

    const renderContent = () => {
        if (showQuiz && quiz) {
            return <MindLockView quiz={quiz} onComplete={handleQuizComplete} onAnswer={handleQuizAnswer} />;
        }
        
        if (isLoading && code !== '') {
             return (
                <div className="bg-slate-900/50 rounded-lg p-6 flex items-center justify-center h-full min-h-[300px] border border-cyan-500/20 backdrop-blur-sm">
                    <div className="text-center">
                        <svg className="animate-spin h-8 w-8 text-cyan-400 mx-auto mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <p className="text-lg font-semibold text-gray-200 font-orbitron">Illuminating Sequence...</p>
                        <p className="text-sm text-gray-400">The Cognitive Engine is deciphering the logic pathways.</p>
                    </div>
                </div>
            );
        }

        if (error) {
             return (
                <div className="bg-red-900/20 border border-red-500/50 text-red-300 rounded-lg p-4 h-full flex flex-col justify-center">
                    <h3 className="font-bold text-red-200 font-orbitron">Decipher Failed</h3>
                    <p>{error}</p>
                </div>
            );
        }

        if (trace.length > 0 && currentTraceStep) {
            return (
               <>
                <CognitiveAnalysisView explanation={currentTraceStep.explanation} />
                <PerformanceView
                    trace={trace}
                    currentStepIndex={currentStep}
                />
                {algorithmMeta ? (
                    <AlgorithmVisualizer
                        currentStep={currentTraceStep}
                        meta={algorithmMeta}
                    />
                ) : (
                    <>
                        <DataCoreView variables={currentTraceStep.globals} key={currentStep}/>
                        <EchoChamberView output={currentTraceStep.output} />
                    </>
                )}
               </>
            );
        }

        return (
             <div className="bg-slate-900/50 rounded-lg p-6 flex items-center justify-center h-full min-h-[300px] border border-blue-500/20 backdrop-blur-sm shadow-lg">
                <div className="text-center">
                    <p className="text-gray-400">Illumination visuals will materialize here.</p>
                </div>
            </div>
        );
    };

    return (
        <div className="text-gray-300 min-h-screen">
            {xpGain && <XpGainIndicator amount={xpGain.amount} key={xpGain.key} />}
            {completedChallengeTitle && (
                <ChallengeCompleteModal 
                    challengeTitle={completedChallengeTitle} 
                    onClose={handleCloseCompletionModal} 
                />
            )}
            {showLevelUp && <LevelUpModal level={userData.level} onClose={handleCloseLevelUpModal} />}
            <Header
                language={language}
                onLanguageChange={handleLanguageChange}
                level={userData.level}
                xp={xpProgress}
                xpForNextLevel={xpForNextLevel}
            />
            <main className="container mx-auto p-4 md:p-6">
                 {code === '' && !isLoading ? (
                    <ChallengeSelector onStartVisualization={handleStartVisualization} completedChallenges={userData.completedChallenges} />
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Left Column */}
                        <div className="flex flex-col gap-4">
                            <SequenceViewer
                                code={code}
                                onCodeChange={setCode}
                                currentLine={currentTraceStep?.line ?? -1}
                                isExecuting={trace.length > 0}
                                title={challengeTitle ? `${language} - ${challengeTitle}` : null}
                                language={language}
                                breakpoints={Array.from(breakpoints)}
                                onToggleBreakpoint={handleToggleBreakpoint}
                            />
                             <Controls
                                onVisualize={() => handleStartAnalysis(false)}
                                onDebug={() => handleStartAnalysis(true)}
                                onPrev={handlePrevStep}
                                onNext={handleNextStep}
                                onContinue={handleContinueDebugging}
                                onReset={handleReset}
                                isLoading={isLoading}
                                currentStep={currentStep}
                                totalSteps={trace.length}
                                isExecuting={trace.length > 0}
                                hasCode={code.length > 0}
                                isDebugging={isDebugging}
                            />
                        </div>

                        {/* Right Column */}
                        <div className="flex flex-col gap-4">
                           {renderContent()}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default App;