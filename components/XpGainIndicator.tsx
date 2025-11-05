import React from 'react';

interface XpGainIndicatorProps {
    amount: number;
}

const XpGainIndicator: React.FC<XpGainIndicatorProps> = ({ amount }) => {
    return (
        <div 
            className="xp-gain-indicator absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl font-bold text-cyan-300 text-glow font-orbitron z-50 pointer-events-none"
        >
            +{amount} XP
        </div>
    );
};

export default XpGainIndicator;