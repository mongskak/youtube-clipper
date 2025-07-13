
import React from 'react';
import { YouTubeIcon } from './Icons';

interface InputFormProps {
    youtubeUrl: string;
    setYoutubeUrl: (url: string) => void;
    transcript: string;
    setTranscript: (transcript: string) => void;
    onGenerate: () => void;
    isLoading: boolean;
}

const InputForm: React.FC<InputFormProps> = ({ youtubeUrl, setYoutubeUrl, transcript, setTranscript, onGenerate, isLoading }) => {
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (youtubeUrl.trim() && transcript.trim()) {
            onGenerate();
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                     <YouTubeIcon className="h-6 w-6 text-gray-400" />
                </div>
                <input
                    type="url"
                    value={youtubeUrl}
                    onChange={(e) => setYoutubeUrl(e.target.value)}
                    placeholder="Tempel tautan video YouTube di sini..."
                    disabled={isLoading}
                    className="w-full pl-12 pr-4 py-4 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow duration-200 text-lg"
                    aria-label="Tautan YouTube"
                />
            </div>

            <div>
                 <textarea
                    value={transcript}
                    onChange={(e) => setTranscript(e.target.value)}
                    placeholder="Tempel transkrip video lengkap di sini..."
                    disabled={isLoading}
                    rows={10}
                    className="w-full p-4 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow duration-200 text-base"
                    aria-label="Transkrip Video"
                />
            </div>

            <button
                type="submit"
                disabled={isLoading || !youtubeUrl.trim() || !transcript.trim()}
                className="w-full px-6 py-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 disabled:bg-gray-600 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500 transition-all duration-200 flex items-center justify-center text-lg"
            >
                {isLoading ? 'Menganalisis...' : 'Buat Klip'}
            </button>
        </form>
    );
};

export default InputForm;