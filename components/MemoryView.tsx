import React, { useState, useEffect, useMemo } from 'react';

interface DataCoreViewProps {
    variables: Record<string, any>;
}

const getVariableType = (value: any) => {
    if (value === null) return 'null';
    if (Array.isArray(value)) return 'array';
    return typeof value;
}

const typeStyles: Record<string, string> = {
    string: 'text-emerald-300 border-emerald-500/50',
    number: 'text-sky-300 border-sky-500/50',
    boolean: 'text-fuchsia-400 border-fuchsia-500/50',
    object: 'text-amber-300 border-amber-500/50',
    array: 'text-indigo-300 border-indigo-500/50',
    null: 'text-gray-500 border-gray-600/50',
    undefined: 'text-gray-500 border-gray-600/50'
};

const DataOrb: React.FC<{ name: string; value: any; isNew: boolean; hasChanged: boolean }> = ({ name, value, isNew, hasChanged }) => {
    const type = getVariableType(value);
    const style = typeStyles[type] || 'text-gray-300 border-gray-500/50';

    const renderValue = (val: any) => {
        if (typeof val === 'string') return `"${val}"`;
        if (typeof val === 'boolean' || val === null || typeof val === 'undefined') return String(val);
        if (Array.isArray(val)) return `[${val.length > 3 ? `${val.slice(0, 3).join(', ')}...` : val.join(', ')}]`;
        if (typeof val === 'object' && val !== null) {
             const keys = Object.keys(val);
             return `{${keys.length > 2 ? `${keys.slice(0, 2).join(', ')}...` : keys.join(', ')} }`;
        }
        return String(val);
    };

    return (
        <div className={`data-orb p-2 border rounded-lg bg-slate-800/50 flex flex-col items-center justify-center text-center w-32 h-24 ${style} ${hasChanged ? 'data-orb-pulse' : ''}`}>
            <div className="text-sm font-bold text-cyan-300 truncate w-full" title={name}>{name}</div>
            <div className="text-lg font-mono font-bold mt-1 truncate w-full" title={renderValue(value)}>{renderValue(value)}</div>
            <div className="text-xs mt-1 opacity-70">{type}</div>
        </div>
    );
};

const useVariableTracking = (variables: Record<string, any>) => {
    const [prevVars, setPrevVars] = useState<Record<string, any>>({});
    const [newVars, setNewVars] = useState<Set<string>>(new Set());
    const [changedVars, setChangedVars] = useState<Set<string>>(new Set());
    
    useEffect(() => {
        const currentKeys = Object.keys(variables);
        const prevKeys = Object.keys(prevVars);

        const newKeys = new Set(currentKeys.filter(k => !prevKeys.includes(k)));
        const changedKeys = new Set(currentKeys.filter(k => prevKeys.includes(k) && JSON.stringify(variables[k]) !== JSON.stringify(prevVars[k])));

        setNewVars(newKeys);
        setChangedVars(changedKeys);

        const timer = setTimeout(() => {
            setNewVars(new Set());
            setChangedVars(new Set());
        }, 1000); // Reset after animation duration

        setPrevVars(variables);

        return () => clearTimeout(timer);
    }, [variables]);

    return { newVars, changedVars };
};


const DataCoreView: React.FC<DataCoreViewProps> = ({ variables }) => {
    const { newVars, changedVars } = useVariableTracking(variables);
    
    return (
        <div className="game-panel flex flex-col h-[400px]">
            <div className="game-panel-header">
                <h3 className="text-lg font-semibold text-cyan-300 tracking-wider font-orbitron">Data Core</h3>
            </div>
            <div className="game-panel-content flex-grow overflow-auto">
                {Object.keys(variables).length > 0 ? (
                    <div className="flex flex-wrap gap-4 justify-center items-start">
                         {Object.entries(variables).map(([name, value]) => (
                            <DataOrb
                                key={name}
                                name={name}
                                value={value}
                                isNew={newVars.has(name)}
                                hasChanged={changedVars.has(name)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-gray-500">Data Core is dormant.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DataCoreView;