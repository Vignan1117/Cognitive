import React from 'react';

export const PlayIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
        <path d="M6.3 2.841A1.5 1.5 0 0 0 4 4.11V15.89a1.5 1.5 0 0 0 2.3 1.269l9.344-5.89a1.5 1.5 0 0 0 0-2.538L6.3 2.841Z" />
    </svg>
);

export const BackwardIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
        <path fillRule="evenodd" d="M17 10a.75.75 0 0 1-.75.75H5.612l4.158 3.96a.75.75 0 1 1-1.04 1.08l-5.5-5.25a.75.75 0 0 1 0-1.08l5.5-5.25a.75.75 0 1 1 1.04 1.08L5.612 9.25H16.25A.75.75 0 0 1 17 10Z" clipRule="evenodd" />
    </svg>
);

export const ForwardIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
        <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
    </svg>
);

export const ArrowPathIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
        <path fillRule="evenodd" d="M15.312 11.342a1.25 1.25 0 0 1 .938 2.312A7.5 7.5 0 0 1 3.75 12a.75.75 0 0 1 1.5 0 6 6 0 0 0 10.9-3.26.75.75 0 0 1 .75-.75Zm-12.824-3.a1.25 1.25 0 0 1-1.25-1.25A7.5 7.5 0 0 1 16.25 8a.75.75 0 0 1-1.5 0 6 6 0 0 0-10.9 3.26.75.75 0 0 1-.488.732Z" clipRule="evenodd" />
    </svg>
);

export const SparklesIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.393c-.842.069-1.17.986-.56 1.558l3.479 3.045-1.006 4.637c-.19 1.15.744 1.85 1.63 1.25l4.254-2.506 4.253 2.506c.886.6 1.82-.1 1.63-1.25l-1.006-4.637 3.479-3.045c.61-.572.282-1.489-.56-1.558l-4.753-.393-1.83-4.401Z" clipRule="evenodd" />
    </svg>
);

export const ChevronRightIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 text-gray-500">
        <path fillRule="evenodd" d="M6.22 3.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L9.94 8 6.22 4.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
    </svg>
);

export const ChevronDownIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className={className || "w-4 h-4 text-gray-400"}>
        <path fillRule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
    </svg>
);

export const MagnifyingGlassIcon: React.FC = () => (
     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 text-gray-400">
        <path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" />
    </svg>
);

export const ClockIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-teal-300">
      <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-13a.75.75 0 0 0-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 0 0 0-1.5h-3.25V5Z" clipRule="evenodd" />
    </svg>
);

export const CpuChipIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-indigo-300">
      <path d="M10.75 1.25a.75.75 0 0 0-1.5 0v2.5h-2.5a.75.75 0 0 0 0 1.5h2.5v2.5a.75.75 0 0 0 1.5 0v-2.5h2.5a.75.75 0 0 0 0-1.5h-2.5V1.25Z" />
      <path fillRule="evenodd" d="M3 8a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 8Zm0 4a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm3.75-8a.75.75 0 0 0 0 1.5h2.5a.75.75 0 0 0 0-1.5h-2.5ZM13 8a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75Zm.75 3.25a.75.75 0 0 0-1.5 0v2.5h-2.5a.75.75 0 0 0 0 1.5h2.5v2.5a.75.75 0 0 0 1.5 0v-2.5h2.5a.75.75 0 0 0 0-1.5h-2.5v-2.5Z" clipRule="evenodd" />
      <path d="M4.5 1.5a.75.75 0 0 0-1.5 0v2.5a.75.75 0 0 0 1.5 0V1.5ZM15.5 1.5a.75.75 0 0 0-1.5 0v2.5a.75.75 0 0 0 1.5 0V1.5ZM4.5 15.5a.75.75 0 0 0-1.5 0V18a.75.75 0 0 0 1.5 0v-2.5ZM15.5 15.5a.75.75 0 0 0-1.5 0V18a.75.75 0 0 0 1.5 0v-2.5Z" />
    </svg>
);

export const BrainIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-blue-500 mx-auto">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.572L16.5 21.75l-.398-1.178a3.375 3.375 0 00-2.455-2.456L12.75 18l1.178-.398a3.375 3.375 0 002.455-2.456L16.5 14.25l.398 1.178a3.375 3.375 0 002.456 2.456L20.25 18l-1.178.398a3.375 3.375 0 00-2.456 2.456z" />
    </svg>
);

export const ListBulletIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className || "w-5 h-5"}>
        <path fillRule="evenodd" d="M2 4.75A.75.75 0 0 1 2.75 4h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 4.75ZM2 9.75A.75.75 0 0 1 2.75 9h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 9.75ZM2 14.75A.75.75 0 0 1 2.75 14h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 14.75Z" clipRule="evenodd" />
    </svg>
);

export const BugAntIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
        <path d="M9.5 2.113a.5.5 0 0 1 1 0l.502 1.004a.5.5 0 0 0 .584.285l1.076-.308a.5.5 0 0 1 .61.61l-.308 1.076a.5.5 0 0 0 .285.584l1.004.502a.5.5 0 0 1 0 1l-1.004.502a.5.5 0 0 0-.285.584l.308 1.076a.5.5 0 0 1-.61.61l-1.076-.308a.5.5 0 0 0-.584.285L10.5 10.5h-1l-.502-1.004a.5.5 0 0 0-.584-.285l-1.076.308a.5.5 0 0 1-.61-.61l.308-1.076a.5.5 0 0 0-.285-.584L5.75 6.75v-1l1.004-.502a.5.5 0 0 0 .285-.584L6.73 3.588a.5.5 0 0 1 .61-.61l1.076.308a.5.5 0 0 0 .584-.285L9.5 2.113Z" />
        <path fillRule="evenodd" d="M10 11.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0v-2.25a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
        <path d="M6.25 10.5a.75.75 0 0 0-1.5 0v2.25a.75.75 0 0 0 1.5 0v-2.25Z" />
        <path d="M13.75 10.5a.75.75 0 0 0-1.5 0v2.25a.75.75 0 0 0 1.5 0v-2.25Z" />
        <path fillRule="evenodd" d="M3 13.75a.75.75 0 0 1 .75-.75h12.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
        <path fillRule="evenodd" d="M4.5 16.25a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
        <path fillRule="evenodd" d="M15.5 16.25a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5a.75.75 0 0 1 .75.75Z" clipRule="evenodd" />
    </svg>
);

export const PlayPauseIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
      <path d="M6.3 2.841A1.5 1.5 0 0 0 4 4.11V15.89a1.5 1.5 0 0 0 2.3 1.269l9.344-5.89a1.5 1.5 0 0 0 0-2.538L6.3 2.841Z" />
      <path d="M13.5 15.89a1.5 1.5 0 0 0 2.3-1.269V4.11a1.5 1.5 0 0 0-2.3-1.269L13.5 15.89Z" />
    </svg>
);

export const BrainCircuitIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-cyan-400">
      <path d="M7.75 3.5a.75.75 0 0 0-1.5 0v1.25h-1.25a.75.75 0 0 0 0 1.5h1.25V7.5a.75.75 0 0 0 1.5 0V6.25h1.25a.75.75 0 0 0 0-1.5H7.75V3.5Z" />
      <path fillRule="evenodd" d="M8.25 8.25a.75.75 0 0 0-1.5 0V9a2.25 2.25 0 0 0-2.25 2.25v.5a2.25 2.25 0 0 0 2.25 2.25H9v.75a.75.75 0 0 0 1.5 0V14h.25a2.25 2.25 0 0 0 2.25-2.25v-.5a2.25 2.25 0 0 0-2.25-2.25H9.75v-.75a.75.75 0 0 0-1.5 0Zm-1.5 2.5v.5c0 .414.336.75.75.75H9v-2h-.25a.75.75 0 0 0-.75.75Zm3 .75h.25c.414 0 .75-.336.75-.75v-.5a.75.75 0 0 0-.75-.75H11.5v2Z" clipRule="evenodd" />
      <path d="M12.25 3.5a.75.75 0 0 0-1.5 0v1.25h-1.25a.75.75 0 0 0 0 1.5h1.25V7.5a.75.75 0 0 0 1.5 0V6.25h1.25a.75.75 0 0 0 0-1.5H12.25V3.5Z" />
    </svg>
);

export const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className || "w-5 h-5 text-green-400"}>
        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.052-.143Z" clipRule="evenodd" />
    </svg>
);

export const XMarkIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className || "w-5 h-5 text-red-400"}>
        <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
    </svg>
);

export const LockIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className || "w-8 h-8 text-slate-500"}>
        <path fillRule="evenodd" d="M10 1a4.5 4.5 0 0 0-4.5 4.5V9H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-.5V5.5A4.5 4.5 0 0 0 10 1Zm3 8V5.5a3 3 0 1 0-6 0V9h6Z" clipRule="evenodd" />
    </svg>
);

export const TrophyIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9a9.75 9.75 0 0 1 9 0Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 16.5a9.75 9.75 0 0 0-12.75 0" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12.75h.008v.008H12v-.008Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15a.75.75 0 0 1-.75-.75V12a.75.75 0 0 1 1.5 0v2.25A.75.75 0 0 1 12 15Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25c.621 0 1.125-.504 1.125-1.125V6.375c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125Z" />
    </svg>
);

export const MapIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className || 'w-5 h-5'}>
      <path fillRule="evenodd" d="m1.25 4.25.02.02.01.01a.75.75 0 0 1 .22.5V15a.75.75 0 0 1-1 0V5.01a.75.75 0 0 1 .75-.75ZM2.5 4.5a.25.25 0 0 0-.25-.25.25.25 0 0 0-.25.25v10.5a.25.25 0 0 0 .25.25.25.25 0 0 0 .25-.25V4.5Z" clipRule="evenodd" />
      <path d="M4 3.75a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 .75.75v11.5a.75.75 0 0 1-1.5 0V8.35l-2.6 2.6a.75.75 0 0 1-1.06 0l-1.08-1.08-3.64 3.64a.75.75 0 0 1-1.06-1.06l4.17-4.17.53-.53.53.53 2.1 2.1V4.5H4.75a.75.75 0 0 1-.75-.75Z" />
      <path fillRule="evenodd" d="m18.75 4.25.02.02.01.01a.75.75 0 0 1 .22.5V15a.75.75 0 0 1-1 0V5.01a.75.75 0 0 1 .75-.75ZM17.5 4.5a.25.25 0 0 0-.25-.25.25.25 0 0 0-.25.25v10.5a.25.25 0 0 0 .25.25.25.25 0 0 0 .25-.25V4.5Z" clipRule="evenodd" />
    </svg>
);
