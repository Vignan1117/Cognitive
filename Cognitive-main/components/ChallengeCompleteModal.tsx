import React from 'react';
import { TrophyIcon } from './icons';
import { XP_FOR_CHALLENGE_COMPLETION } from '../hooks/useUserData';

interface ChallengeCompleteModalProps {
    challengeTitle: string;
    onClose: () => void;
}

const Confetti: React.FC = () => {
    const confettiPieces = Array.from({ length: 50 }).map((_, i) => {
        const style = {
            left: `${Math.random() * 100}%`,
            animationDuration: `${2 + Math.random() * 3}s`,
            animationDelay: `${Math.random() * 2}s`,
            backgroundColor: ['#22d3ee', '#4ade80', '#facc15', '#f87171', '#a78bfa'][Math.floor(Math.random() * 5)],
        };
        return <div key={i} className="confetti" style={style}></div>;
    });
    return <div className="absolute inset-0 pointer-events-none">{confettiPieces}</div>;
};

const ChallengeCompleteModal: React.FC<ChallengeCompleteModalProps> = ({ challengeTitle, onClose }) => {
    return (
        <div className="modal-backdrop">
            <div className="modal-panel bg-slate-900 border-2 border-amber-400/50 rounded-2xl shadow-2xl shadow-amber-500/20 max-w-lg w-full text-center p-8">
                <Confetti />
                <div className="relative z-10">
                    <div className="flex justify-center mb-4 text-amber-400 w-20 h-20 mx-auto">
                        <TrophyIcon />
                    </div>
                    <h2 className="text-3xl font-bold text-amber-300 font-orbitron text-glow mb-2">Challenge Complete!</h2>
                    <p className="text-gray-300 text-lg mb-6">
                        You've mastered the <span className="font-bold text-white">{challengeTitle}</span> sequence.
                    </p>
                    <div className="bg-black/30 rounded-lg p-4 mb-8 inline-block pulse-xp">
                        <p className="text-2xl font-bold text-cyan-300 font-orbitron">+{XP_FOR_CHALLENGE_COMPLETION} XP</p>
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

export default ChallengeCompleteModal;