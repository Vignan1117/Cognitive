import React from 'react';

interface EchoChamberViewProps {
    output: string;
}

const EchoChamberView: React.FC<EchoChamberViewProps> = ({ output }) => {
    return (
        <div className="game-panel flex flex-col">
            <div className="game-panel-header">
                <h3 className="text-lg font-semibold text-cyan-300 tracking-wider font-orbitron">Echo Chamber</h3>
            </div>
            <div className="game-panel-content flex-grow">
                <pre className="font-mono text-sm text-gray-300 whitespace-pre-wrap break-words min-h-[50px]">
                    {output || <span className="text-gray-500">No echo detected.</span>}
                </pre>
            </div>
        </div>
    );
};

export default EchoChamberView;