import React, { useRef, useEffect } from 'react';
import type { Language } from '../types';

// Extend the Window interface to include the Monaco environment
declare global {
    interface Window {
        require: any;
        monaco: any;
    }
}

interface SequenceViewerProps {
    code: string;
    onCodeChange: (newCode: string) => void;
    currentLine: number;
    isExecuting: boolean;
    title: string | null;
    language: Language | null;
    breakpoints: number[];
    onToggleBreakpoint: (lineNumber: number) => void;
}

const languageMap: Record<Language, string> = {
    'Python': 'python',
    'JavaScript': 'javascript',
    'Java': 'java',
    'C': 'c',
    'C#': 'csharp',
    'Ruby': 'ruby',
};

const SequenceViewer: React.FC<SequenceViewerProps> = ({ code, onCodeChange, currentLine, isExecuting, title, language, breakpoints, onToggleBreakpoint }) => {
    const editorContainerRef = useRef<HTMLDivElement>(null);
    const editorRef = useRef<any>(null);
    const decorationsRef = useRef<string[]>([]);
    const breakpointDecorationsRef = useRef<string[]>([]);

    useEffect(() => {
        if (editorContainerRef.current) {
            window.require.config({ paths: { 'vs': 'https://cdn.jsdelivr.net/npm/monaco-editor@0.49.0/min/vs' } });
            window.require(['vs/editor/editor.main'], () => {
                window.monaco.editor.defineTheme('cognitive-dark', {
                    base: 'vs-dark',
                    inherit: true,
                    rules: [],
                    colors: {
                        'editor.background': '#00000000',
                    },
                });

                const editor = window.monaco.editor.create(editorContainerRef.current!, {
                    value: code,
                    language: language ? languageMap[language] : 'plaintext',
                    theme: 'cognitive-dark',
                    automaticLayout: true,
                    readOnly: isExecuting,
                    minimap: { enabled: false },
                    wordWrap: 'on',
                    fontFamily: 'monospace',
                    fontSize: 14,
                    renderLineHighlight: 'none',
                    glyphMargin: true,
                });
                
                editor.onDidChangeModelContent(() => {
                    if (!editor.getOptions().get(window.monaco.editor.EditorOption.readOnly)) {
                        onCodeChange(editor.getValue());
                    }
                });

                editor.onMouseDown((event: any) => {
                    const { target } = event;
                    if (target.type === window.monaco.editor.MouseTargetType.GUTTER_GLYPH_MARGIN && target.position) {
                        onToggleBreakpoint(target.position.lineNumber);
                    }
                });

                editorRef.current = editor;
            });
        }

        return () => {
            if (editorRef.current) {
                editorRef.current.dispose();
                editorRef.current = null;
            }
        };
    }, []);

    useEffect(() => {
        if (editorRef.current) {
            editorRef.current.updateOptions({ readOnly: isExecuting });
            if (language) {
                window.monaco.editor.setModelLanguage(editorRef.current.getModel(), languageMap[language]);
            }
        }
    }, [isExecuting, language]);

    useEffect(() => {
        if (editorRef.current) {
             decorationsRef.current = editorRef.current.deltaDecorations(
                decorationsRef.current,
                isExecuting && currentLine > 0
                    ? [{
                          range: new window.monaco.Range(currentLine, 1, currentLine, 1),
                          options: {
                              isWholeLine: true,
                              className: 'line-highlight-monaco',
                          },
                      }]
                    : []
            );
             if (isExecuting && currentLine > 0) {
                editorRef.current.revealLineInCenterIfOutsideViewport(currentLine, window.monaco.editor.ScrollType.Smooth);
            }
        }
    }, [currentLine, isExecuting]);

    useEffect(() => {
        if (editorRef.current) {
            const newDecorations = breakpoints.map(line => ({
                range: new window.monaco.Range(line, 1, line, 1),
                options: {
                    isWholeLine: false,
                    glyphMarginClassName: 'breakpoint-marker',
                }
            }));
            breakpointDecorationsRef.current = editorRef.current.deltaDecorations(breakpointDecorationsRef.current, newDecorations);
        }
    }, [breakpoints]);


    return (
        <div className="game-panel flex flex-col h-[400px] lg:h-auto lg:min-h-[400px]">
            <div className="game-panel-header">
                <h2 className="text-lg font-semibold text-cyan-300 tracking-wider font-orbitron">
                    {title || 'Sequence Matrix'}
                </h2>
            </div>
            <div ref={editorContainerRef} className="flex-grow w-full p-2 game-panel-content"></div>
        </div>
    );
};

export default SequenceViewer;