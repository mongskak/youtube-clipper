
import React from 'react';
import { YouTubeIcon } from './Icons';

interface InputFormProps {
    youtubeUrl: string;
    setYoutubeUrl: (url: string) => void;
    transcript: string;
    setTranscript: (transcript: string) => void;
    onGenerate: () => void;
    isLoading: boolean;
    clipCount: string;
    setClipCount: (count: string) => void;
    clipDuration: string;
    setClipDuration: (duration: string) => void;
}

const InputForm: React.FC<InputFormProps> = ({ 
    youtubeUrl, setYoutubeUrl, 
    transcript, setTranscript, 
    onGenerate, isLoading,
    clipCount, setClipCount,
    clipDuration, setClipDuration
}) => {
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (youtubeUrl.trim() && transcript.trim()) {
            onGenerate();
        }
    };

    const commonSelectStyles = "w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow duration-200 text-base";

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
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
                        required
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
                        required
                    />
                </div>
            </div>
            
            <div className="bg-gray-800/50 border border-gray-700 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-white mb-3 text-center">Opsi Kustomisasi</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="clip-count" className="block text-sm font-medium text-gray-300 mb-1">
                            Jumlah Klip
                        </label>
                        <select
                            id="clip-count"
                            value={clipCount}
                            disabled={isLoading}
                            onChange={(e) => setClipCount(e.target.value)}
                            className={commonSelectStyles}
                            aria-label="Pilih Jumlah Klip"
                        >
                            <option value="">Rekomendasi AI</option>
                            <option value="10">&lt; 10</option>
                            <option value="15">&lt; 15</option>
                            <option value="20">&lt; 20</option>
                            <option value="30">&lt; 30</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="clip-duration" className="block text-sm font-medium text-gray-300 mb-1">
                            Durasi Klip
                        </label>
                        <select
                            id="clip-duration"
                            value={clipDuration}
                            disabled={isLoading}
                            onChange={(e) => setClipDuration(e.target.value)}
                            className={commonSelectStyles}
                             aria-label="Pilih Durasi Klip"
                        >
                            <option value="">Rekomendasi AI</option>
                            <option value="kurang dari 30 detik">&lt; 30 detik</option>
                            <option value="sekitar 30 detik">~30 detik</option>
                            <option value="30 - 60 detik">30 - 60 detik</option>
                            <option value="lebih dari 60 detik">&gt; 60 detik</option>
                        </select>
                    </div>
                </div>
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
