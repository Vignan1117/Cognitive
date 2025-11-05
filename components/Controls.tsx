import React from 'react';
import { PlayIcon, BackwardIcon, ForwardIcon, ArrowPathIcon, BugAntIcon, PlayPauseIcon, BrainCircuitIcon } from './icons';

interface ControlsProps {
    onVisualize: () => void;
    onDebug: () => void;
    onPrev: () => void;
    onNext: () => void;
    onContinue: () => void;
    onReset: () => void;
    isLoading: boolean;
    currentStep: number;
    totalSteps: number;
    isExecuting: boolean;
    isDebugging: boolean;
    hasCode: boolean;
}

const Controls: React.FC<ControlsProps> = ({
    onVisualize,
    onDebug,
    onPrev,
    onNext,
    onContinue,
    onReset,
    isLoading,
    currentStep,
    totalSteps,
    isExecuting,
    isDebugging,
    hasCode
}) => {

    const renderStartControls = () => (
        <div className="flex items-center gap-4">
            <button
                onClick={onVisualize}
                disabled={isLoading || !hasCode}
                className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 disabled:bg-cyan-800/50 disabled:cursor-not-allowed disabled:text-gray-400 text-white font-bold py-2 px-6 rounded-md transition-all duration-300 text-lg button-glow font-orbitron"
            >
                {isLoading ? 'Illuminating...' : <><BrainCircuitIcon /> Illuminate</>}
            </button>
             <button
                onClick={onDebug}
                disabled={isLoading || !hasCode}
                className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800/50 disabled:cursor-not-allowed disabled:text-gray-400 text-white font-bold py-2 px-6 rounded-md transition-all duration-300 text-lg button-glow font-orbitron"
            >
                {isLoading ? 'Probing...' : <><BugAntIcon /> Probe</>}
            </button>
        </div>
    );

    const renderVisualizeControls = () => (
         <div className="flex items-center gap-4">
            <button
                onClick={onPrev}
                disabled={currentStep === 0}
                className="p-2 rounded-full bg-blue-900/50 hover:bg-blue-800/70 border border-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Previous Step"
            >
                <BackwardIcon />
            </button>
            <span className="font-mono text-gray-300 text-sm">
                Step {currentStep + 1} / {totalSteps}
            </span>
            <button
                onClick={onNext}
                disabled={currentStep >= totalSteps - 1}
                className="p-2 rounded-full bg-blue-900/50 hover:bg-blue-800/70 border border-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Next Step"
            >
                <ForwardIcon />
            </button>
        </div>
    );
    
    const renderDebugControls = () => (
         <div className="flex items-center gap-4">
            <button
                onClick={onContinue}
                disabled={currentStep >= totalSteps - 1}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-green-800/50 disabled:cursor-not-allowed disabled:text-gray-400 text-white font-bold py-2 px-4 rounded-md transition-all duration-300 button-glow"
            >
                <PlayPauseIcon /> Continue
            </button>
             <button
                onClick={onNext}
                disabled={currentStep >= totalSteps - 1}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800/50 disabled:cursor-not-allowed disabled:text-gray-400 text-white font-bold py-2 px-4 rounded-md transition-all duration-300 button-glow"
            >
                <ForwardIcon /> Step Forward
            </button>
        </div>
    );


    return (
        <div className="game-panel">
            <div className="flex items-center justify-between p-4">
                {!isExecuting && renderStartControls()}
                {isExecuting && !isDebugging && renderVisualizeControls()}
                {isExecuting && isDebugging && renderDebugControls()}
                
                {hasCode && (
                    <button
                        onClick={onReset}
                        className="flex items-center gap-2 text-gray-400 hover:text-cyan-300 font-semibold py-2 px-4 rounded-md transition-colors"
                    >
                        <ArrowPathIcon />
                        {isExecuting ? 'Stop & Reset' : 'Enter Labyrinth'}
                    </button>
                )}
            </div>
        </div>
    );
};

export default Controls;