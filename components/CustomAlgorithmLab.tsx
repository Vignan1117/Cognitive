
import React, { useState } from 'react';
import type { Language, AlgorithmMeta } from '../types';
import { LANGUAGES } from '../constants';
import SequenceViewer from './CodeEditor';
import { BrainCircuitIcon } from './icons';

interface CustomAlgorithmLabProps {
    onStartVisualization: (code: string, title: string, language: Language, meta: AlgorithmMeta) => void;
}

const CustomAlgorithmLab: React.FC<CustomAlgorithmLabProps> = ({ onStartVisualization }) => {
    const [code, setCode] = useState('// Your algorithm logic here.\n// The data array will be injected automatically based on the metadata you provide.');
    const [language, setLanguage] = useState<Language>('Python');
    const [meta, setMeta] = useState<AlgorithmMeta>({ type: 'sort', dataKey: 'arr' });
    const [initialData, setInitialData] = useState('64, 34, 25, 12, 22, 11, 90');

    const generateRandomArray = (size = 10, maxVal = 100) => {
        return Array.from({ length: size }, () => Math.floor(Math.random() * maxVal) + 1).join(', ');
    };
    
    const handleVisualize = () => {
        if (!code.trim() || !meta.dataKey.trim() || (meta.type === 'search' && !meta.targetKey?.trim())) {
            // Add user feedback for invalid inputs
            return;
        }

        let dataInjection: string;
        switch (language) {
            case 'Python':
            case 'Ruby':
                dataInjection = `${meta.dataKey} = [${initialData}]`;
                break;
            case 'JavaScript':
                dataInjection = `let ${meta.dataKey} = [${initialData}];`;
                break;
            case 'Java':
                dataInjection = `int[] ${meta.dataKey} = new int[]{${initialData}};`;
                break;
            case 'C':
                dataInjection = `int ${meta.dataKey}[] = {${initialData}};`;
                break;
            case 'C#':
                dataInjection = `var ${meta.dataKey} = new int[] {${initialData}};`;
                break;
            default:
                dataInjection = '';
        }

        const finalCode = `${dataInjection}\n${code}`;
        
        onStartVisualization(finalCode, 'Custom Algorithm', language, meta);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1 flex flex-col gap-4">
                <div className="bg-slate-900/30 p-4 rounded-lg border border-cyan-500/10">
                    <h3 className="text-lg font-semibold text-cyan-300 font-orbitron mb-3">Algorithm Metadata</h3>
                    <div className="space-y-4">
                         <div>
                            <label htmlFor="language" className="block text-sm font-medium text-gray-400 mb-1">Language</label>
                            <select
                                id="language"
                                value={language}
                                onChange={(e) => setLanguage(e.target.value as Language)}
                                className="w-full bg-slate-800 border border-slate-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm"
                            >
                                {LANGUAGES.map(lang => <option key={lang} value={lang}>{lang}</option>)}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="algo-type" className="block text-sm font-medium text-gray-400 mb-1">Algorithm Type</label>
                            <select
                                id="algo-type"
                                value={meta.type}
                                onChange={(e) => setMeta({ ...meta, type: e.target.value as 'sort' | 'search', targetKey: e.target.value === 'sort' ? undefined : meta.targetKey })}
                                className="w-full bg-slate-800 border border-slate-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm"
                            >
                                <option value="sort">Sorting</option>
                                <option value="search">Searching</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="data-key" className="block text-sm font-medium text-gray-400 mb-1">Data Variable Name</label>
                            <input
                                id="data-key"
                                type="text"
                                value={meta.dataKey}
                                onChange={(e) => setMeta({ ...meta, dataKey: e.target.value })}
                                className="w-full bg-slate-800 border border-slate-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm font-mono"
                                placeholder="e.g., arr, myList"
                            />
                        </div>
                        {meta.type === 'search' && (
                             <div>
                                <label htmlFor="target-key" className="block text-sm font-medium text-gray-400 mb-1">Target Variable Name</label>
                                <input
                                    id="target-key"
                                    type="text"
                                    value={meta.targetKey || ''}
                                    onChange={(e) => setMeta({ ...meta, targetKey: e.target.value })}
                                    className="w-full bg-slate-800 border border-slate-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm font-mono"
                                    placeholder="e.g., target, value"
                                />
                            </div>
                        )}
                    </div>
                </div>

                 <div className="bg-slate-900/30 p-4 rounded-lg border border-cyan-500/10">
                    <h3 className="text-lg font-semibold text-cyan-300 font-orbitron mb-3">Input Data</h3>
                     <div>
                        <label htmlFor="initial-data" className="block text-sm font-medium text-gray-400 mb-1">Initial Array (comma-separated)</label>
                        <textarea
                            id="initial-data"
                            value={initialData}
                            onChange={(e) => setInitialData(e.target.value)}
                            rows={3}
                            className="w-full bg-slate-800 border border-slate-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm font-mono"
                        />
                    </div>
                    <button
                        onClick={() => setInitialData(generateRandomArray())}
                        className="mt-2 bg-slate-700 hover:bg-slate-600 text-cyan-300 font-semibold py-1.5 px-3 rounded-md text-sm transition-colors w-full"
                    >
                        Randomize
                    </button>
                 </div>
            </div>
            <div className="md:col-span-2 flex flex-col gap-4">
                <div className="flex-grow h-[450px]">
                    <SequenceViewer
                        className="h-full !min-h-0"
                        code={code}
                        onCodeChange={setCode}
                        language={language}
                        isExecuting={false}
                        currentLine={-1}
                        title={`Custom Algorithm Designer (${language})`}
                        breakpoints={[]}
                        onToggleBreakpoint={() => {}}
                    />
                </div>
                 <div className="flex justify-end">
                    <button
                        onClick={handleVisualize}
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

export default CustomAlgorithmLab;
