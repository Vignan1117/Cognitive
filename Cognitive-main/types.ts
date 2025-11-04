
export interface ExecutionStep {
    line: number;
    globals: Record<string, any>;
    output: string;
    explanation: string;
    executionTimeMicroseconds: number;
    memoryUsageBytes: number;
}

export interface Example {
    title: string;
    code: string;
}

export interface Difficulty {
    name: string;
    examples: Example[];
}

export type Language = 'Python' | 'JavaScript' | 'Java' | 'C' | 'C#' | 'Ruby';

export interface QuizQuestion {
    question: string;
    options: string[];
    correctAnswerIndex: number;
    explanation: string;
}

export interface UserData {
    level: number;
    xp: number;
    completedChallenges: Record<Language, string[]>;
}
