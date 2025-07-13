
import React from 'react';
import { Topic } from '../types';
import { HOOK_ICON, CAPTION_ICON, VIRAL_ICON, TIME_ICON } from '../constants';

interface TopicCardProps {
    topic: Topic;
    videoId: string;
}

const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const TopicCard: React.FC<TopicCardProps> = ({ topic, videoId }) => {
    const embedUrl = `https://www.youtube.com/embed/${videoId}?start=${topic.startTime}&end=${topic.endTime}&autoplay=0&mute=1&controls=1&modestbranding=1&rel=0`;

    return (
        <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700 transition-all hover:shadow-indigo-500/20 hover:border-indigo-700">
            <div className="p-6">
                <h3 className="text-2xl font-bold text-indigo-400 mb-4">{topic.topicTitle}</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Left Column: Video Preview and Metadata */}
                    <div className="flex flex-col space-y-4">
                        <div className="aspect-video w-full bg-black rounded-lg overflow-hidden">
                            <iframe
                                src={embedUrl}
                                title={`YouTube video player: ${topic.topicTitle}`}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="w-full h-full"
                            ></iframe>
                        </div>
                        <div className="flex justify-between items-center text-gray-300 bg-gray-700/50 px-4 py-2 rounded-md">
                            <div className="flex items-center gap-2">
                               {TIME_ICON}
                               <span>Klip: {formatTime(topic.startTime)} - {formatTime(topic.endTime)}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="font-semibold">{topic.duration}d</span>
                                <span className="text-gray-400">durasi</span>
                            </div>
                        </div>
                    </div>
                    
                    {/* Right Column: AI-Generated Content */}
                    <div className="space-y-5">
                        <div className="space-y-2">
                            <div className="flex items-center gap-3 text-indigo-400">
                                {HOOK_ICON}
                                <h4 className="text-lg font-semibold">Hook Viral</h4>
                            </div>
                            <p className="text-gray-300 bg-gray-900/50 p-3 rounded-md border-l-4 border-indigo-500">{topic.hook}</p>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center gap-3 text-teal-400">
                                {CAPTION_ICON}
                                <h4 className="text-lg font-semibold">Saran Caption</h4>
                            </div>
                            <p className="text-gray-300 bg-gray-900/50 p-3 rounded-md border-l-4 border-teal-500 whitespace-pre-wrap">{topic.caption}</p>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center gap-3 text-amber-400">
                                {VIRAL_ICON}
                                <h4 className="text-lg font-semibold">Potensi Viral</h4>
                            </div>
                            <p className="text-gray-300 bg-gray-900/50 p-3 rounded-md border-l-4 border-amber-500">{topic.viralPotential}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopicCard;