'use client';

import { Calendar, Clock, ExternalLink } from 'lucide-react';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ContestRadar() {
    const [contests, setContests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchContests();
    }, []);

    const fetchContests = async () => {
        try {
            // Fetch directly from Codeforces API
            const response = await axios.get('https://codeforces.com/api/contest.list');

            if (response.data.status !== 'OK') {
                throw new Error('Failed to fetch contests');
            }

            const now = new Date();
            const twoDaysFromNow = new Date(now.getTime() + (48 * 60 * 60 * 1000));

            // Filter for upcoming contests (phase: BEFORE) starting within 48 hours
            const filtered = response.data.result
                .filter(contest => {
                    if (contest.phase !== 'BEFORE') return false;
                    const startTime = new Date(contest.startTimeSeconds * 1000);
                    return startTime > now && startTime < twoDaysFromNow;
                })
                .sort((a, b) => a.startTimeSeconds - b.startTimeSeconds)
                .slice(0, 3) // Show top 3
                .map(contest => ({
                    name: contest.name,
                    start_time: new Date(contest.startTimeSeconds * 1000).toISOString(),
                    url: `https://codeforces.com/contest/${contest.id}`,
                    site: 'Codeforces'
                }));

            setContests(filtered);
            setLoading(false);
        } catch (err) {
            console.error('Failed to fetch contests:', err);
            setError('Failed to load contests');
            setLoading(false);
        }
    };

    const getTimeUntil = (startTime) => {
        const now = new Date();
        const start = new Date(startTime);
        const diff = start - now;

        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    const getPlatformColor = (site) => {
        const platform = site.toLowerCase();
        if (platform === 'codeforces') return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
        if (platform === 'leetcode') return 'bg-orange-500/10 text-orange-400 border-orange-500/30';
        return 'bg-gray-500/10 text-gray-400 border-gray-500/30';
    };

    if (loading) {
        return (
            <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Calendar className="w-6 h-6 text-purple-400" />
                    Contest Radar
                </h3>
                <div className="text-center text-gray-400">Loading contests...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Calendar className="w-6 h-6 text-purple-400" />
                    Contest Radar
                </h3>
                <div className="text-center text-gray-400">{error}</div>
            </div>
        );
    }

    return (
        <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Calendar className="w-6 h-6 text-purple-400" />
                Codeforces Contest Radar
            </h3>

            {contests.length === 0 ? (
                <p className="text-gray-400 text-center py-4">No upcoming Codeforces contests in the next 48 hours</p>
            ) : (
                <div className="space-y-3">
                    {contests.map((contest, index) => (
                        <div
                            key={index}
                            className="p-4 rounded-lg border border-zinc-700 bg-zinc-800/50 hover:bg-zinc-800 transition-colors"
                        >
                            <div className="flex justify-between items-start mb-2">
                                <h4 className="font-semibold text-white text-sm">{contest.name}</h4>
                                <span className={`px-2 py-1 rounded text-xs font-semibold border ${getPlatformColor(contest.site)}`}>
                                    {contest.site}
                                </span>
                            </div>

                            <div className="flex items-center gap-4 text-sm text-gray-400 mb-2">
                                <div className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    <span>Starts in {getTimeUntil(contest.start_time)}</span>
                                </div>
                            </div>

                            <a
                                href={contest.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1"
                            >
                                View Contest <ExternalLink className="w-3 h-3" />
                            </a>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
