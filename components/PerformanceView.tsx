import React from 'react';
import type { ExecutionStep } from '../types';
import { ClockIcon, CpuChipIcon } from './icons';

interface PerformanceViewProps {
    trace: ExecutionStep[];
    currentStepIndex: number;
}

const PerformanceChart: React.FC<{
    data: number[];
    currentIndex: number;
    barColor: string;
}> = ({ data, currentIndex, barColor }) => {
    const maxVal = Math.max(...data, 1); // Avoid division by zero
    return (
        <div className="flex items-end h-12 w-full bg-slate-900/30 rounded-md p-1 gap-px">
            {data.map((value, index) => (
                <div
                    key={index}
                    className={`flex-1 rounded-t-sm transition-all duration-200 ${
                        index === currentIndex ? barColor : 'bg-gray-700/50 hover:bg-gray-600/50'
                    }`}
                    style={{ height: `${(value / maxVal) * 100}%` }}
                    title={`Step ${index + 1}: ${value}`}
                />
            ))}
        </div>
    );
};


const PerformanceView: React.FC<PerformanceViewProps> = ({ trace, currentStepIndex }) => {
    const currentStep = trace[currentStepIndex];
    if (!currentStep) return null;

    const timeData = trace.map(t => t.executionTimeMicroseconds);
    const memoryData = trace.map(t => t.memoryUsageBytes);

    return (
        <div className="game-panel">
            <div className="game-panel-header">
                <h3 className="text-lg font-semibold text-cyan-300 tracking-wider font-orbitron">Efficiency Metrics</h3>
            </div>
            <div className="game-panel-content space-y-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                        <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                           <ClockIcon />
                           <span>Exec. Time</span>
                        </div>
                        <p className="text-xl font-bold text-teal-300">{currentStep.executionTimeMicroseconds} µs</p>
                    </div>
                    <div>
                        <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                           <CpuChipIcon/>
                           <span>Memory Usage</span>
                        </div>
                        <p className="text-xl font-bold text-indigo-300">{currentStep.memoryUsageBytes} bytes</p>
                    </div>
                </div>
                 <div>
                    <p className="text-xs text-gray-500 mb-1">Time Profile</p>
                    <PerformanceChart data={timeData} currentIndex={currentStepIndex} barColor="bg-teal-400" />
                </div>
                 <div>
                    <p className="text-xs text-gray-500 mb-1">Memory Profile</p>
                    <PerformanceChart data={memoryData} currentIndex={currentStepIndex} barColor="bg-indigo-400" />
                </div>
            </div>
        </div>
    );
};

export default PerformanceView;