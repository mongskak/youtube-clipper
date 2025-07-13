import React from 'react';
import { Topic } from '../types';
import TopicCard from './TopicCard';
import { ExportIcon } from './Icons';

interface ResultsDisplayProps {
    topics: Topic[];
    videoId: string;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ topics, videoId }) => {

    const formatTime = (seconds: number): string => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const handleExport = () => {
        const fileContent = topics.map(topic => {
            return `
==================================================
Judul Klip: ${topic.topicTitle}
==================================================

Potensi Viral: ${topic.viralPotential}
Waktu: ${formatTime(topic.startTime)} - ${formatTime(topic.endTime)}
Durasi: ${topic.duration} detik

--- HOOK ---
${topic.hook}

--- CAPTION ---
${topic.caption}
`.trim();
        }).join('\n\n\n');

        const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'klip-viral-export.txt';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };


    return (
        <div className="space-y-8">
            <div className="text-center space-y-4">
                 <h2 className="text-3xl font-bold text-white">
                    Klip Viral yang Ditemukan
                </h2>
                <button
                    onClick={handleExport}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gray-700 text-indigo-300 font-semibold rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500 transition-all duration-200"
                >
                    <ExportIcon className="w-5 h-5" />
                    Export ke .TXT
                </button>
            </div>

            {topics.map((topic, index) => (
                <TopicCard key={index} topic={topic} videoId={videoId} />
            ))}
        </div>
    );
};

export default ResultsDisplay;