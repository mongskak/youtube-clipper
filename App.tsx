
import React, { useState, useCallback } from 'react';
import { Topic } from './types';
import { generateTopics } from './services/geminiService';
import Header from './components/Header';
import InputForm from './components/InputForm';
import ResultsDisplay from './components/ResultsDisplay';
import { YouTubeIcon, LoadingSpinner } from './components/Icons';

// Utility to extract YouTube video ID from various URL formats
const getYouTubeId = (url: string): string | null => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
};

const App: React.FC = () => {
    const [youtubeUrl, setYoutubeUrl] = useState<string>('');
    const [transcript, setTranscript] = useState<string>('');
    const [topics, setTopics] = useState<Topic[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [videoId, setVideoId] = useState<string | null>(null);
    const [hasGenerated, setHasGenerated] = useState<boolean>(false);

    const handleGenerate = useCallback(async () => {
        if (!youtubeUrl || !transcript) return;

        setIsLoading(true);
        setError(null);
        setTopics([]);
        setHasGenerated(true);

        const id = getYouTubeId(youtubeUrl);
        if (!id) {
            setError("URL YouTube tidak valid. Harap berikan tautan yang valid.");
            setIsLoading(false);
            return;
        }
        setVideoId(id);

        try {
            const result = await generateTopics(youtubeUrl, transcript);
            setTopics(result);
        } catch (err) {
            console.error(err);
            const errorMessage = err instanceof Error ? err.message : "Terjadi kesalahan yang tidak diketahui.";
            setError(`Gagal membuat topik. ${errorMessage}`);
        } finally {
            setIsLoading(false);
        }
    }, [youtubeUrl, transcript]);

    return (
        <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <Header />
                <main>
                    <InputForm
                        youtubeUrl={youtubeUrl}
                        setYoutubeUrl={setYoutubeUrl}
                        transcript={transcript}
                        setTranscript={setTranscript}
                        onGenerate={handleGenerate}
                        isLoading={isLoading}
                    />
                    
                    {error && (
                        <div className="mt-6 bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg text-center" role="alert">
                           <p>{error}</p>
                        </div>
                    )}
                    
                    <div className="mt-8">
                        {isLoading && (
                            <div className="flex flex-col items-center justify-center text-center space-y-4 py-16">
                                <LoadingSpinner />
                                <p className="text-lg text-gray-400">AI sedang menganalisis transkrip...</p>
                                <p className="text-sm text-gray-500">Ini mungkin akan memakan waktu sejenak.</p>
                            </div>
                        )}
                        
                        {!isLoading && topics.length > 0 && videoId && (
                            <ResultsDisplay topics={topics} videoId={videoId} />
                        )}

                        {!isLoading && !error && !hasGenerated && (
                            <div className="text-center py-16 px-6 bg-gray-800/50 rounded-lg border border-gray-700">
                                <YouTubeIcon className="w-16 h-16 mx-auto text-gray-500" />
                                <h3 className="mt-4 text-xl font-semibold text-white">Siap Mencari Klip Viral?</h3>
                                <p className="mt-2 text-gray-400">
                                    Tempel tautan video YouTube dan transkripnya di atas, lalu biarkan AI kami menemukan momen yang paling bisa dibagikan untuk Anda.
                                </p>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default App;