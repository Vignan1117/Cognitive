import React, { useState } from 'react';
import type { QuizQuestion } from '../types';
import { ArrowPathIcon, BrainCircuitIcon, CheckIcon, XMarkIcon } from './icons';

interface MindLockViewProps {
    quiz: QuizQuestion[];
    onComplete: () => void;
    onAnswer: (isCorrect: boolean) => void;
}

const MindLockView: React.FC<MindLockViewProps> = ({ quiz, onComplete, onAnswer }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
    const [showFeedback, setShowFeedback] = useState(false);

    if (quiz.length === 0) {
        return (
             <div className="game-panel h-full flex flex-col justify-center items-center text-center">
                <div className="game-panel-content">
                    <h2 className="text-2xl font-bold text-cyan-300 mb-2 font-orbitron">Sequence Deciphered!</h2>
                    <p className="text-gray-400 mb-4">The AI could not generate a Mind Lock for this sequence.</p>
                    <button onClick={() => onComplete()} className="flex items-center gap-2 text-gray-300 hover:text-cyan-300 font-semibold py-2 px-4 rounded-md transition-colors bg-gray-700/50 hover:bg-gray-600/50">
                        <ArrowPathIcon />
                        Return to Labyrinth
                    </button>
                </div>
            </div>
        )
    }

    const currentQuestion = quiz[currentQuestionIndex];
    const isQuizFinished = currentQuestionIndex >= quiz.length;

    const handleAnswerClick = (index: number) => {
        if (showFeedback) return;
        
        const isCorrect = index === currentQuestion.correctAnswerIndex;
        setSelectedAnswer(index);
        setShowFeedback(true);
        onAnswer(isCorrect);

        if (isCorrect) {
            setCorrectAnswersCount(prev => prev + 1);
        }
    };

    const handleNextQuestion = () => {
        setShowFeedback(false);
        setSelectedAnswer(null);
        setCurrentQuestionIndex(prev => prev + 1);
    };

    if (isQuizFinished) {
        return (
            <div className="game-panel h-full flex flex-col justify-center items-center text-center">
                <div className="game-panel-content">
                    <h2 className="text-2xl font-bold text-cyan-300 mb-2 font-orbitron">Sequence Mastered!</h2>
                    <p className="text-gray-300 text-lg mb-4">
                        Your final cognitive score: <span className="font-bold text-cyan-400 text-2xl">{correctAnswersCount}</span> / <span className="font-bold text-2xl">{quiz.length}</span>
                    </p>
                    <button onClick={() => onComplete()} className="flex items-center gap-2 text-gray-300 hover:text-cyan-300 font-semibold py-2 px-4 rounded-md transition-colors bg-gray-700/50 hover:bg-gray-600/50">
                        <ArrowPathIcon />
                        Return to Labyrinth
                    </button>
                </div>
            </div>
        );
    }


    return (
        <div className="game-panel h-full flex flex-col">
            <div className="game-panel-header text-center">
                 <div className="flex items-center justify-center gap-2 text-cyan-400">
                    <BrainCircuitIcon />
                    <h2 className="text-2xl font-bold text-cyan-300 font-orbitron">Mind Lock</h2>
                </div>
                <p className="text-sm text-gray-400">Challenge {currentQuestionIndex + 1} of {quiz.length}</p>
            </div>
            <div className="game-panel-content flex flex-col flex-grow">
                <p className="text-xl font-semibold text-gray-200 mt-4 text-center">{currentQuestion.question}</p>
            
                <div className="flex-grow space-y-3 my-4">
                    {currentQuestion.options.map((option, index) => {
                        let buttonClass = 'bg-slate-800/50 border-gray-700 hover:bg-slate-700/50 hover:border-cyan-500/50';
                        if (showFeedback) {
                            if (index === currentQuestion.correctAnswerIndex) {
                                buttonClass = 'correct-answer';
                            } else if (index === selectedAnswer) {
                                buttonClass = 'incorrect-answer';
                            }
                        }

                        return (
                            <button
                                key={index}
                                onClick={() => handleAnswerClick(index)}
                                disabled={showFeedback}
                                className={`quiz-option-button w-full text-left p-3 rounded-md border transition-all duration-200 disabled:cursor-not-allowed font-semibold flex items-center justify-between ${buttonClass}`}
                            >
                                <span>{option}</span>
                                <div className="w-5 h-5">
                                    {showFeedback && index === currentQuestion.correctAnswerIndex && <CheckIcon />}
                                    {showFeedback && index === selectedAnswer && index !== currentQuestion.correctAnswerIndex && <XMarkIcon />}
                                </div>
                            </button>
                        );
                    })}
                </div>

                {showFeedback && (
                     <div className="flex-shrink-0 mt-auto p-3 rounded-md bg-black/30 border border-cyan-500/20">
                        <p className="text-sm text-gray-300 text-center">{currentQuestion.explanation}</p>
                    </div>
                )}

                <div className="flex-shrink-0 mt-4 text-right">
                    {showFeedback && (
                        <button onClick={handleNextQuestion} className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-6 rounded-md transition-colors button-glow">
                            {currentQuestionIndex === quiz.length - 1 ? 'Finish' : 'Next'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MindLockView;