import React from 'react';
import type { ExecutionStep, AlgorithmMeta } from '../types';

interface AlgorithmVisualizerProps {
    currentStep: ExecutionStep;
    meta: AlgorithmMeta;
}

const SortVisualizer: React.FC<{ currentStep: ExecutionStep; meta: AlgorithmMeta }> = ({ currentStep, meta }) => {
    const data = currentStep.globals[meta.dataKey] as number[] || [];
    const highlights = currentStep.highlights;
    const maxVal = Math.max(...data, 1);

    return (
        <div className="algo-bar-container">
            {data.map((value, index) => {
                let className = 'algo-bar';
                if (highlights?.indices.includes(index)) {
                    if (highlights.type === 'compare') className += ' comparing';
                    else if (highlights.type === 'swap') className += ' swapping';
                }
                
                // A simple heuristic for sorted status in bubble sort
                if (currentStep.globals.i !== undefined && index >= data.length - currentStep.globals.i) {
                     className += ' sorted';
                }

                return (
                    <div key={index} className={className} style={{ height: `${(value / maxVal) * 95 + 5}%` }}>
                        {data.length < 20 && <span className="algo-bar-value">{value}</span>}
                    </div>
                );
            })}
        </div>
    );
};

const SearchVisualizer: React.FC<{ currentStep: ExecutionStep; meta: AlgorithmMeta }> = ({ currentStep, meta }) => {
    const data = currentStep.globals[meta.dataKey] as number[] || [];
    const target = currentStep.globals[meta.targetKey!] as number;
    const { low, high, mid, result } = currentStep.globals;
    const highlights = currentStep.highlights;

    return (
         <div className="algo-cell-container">
            {data.map((value, index) => {
                let className = 'algo-cell';
                if (highlights?.type === 'range' && index >= highlights.indices[0] && index <= highlights.indices[1]) {
                    className += ' in-range';
                }
                if (highlights?.type === 'mid' && index === highlights.indices[0]) {
                    className += ' mid';
                }
                if (result !== -1 && index === result && (currentStep.line === 9 || currentStep.line === 18)) { // Found line
                     className += ' found';
                }
                
                return (
                    <div key={index} className={className}>
                        {value}
                        {highlights?.type === 'mid' && index === highlights.indices[0] && <span className="algo-cell-pointer">mid</span>}
                    </div>
                );
            })}
        </div>
    );
}

const AlgorithmVisualizer: React.FC<AlgorithmVisualizerProps> = ({ currentStep, meta }) => {
    const renderVisualizer = () => {
        switch (meta.type) {
            case 'sort':
                return <SortVisualizer currentStep={currentStep} meta={meta} />;
            case 'search':
                return <SearchVisualizer currentStep={currentStep} meta={meta} />;
            default:
                return <p className="text-gray-500">Visualizer not available for this type.</p>;
        }
    };

    return (
        <div className="game-panel flex flex-col h-[400px]">
            <div className="game-panel-header">
                <h3 className="text-lg font-semibold text-cyan-300 tracking-wider font-orbitron">Algorithm Visualizer</h3>
            </div>
            <div className="game-panel-content flex-grow overflow-auto flex items-center justify-center">
                {renderVisualizer()}
            </div>
        </div>
    );
};

export default AlgorithmVisualizer;