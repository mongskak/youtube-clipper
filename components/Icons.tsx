
import React from 'react';

export const YouTubeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0C.887 3.427 0 5.253 0 10.5 0 15.747.887 17.573 4.385 17.816c3.6.245 11.626.246 15.23 0 3.5-.243 4.385-2.069 4.385-7.316 0-5.247-.885-7.073-4.385-7.316zM9.5 14.5V6.5l6 4-6 4z"></path>
    </svg>
);

export const FilmIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 3.75V2.25A2.25 2.25 0 018.25 0h7.5A2.25 2.25 0 0118 2.25v1.5M6 3.75h12M6 3.75a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 006 21.75h12a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6zM8.25 8.25h1.5v1.5h-1.5V8.25zm3.75 0h1.5v1.5h-1.5V8.25zm3.75 0h1.5v1.5h-1.5V8.25zM8.25 12h1.5v1.5h-1.5V12zm3.75 0h1.5v1.5h-1.5V12zm3.75 0h1.5v1.5h-1.5V12zM8.25 15.75h1.5v1.5h-1.5v-1.5zm3.75 0h1.5v1.5h-1.5v-1.5zm3.75 0h1.5v1.5h-1.5v-1.5z" />
  </svg>
);


export const LoadingSpinner: React.FC = () => (
    <svg className="animate-spin -ml-1 mr-3 h-10 w-10 text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);
