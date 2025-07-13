
import React from 'react';
import { Topic } from '../types';
import TopicCard from './TopicCard';

interface ResultsDisplayProps {
    topics: Topic[];
    videoId: string;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ topics, videoId }) => {
    return (
        <div className="space-y-8">
            <h2 className="text-3xl font-bold text-center text-white">
                Klip Viral yang Ditemukan
            </h2>
            {topics.map((topic, index) => (
                <TopicCard key={index} topic={topic} videoId={videoId} />
            ))}
        </div>
    );
};

export default ResultsDisplay;