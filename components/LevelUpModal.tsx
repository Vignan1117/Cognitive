import React from 'react';
import { SparklesIcon } from './icons';

const Sparkles: React.FC = () => {
    const sparklePieces = Array.from({ length: 50 }).map((_, i) => {
        const style = {
            left: `${Math.random() * 100}%`,
            animationDuration: `${2 + Math.random() * 3}s`,
            animationDelay: `${Math.random() * 3}s`,
        };
        return <div key={i} className="sparkle" style={style}></div>;
    });
    return <div className="absolute inset-0 pointer-events-none overflow-hidden">{sparklePieces}</div>;
};

interface LevelUpModalProps {
    level: number;
    onClose: () => void;
}

const LevelUpModal: React.FC<LevelUpModalProps> = ({ level, onClose }) => {
    return (
        <div className="modal-backdrop">
            <div className="modal-panel bg-slate-900 border-2 border-cyan-400/50 rounded-2xl shadow-2xl shadow-cyan-500/20 max-w-md w-full text-center p-8">
                <Sparkles />
                <div className="relative z-10">
                    <div className="flex justify-center mb-4 text-cyan-400 w-16 h-16 mx-auto animate-pulse">
                        <SparklesIcon className="w-16 h-16 text-cyan-400"/>
                    </div>
                    <h2 className="text-4xl font-bold text-cyan-300 font-orbitron text-glow mb-4">LEVEL UP!</h2>
                    
                    <div className="pulse-level text-8xl font-bold text-white font-orbitron mb-8">
                        {level}
                    </div>
                    
                    <div>
                        <button
                            onClick={onClose}
                            className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-8 rounded-md transition-all duration-300 text-lg button-glow font-orbitron"
                        >
                            Continue
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LevelUpModal;