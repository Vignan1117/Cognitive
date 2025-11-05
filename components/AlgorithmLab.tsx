import React, { useState } from 'react';
import { ALGORITHMS } from '../constants';
import { BrainCircuitIcon } from './icons';
import type { Language, AlgorithmMeta } from '../types';

interface AlgorithmLabProps {
    onStartVisualization: (code: string, title: string, language: Language, meta: AlgorithmMeta) => void;
}

const AlgorithmLab: React.FC<AlgorithmLabProps> = ({ onStartVisualization }) => {
    const [selectedAlgorithm, setSelectedAlgorithm] = useState(ALGORITHMS[0]);
    const [arrayData, setArrayData] = useState<number[] | null>(null);

    const generateRandomArray = (size = 10, maxVal = 100) => {
        return Array.from({ length: size }, () => Math.floor(Math.random() * maxVal) + 1);
    };

    const handleSelectAlgorithm = (algo: typeof ALGORITHMS[0]) => {
        setSelectedAlgorithm(algo);
        setArrayData(null); // Reset array when switching algorithm
    };

    const handleStart = () => {
        let code = selectedAlgorithm.code;
        const data = arrayData || (selectedAlgorithm.meta.type === 'sort' ? [64, 34, 25, 12, 22, 11, 90] : [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]);

        // Inject the generated data into the code
        const arrayString = `[${data.join(', ')}]`;
        code = code.replace(/arr = \[.*?\]/, `arr = ${arrayString}`);

        onStartVisualization(code, selectedAlgorithm.title, selectedAlgorithm.language, selectedAlgorithm.meta);
    };

    const categories = [...new Set(ALGORITHMS.map(a => a.category))];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
                <h3 className="text-lg font-semibold text-cyan-300 font-orbitron mb-3">Select Algorithm</h3>
                <div className="space-y-2">
                    {categories.map(category => (
                        <div key={category}>
                            <p className="text-sm font-bold text-gray-400 px-2">{category}</p>
                            {ALGORITHMS.filter(a => a.category === category).map(algo => (
                                <button
                                    key={algo.title}
                                    onClick={() => handleSelectAlgorithm(algo)}
                                    className={`w-full text-left px-3 py-2 rounded-md text-sm font-semibold transition-colors ${
                                        selectedAlgorithm.title === algo.title
                                            ? 'bg-cyan-500/20 text-cyan-300'
                                            : 'text-gray-300 hover:bg-slate-700/50'
                                    }`}
                                >
                                    {algo.title}
                                </button>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
            <div className="md:col-span-2 bg-slate-900/30 p-6 rounded-lg border border-cyan-500/10">
                <h2 className="text-2xl font-bold text-glow text-cyan-300 font-orbitron">{selectedAlgorithm.title}</h2>
                <p className="text-gray-400 mt-2 mb-4 text-sm">{selectedAlgorithm.description}</p>
                
                {selectedAlgorithm.meta.type === 'sort' && (
                    <div className="mb-4">
                        <button
                            onClick={() => setArrayData(generateRandomArray())}
                            className="bg-slate-700 hover:bg-slate-600 text-cyan-300 font-semibold py-2 px-4 rounded-md text-sm transition-colors"
                        >
                            Randomize Array
                        </button>
                    </div>
                )}
                
                <div className="bg-black/30 p-3 rounded-md mb-6 min-h-[50px]">
                    <p className="font-mono text-sm text-gray-300">
                       {`Data: [${(arrayData || (selectedAlgorithm.meta.type === 'sort' ? [64, 34, 25, 12, 22, 11, 90] : [2, 5, 8, 12, 16, 23, 38, 56, 72, 91])).join(', ')}]`}
                    </p>
                </div>

                <div className="flex justify-end">
                    <button
                        onClick={handleStart}
                        className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-6 rounded-md transition-all duration-300 text-lg button-glow font-orbitron"
                    >
                        <BrainCircuitIcon />
                        Visualize
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AlgorithmLab;