

import { GoogleGenAI, Type } from "@google/genai";
import type { ExecutionStep, Language, QuizQuestion, AlgorithmMeta } from '../types';

const API_KEY = process.env.API_KEY;
if (!API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const executionTraceSchema = {
    type: Type.ARRAY,
    items: {
        type: Type.OBJECT,
        properties: {
            line: {
                type: Type.INTEGER,
                description: "The 1-based line number being executed.",
            },
            globals: {
                type: Type.STRING,
                description: "A JSON string representing a dictionary of relevant variables (global, static, or main function scope) and their values at this step. For example: '{\"x\": 5, \"y\": \"hello\"}'. If no variables, return an empty JSON object string '{}'.",
            },
            output: {
                type: Type.STRING,
                description: "The cumulative content of stdout after this line executes. Each print statement adds a new line.",
            },
            explanation: {
                type: Type.STRING,
                description: "A concise, beginner-friendly explanation (max 2 sentences) of what is happening on this line of code. Explain variable assignments, function calls, conditions, and return values.",
            },
            executionTimeMicroseconds: {
                type: Type.INTEGER,
                description: "An estimated, simulated execution time for this single line of code in microseconds. Simple assignments should be low, loops/complex operations higher.",
            },
            memoryUsageBytes: {
                type: Type.INTEGER,
                description: "An estimated, simulated total memory usage in bytes after this line executes. This should reflect the size of all variables in the 'globals' state.",
            },
            highlights: {
                type: Type.OBJECT,
                description: "Optional. Information about what to highlight in a visualizer. For sorting, use 'compare', 'swap'. For searching, use 'range', 'mid', 'found'. The 'indices' array holds the relevant 0-based array indices.",
                properties: {
                    type: {
                        type: Type.STRING,
                        description: "The type of highlight (e.g., 'compare', 'swap', 'range', 'mid', 'found')."
                    },
                    indices: {
                        type: Type.ARRAY,
                        items: { type: Type.INTEGER },
                        description: "An array of 0-based indices to be highlighted."
                    }
                },
                required: ["type", "indices"],
            }
        },
        required: ["line", "globals", "output", "explanation", "executionTimeMicroseconds", "memoryUsageBytes"],
    },
};

const quizQuestionSchema = {
    type: Type.ARRAY,
    items: {
        type: Type.OBJECT,
        properties: {
            question: {
                type: Type.STRING,
                description: "A multiple-choice question about the code's final state, output, or logic.",
            },
            options: {
                type: Type.ARRAY,
                description: "An array of 4 strings representing the possible answers.",
                items: { type: Type.STRING },
            },
            correctAnswerIndex: {
                type: Type.INTEGER,
                description: "The 0-based index of the correct answer in the 'options' array.",
            },
            explanation: {
                type: Type.STRING,
                description: "A brief explanation of why the correct answer is right.",
            },
        },
        required: ["question", "options", "correctAnswerIndex", "explanation"],
    },
};


export async function getExecutionTrace(code: string, language: Language, algorithmMeta: AlgorithmMeta | null): Promise<ExecutionStep[]> {
    
    const basePrompt = `
Act as a ${language} code execution visualizer and performance profiler. Analyze the following ${language} code and generate a step-by-step execution trace.
For each executed line, provide:
1.  'line': The 1-based line number.
2.  'globals': The state of relevant variables (global scope, static class members, or main function's local scope) as a JSON string.
3.  'output': The cumulative stdout content.
4.  'explanation': A simple explanation of the line's operation.
5.  'executionTimeMicroseconds': A *simulated* execution time in microseconds. Simple assignments are fast (e.g., 1-10 µs), function calls or complex operations are slower (e.g., 20-100 µs).
6.  'memoryUsageBytes': A *simulated* total memory usage in bytes, representing the combined size of all variables in the scope after the line executes. (e.g., int=4 bytes, float=8 bytes, char=1 byte, simple string is its length, lists/dicts are sum of parts + overhead).
`;
    
    let algoPromptExtension = '';
    if (algorithmMeta) {
        const { type, dataKey, targetKey } = algorithmMeta;
        
        let instructions = '';
        if (type === 'sort') {
            instructions = `
   - This is a sorting algorithm. The primary data array being sorted is named '${dataKey}'.
   - When comparing two elements in '${dataKey}', use: {"type": "compare", "indices": [index1, index2]}.
   - When swapping two elements in '${dataKey}', use: {"type": "swap", "indices": [index1, index2]}.
   - After the final pass for an element establishing it is sorted, you can omit highlights for it in subsequent steps.`;
        } else if (type === 'search' && targetKey) {
            instructions = `
   - This is a searching algorithm. The primary data array is '${dataKey}' and the target value is in a variable named '${targetKey}'.
   - To show the current search space within '${dataKey}', use: {"type": "range", "indices": [low_index, high_index]}.
   - To show the middle element being checked, use: {"type": "mid", "indices": [mid_index]}.
   - If the target is found, use {"type": "found", "indices": [found_index]}.`;
        }
        
        if (instructions) {
             algoPromptExtension = `
7. 'highlights': (Optional) A JSON object with visualization hints for this ${type} algorithm. If this object is included, it MUST contain 'type' and 'indices' properties.
   ${instructions}
`;
        }
    }


    const finalPrompt = `
${basePrompt}
${algoPromptExtension}

Do not trace into the implementation of built-in functions. Ensure the final trace includes the very last action.

${language} Code:
\`\`\`${language.toLowerCase()}
${code}
\`\`\`
`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-pro",
            contents: finalPrompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: executionTraceSchema,
            },
        });

        const jsonText = response.text.trim();
        const rawTrace = JSON.parse(jsonText) as (Omit<ExecutionStep, 'globals'> & { globals: string })[];

        // The 'globals' property comes back as a string, so we need to parse it.
        const trace = rawTrace.map(step => {
            try {
                return {
                    ...step,
                    globals: JSON.parse(step.globals || '{}'),
                };
            } catch (e) {
                console.error('Failed to parse globals JSON string:', step.globals, e);
                // If parsing fails, return a default value or an error indicator
                return {
                    ...step,
                    globals: { parsing_error: "Invalid JSON from AI" },
                };
            }
        });
        
        return trace;

    } catch (error) {
        console.error("Error calling Gemini API for trace:", error);
        throw new Error("Failed to get execution trace from Gemini API.");
    }
}

export async function getQuizForCode(code: string, language: Language): Promise<QuizQuestion[]> {
     const prompt = `
Act as a programming instructor. Analyze the following ${language} code and generate a short quiz with exactly 3 multiple-choice questions to test a beginner's understanding.

Focus questions on:
1. The final value of a key variable.
2. The final output printed to the console.
3. The overall logic or flow (e.g., how many times a loop runs).

${language} Code:
\`\`\`${language.toLowerCase()}
${code}
\`\`\`
`;
    try {
         const response = await ai.models.generateContent({
            model: "gemini-2.5-pro",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: quizQuestionSchema,
            },
        });
        const jsonText = response.text.trim();
        return JSON.parse(jsonText);
    } catch (error) {
        console.error("Error calling Gemini API for quiz:", error);
        // Return an empty array or a default quiz on failure
        return [];
    }
}