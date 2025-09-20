import React from 'react';

type IconProps = React.SVGProps<SVGSVGElement>;

export const SynaxisLogo: React.FC<IconProps> = (props) => (
    <svg viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor: '#f59e0b', stopOpacity: 1}} />
                <stop offset="100%" style={{stopColor: '#d97706', stopOpacity: 1}} />
            </linearGradient>
            <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor: '#a5b4fc', stopOpacity: 1}} />
                <stop offset="100%" style={{stopColor: '#6366f1', stopOpacity: 1}} />
            </linearGradient>
            <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor: '#4f46e5', stopOpacity: 1}} />
                <stop offset="100%" style={{stopColor: '#312e81', stopOpacity: 1}} />
            </linearGradient>
        </defs>
        <path d="M24 0 L36 6 L24 12 L12 6 Z" fill="url(#grad1)" transform="rotate(15 24 6)" />
        <path d="M10 20 L34 32 L10 44 L-14 32 Z" fill="url(#grad2)" transform="rotate(15 10 32)" />
        <path d="M0 40 L40 60 L0 80 L-40 60 Z" fill="url(#grad3)" transform="rotate(15 0 60)" />
        <text x="55" y="45" fontFamily="Poppins, sans-serif" fontSize="32" fontWeight="bold" fill="currentColor" letterSpacing="-1">
            SYNAXIS
        </text>
    </svg>
);


export const UploadIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l-3.75 3.75M12 9.75l3.75 3.75M3 17.25V21h18v-3.75" />
    </svg>
);

export const FileIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
);

export const SendIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.949a.75.75 0 00.95.543h4.132a.75.75 0 010 1.5H4.643a.75.75 0 00-.95.543l-1.414 4.949a.75.75 0 00.826.95 28.896 28.896 0 0015.293-7.154.75.75 0 000-1.115A28.897 28.897 0 003.105 2.289z" />
  </svg>
);

export const MicIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path d="M7 4a3 3 0 016 0v6a3 3 0 11-6 0V4z" />
    <path d="M5.5 10.5a.5.5 0 01.5.5v1a4 4 0 004 4h.5a.5.5 0 010 1h-.5a5 5 0 01-5-5v-1a.5.5 0 01.5-.5z" />
    <path d="M10 15a4 4 0 004-4v-1.5a.5.5 0 011 0V11a5 5 0 01-5 5h-.5a.5.5 0 010-1h.5z" />
  </svg>
);

export const UserIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-5.5-2.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zM10 12a5.99 5.99 0 00-4.793 2.39A6.483 6.483 0 0010 16.5a6.483 6.483 0 004.793-2.11A5.99 5.99 0 0010 12z" clipRule="evenodd" />
  </svg>
);

export const AiIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path d="M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zM10 15a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 15zM10 7a3 3 0 100 6 3 3 0 000-6zM4.135 5.865a.75.75 0 011.06 0l1.061 1.06a.75.75 0 01-1.06 1.06l-1.06-1.06a.75.75 0 010-1.06zM14.806 13.744a.75.75 0 011.06 0l1.06 1.06a.75.75 0 01-1.06 1.06l-1.06-1.06a.75.75 0 010-1.06zM6.194 13.744a.75.75 0 010 1.06l-1.06 1.06a.75.75 0 11-1.06-1.06l1.06-1.06a.75.75 0 011.06 0zM13.745 6.194a.75.75 0 010 1.06l-1.06 1.06a.75.75 0 11-1.06-1.06l1.06-1.06a.75.75 0 011.06 0zM2.75 10a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zM15 10a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75z" />
  </svg>
);

export const SystemIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
  </svg>
);

export const LoadingSpinner: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" {...props}>
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

export const PdfIcon: React.FC<IconProps> = (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}><path fillRule="evenodd" d="M5 2.5a.5.5 0 01.5-.5h8a.5.5 0 01.5.5v2.339a1.5 1.5 0 01-.84 1.35l-3.262 1.631a.5.5 0 000 .86l3.262 1.631a1.5 1.5 0 01.84 1.35V17.5a.5.5 0 01-.5.5h-8a.5.5 0 01-.5-.5v-2.339a1.5 1.5 0 01.84-1.35l3.262-1.631a.5.5 0 000-.86L5.84 8.189A1.5 1.5 0 015 6.839V2.5zM6 4v2.519l3.262 1.631a1.5 1.5 0 010 2.5l-3.262 1.631V15h7v-2.719l-3.262-1.631a1.5 1.5 0 010-2.5L13 6.519V4H6z" clipRule="evenodd" /></svg>;
export const DocxIcon: React.FC<IconProps> = (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}><path d="M3.5 2.75a.75.75 0 00-1.5 0v14.5a.75.75 0 001.5 0v-5.5h1.25a.75.75 0 000-1.5H3.5v-1h3.25a.75.75 0 000-1.5H3.5v-1h4.25a.75.75 0 000-1.5H3.5v-3zM10.5 4a.75.75 0 00-1.5 0v1.25a.75.75 0 001.5 0V4zM8.25 7.5a.75.75 0 01.75-.75h2.5a.75.75 0 010 1.5h-2.5a.75.75 0 01-.75-.75zm0 3a.75.75 0 01.75-.75h5a.75.75 0 010 1.5h-5a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5h3.5a.75.75 0 000-1.5h-3.5z" /></svg>;
export const XlsxIcon: React.FC<IconProps> = (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}><path d="M2 3.5A1.5 1.5 0 013.5 2h13A1.5 1.5 0 0118 3.5v13a1.5 1.5 0 01-1.5 1.5h-13A1.5 1.5 0 012 16.5v-13zM6 7H4v2h2V7zm2 0h2v2H8V7zm4 0h-2v2h2V7zm2 0h2v2h-2V7zM6 9H4v2h2V9zm2 0h2v2H8V9zm4 0h-2v2h2V9zm2 0h2v2h-2V9zm2 2h-2v2h2v-2zm-4 0H8v2h2v-2zm-2 0H6v2h2v-2zm-2 0H4v2h2v-2zm6 2h2v2h-2v-2zm-4 0H8v2h2v-2z" /></svg>;
export const PngIcon: React.FC<IconProps> = (props) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}><path fillRule="evenodd" d="M1 5.25A2.25 2.25 0 013.25 3h13.5A2.25 2.25 0 0119 5.25v9.5A2.25 2.25 0 0116.75 17H3.25A2.25 2.25 0 011 14.75v-9.5zm1.5 5.81v3.69c0 .414.336.75.75.75h13.5a.75.75 0 00.75-.75v-2.69l-2.22-2.219a.75.75 0 00-1.06 0l-1.91 1.909-.48-1.921a.75.75 0 00-.94-.635l-3.291 1.096L3.41 7.44a.75.75 0 00-1.06 0l-1.096 1.096zM16 5.75a.75.75 0 00-1.5 0V6a.75.75 0 001.5 0V5.75z" clipRule="evenodd" /></svg>;

export const SpeakerWaveIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
        <path d="M9.816 4.38a.75.75 0 01.368.644v9.952a.75.75 0 01-1.118.644L5.632 13.5H3.75a.75.75 0 01-.75-.75V7.25c0-.414.336-.75.75-.75h1.882l3.434-2.12a.75.75 0 01.75-.001zM12 7.75a.75.75 0 01.75.75v3a.75.75 0 01-1.5 0v-3a.75.75 0 01.75-.75zm2.25.75a.75.75 0 00-1.5 0v3a.75.75 0 001.5 0v-3z" />
    </svg>
);

export const SpeakerXMarkIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path d="M9.816 4.38a.75.75 0 01.368.644v9.952a.75.75 0 01-1.118.644L5.632 13.5H3.75a.75.75 0 01-.75-.75V7.25c0-.414.336-.75.75-.75h1.882l3.434-2.12a.75.75 0 01.75-.001z" />
    <path d="M12.97 13.03a.75.75 0 010-1.06l1.06-1.06a.75.75 0 111.06 1.06l-1.06 1.06a.75.75 0 01-1.06 0z" />
    <path d="M15.09 11.97a.75.75 0 011.06 0l1.06 1.06a.75.75 0 01-1.06 1.06l-1.06-1.06a.75.75 0 010-1.06z" />
  </svg>
);

export const SparklesIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
      <path fillRule="evenodd" d="M10 2c.24 0 .45.1.6.26a.75.75 0 01.94 1.28l-.01.01c-.42.42-.69 1-.74 1.6.05-.6.32-1.18.74-1.6l.01-.01a.75.75 0 011.28-.94 1.75 1.75 0 00-.26-.6c-.53-.53-1.28-.8-2.08-.8s-1.55.27-2.08.8a1.75 1.75 0 00-.26.6.75.75 0 011.28.94l.01.01c.42-.42.69-1 .74-1.6-.05.6-.32 1.18-.74 1.6l-.01.01a.75.75 0 01-.94-1.28A1.75 1.75 0 0010 2zM6.25 4.5a.75.75 0 00-1.5 0v.09c-.3.26-.52.6-.62 1a.75.75 0 001.48.22.25.25 0 01.14-.11V4.5zm8.28 1.02a.75.75 0 00-1.06-1.06l-.09.09A.25.25 0 017 4.75a.75.75 0 000 1.5.25.25 0 01.22.14l.09.09a.75.75 0 101.06-1.06l-.09-.09a.25.25 0 01.11-.14.25.25 0 01.14.11l.09.09a.75.75 0 001.06 1.06l-.09-.09A.25.25 0 0113 7.75a.75.75 0 000-1.5.25.25 0 01-.22-.14l-.09-.09zM10 6a4 4 0 110 8 4 4 0 010-8zM8.5 15.5a.75.75 0 001.5 0v-.09a.25.25 0 01.14.11l.09.09a.75.75 0 001.06-1.06l-.09-.09a.25.25 0 01-.22-.14.75.75 0 000-1.5.25.25 0 01-.11-.14l-.09-.09a.75.75 0 00-1.06-1.06l.09.09c.08.08.13.18.14.28a.75.75 0 000 1.5c0 .09-.05.18-.11.25l-.09.09a.75.75 0 001.06 1.06l.09-.09a.25.25 0 01.22.14.75.75 0 001.5 0 .25.25 0 01.14-.11v-.09a.75.75 0 00-1.5 0v.09c-.3-.26-.52-.6-.62-1a.75.75 0 00-1.48-.22.25.25 0 01-.14.11v4.18c.09.04.16.1.22.17a.75.75 0 001.06-1.06l-.09-.09a.25.25 0 01-.11-.14zm-3.41-1.02a.75.75 0 10-1.06 1.06l.09.09a.25.25 0 01.11.14.25.25 0 01-.11.14l-.09.09a.75.75 0 101.06 1.06l.09-.09a.25.25 0 01.14-.22.75.75 0 000-1.5.25.25 0 01-.14-.22l-.09-.09z" clipRule="evenodd" />
    </svg>
);

export const SummarizeIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
        <path fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10zm0 5.25a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />
    </svg>
);

export const MindMapIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
        <path d="M7 4a3 3 0 016 0v2.5a.5.5 0 01-1 0V4a2 2 0 10-4 0v2.5a.5.5 0 01-1 0V4z" />
        <path d="M2.5 9.5A.5.5 0 013 9h1a.5.5 0 01.5.5v1a.5.5 0 01-.5.5H3a.5.5 0 01-.5-.5v-1zM15 9.5a.5.5 0 01.5-.5h1a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5v-1z" />
        <path d="M5 12.5a.5.5 0 01.5-.5h9a.5.5 0 010 1H5.5a.5.5 0 01-.5-.5z" />
        <path d="M3.66 11.08a.5.5 0 01.63-.52 2.5 2.5 0 003.42 0 .5.5 0 01.63.52 3.5 3.5 0 01-4.68 0z" />
        <path d="M11.66 11.08a.5.5 0 01.63-.52 2.5 2.5 0 003.42 0 .5.5 0 01.63.52 3.5 3.5 0 01-4.68 0z" />
    </svg>
);

export const TableIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
        <path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2H4zm0 2h12v3H4V4zm0 5h3v7H4v-7zm5 0h3v7H9v-7zm5 0h3v7h-3v-7z" clipRule="evenodd" />
    </svg>
);

export const DownloadIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
      <path d="M10.75 2.75a.75.75 0 00-1.5 0v8.614L6.295 8.235a.75.75 0 10-1.09 1.03l4.25 4.5a.75.75 0 001.09 0l4.25-4.5a.75.75 0 00-1.09-1.03l-2.955 3.129V2.75z" />
      <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
    </svg>
);

export const FemaleVoiceIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
        <path fillRule="evenodd" d="M10 2a3 3 0 100 6 3 3 0 000-6zM3.055 14.288a.75.75 0 00.509 1.424 6.49 6.49 0 0012.872 0 .75.75 0 00.509-1.424 8 8 0 00-13.89 0z" clipRule="evenodd" />
    </svg>
);

export const MaleVoiceIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
      <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.41-1.412A6.97 6.97 0 0010 11.5a6.97 6.97 0 00-6.535 2.993z" />
    </svg>
);

export const TranslateIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
      <path d="M7.5 2.75a.75.75 0 00-1.5 0v1.258a32.987 32.987 0 00-3.599.278.75.75 0 10.198 1.487A31.545 31.545 0 018.7 5.546.75.75 0 009 5.25V2.75A.75.75 0 008.25 2H7.5z" />
      <path d="M6.152 5.864a.75.75 0 01-.198-1.487 32.987 32.987 0 00-3.599-.278.75.75 0 10-.198 1.487 31.545 31.545 0 013.797.278zM9 10a.75.75 0 01-.75.75v.008a.75.75 0 01-1.5 0V10a.75.75 0 01.75-.75h.008a.75.75 0 010 1.5H9z" />
      <path fillRule="evenodd" d="M1.5 8.25A.75.75 0 012.25 7.5h5.5a.75.75 0 010 1.5h-5.5A.75.75 0 011.5 8.25zM2.25 10a.75.75 0 000 1.5h3.5a.75.75 0 000-1.5h-3.5zM2 12.25a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75a.75.75 0 01-.75-.75zM13.5 8.75a.75.75 0 00-1.5 0v2.5a.75.75 0 001.5 0v-2.5z" clipRule="evenodd" />
      <path d="M13.207 5.793a.75.75 0 011.06 0l1.25 1.25a.75.75 0 010 1.06l-1.25 1.25a.75.75 0 11-1.06-1.06l.72-.72H10.75a.75.75 0 010-1.5h3.177l-.72-.72a.75.75 0 010-1.06z" />
    </svg>
);
