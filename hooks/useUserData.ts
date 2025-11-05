import { useState, useEffect, useCallback } from 'react';
import type { UserData, Language } from '../types';
import { LANGUAGES } from '../constants';

const USER_DATA_KEY = 'cognitiveLabyrinthUserData';

export const XP_PER_CORRECT_ANSWER = 10;
export const XP_FOR_CHALLENGE_COMPLETION = 25;

const getInitialUserData = (): UserData => {
    const emptyData: UserData = {
        level: 1,
        xp: 0,
        completedChallenges: Object.fromEntries(
            LANGUAGES.map(lang => [lang, []])
        ) as Record<Language, string[]>
    };

    try {
        const savedData = localStorage.getItem(USER_DATA_KEY);
        if (savedData) {
            const parsedData = JSON.parse(savedData);
            // Basic validation and migration if shape is old
            if (parsedData.level && typeof parsedData.xp !== 'undefined' && parsedData.completedChallenges) {
                 // ensure all languages are present
                for (const lang of LANGUAGES) {
                    if (!parsedData.completedChallenges[lang]) {
                        parsedData.completedChallenges[lang] = [];
                    }
                }
                return parsedData;
            }
        }
    } catch (error) {
        console.error("Failed to load user data:", error);
    }
    return emptyData;
};

// XP required to reach the *next* level from the current one.
export const getXpForNextLevel = (level: number): number => {
    return 100 + (level - 1) * 50;
};

const calculateLevel = (xp: number): { level: number; xpForCurrentLevel: number; xpForNextLevel: number; } => {
    let level = 1;
    let xpForCurrentLevel = 0;
    let xpNeeded = getXpForNextLevel(level);

    while (xp >= xpForCurrentLevel + xpNeeded) {
        xpForCurrentLevel += xpNeeded;
        level++;
        xpNeeded = getXpForNextLevel(level);
    }

    return { level, xpForCurrentLevel, xpForNextLevel: xpNeeded };
};


export const useUserData = () => {
    const [userData, setUserData] = useState<UserData>(getInitialUserData);

    useEffect(() => {
        try {
            localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
        } catch (error) {
            console.error("Failed to save user data:", error);
        }
    }, [userData]);

    const addXp = useCallback((amount: number) => {
        setUserData(prevData => {
            const newXp = prevData.xp + amount;
            const { level } = calculateLevel(newXp);
            return { ...prevData, xp: newXp, level };
        });
    }, []);

    const completeChallenge = useCallback((language: Language, title: string) => {
        setUserData(prevData => {
            const completed = new Set(prevData.completedChallenges[language]);
            if (completed.has(title)) {
                return prevData; // Already completed, do nothing.
            }
            completed.add(title);
            
            const newCompletedChallenges = {
                ...prevData.completedChallenges,
                [language]: Array.from(completed)
            };

            return { ...prevData, completedChallenges: newCompletedChallenges };
        });
    }, []);

    const levelInfo = calculateLevel(userData.xp);
    const xpProgress = userData.xp - levelInfo.xpForCurrentLevel;

    return {
        userData,
        addXp,
        completeChallenge,
        xpProgress,
        xpForNextLevel: levelInfo.xpForNextLevel
    };
};
