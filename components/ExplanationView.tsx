import React from 'react';
import { BrainCircuitIcon } from './icons';

interface CognitiveAnalysisViewProps {
    explanation: string;
}

const CognitiveAnalysisView: React.FC<CognitiveAnalysisViewProps> = ({ explanation }) => {
    return (
        <div className="game-panel">
            <div className="game-panel-header flex items-center gap-2">
                <BrainCircuitIcon />
                <h3 className="text-lg font-semibold text-cyan-300 tracking-wider font-orbitron">Cognitive Analysis</h3>
            </div>
            <div className="game-panel-content">
                <p className="text-gray-300">{explanation}</p>
            </div>
        </div>
    );
};

export default CognitiveAnalysisView;