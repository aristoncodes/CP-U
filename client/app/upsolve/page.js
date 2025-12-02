'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Navbar from '@/components/Navbar';
import { RefreshCw, CheckCircle, ExternalLink, Trash2, AlertCircle } from 'lucide-react';

export default function UpsolvePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [syncing, setSyncing] = useState(false);
    const [problems, setProblems] = useState([]);
    const [error, setError] = useState(null);

    const [lastContest, setLastContest] = useState(null);

    useEffect(() => {
        fetchUpsolveList();
        fetchUserStats();
    }, []);

    const fetchUserStats = async () => {
        const token = localStorage.getItem('token');
        if (!token) return;
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/profile/stats`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.data?.codeforces) {
                const cfStats = response.data.codeforces;

                // Only set lastContest if it exists and has valid data
                if (cfStats.lastContest && cfStats.lastContest.timeSeconds) {
                    setLastContest({
                        ...cfStats.lastContest,
                        missedContests: cfStats.missedContests || []
                    });
                }
            }
        } catch (err) {
            console.error('Failed to fetch stats:', err);
        }
    };

    const fetchUpsolveList = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
            return;
        }

        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/upsolve`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setProblems(response.data);
            setError(null);
        } catch (err) {
            console.error('Failed to fetch upsolve list:', err);
            setError('Failed to load your upsolve queue.');
        } finally {
            setLoading(false);
        }
    };

    const handleSync = async () => {
        setSyncing(true);
        const token = localStorage.getItem('token');
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/sync`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            // Refresh list and stats after sync
            await fetchUpsolveList();
            await fetchUserStats();
        } catch (err) {
            console.error('Sync failed:', err);
            setError('Sync failed. Please check your handles in profile.');
        } finally {
            setSyncing(false);
        }
    };

    const handleRemove = async (id) => {
        const token = localStorage.getItem('token');
        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/api/upsolve/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setProblems(problems.filter(p => p._id !== id));
        } catch (err) {
            console.error('Failed to remove problem:', err);
        }
    };

    // Check if user needs to give a contest (e.g., > 30 days since last one)
    const daysSinceLastContest = lastContest?.timeSeconds
        ? Math.floor((Date.now() / 1000 - lastContest.timeSeconds) / (60 * 60 * 24))
        : 999;

    // Filter missed contests to only show those from the last 30 days
    const thirtyDaysAgo = Date.now() / 1000 - (30 * 24 * 60 * 60);
    const recentMissedContests = lastContest?.missedContests?.filter(
        contest => contest.startTime > thirtyDaysAgo
    ) || [];

    // Always show the sidebar if there are missed contests from the last 30 days
    const showVirtualContest = recentMissedContests.length > 0;

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-white dark:bg-zinc-950">
                <div className="text-center">
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 dark:border-zinc-700 border-t-gray-900 dark:border-t-white mx-auto"></div>
                    <p className="mt-4 text-gray-600 dark:text-white">Loading your queue...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950">
            <Navbar />

            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Main Content */}
                    <div className="flex-1">
                        {/* Header */}
                        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div className="border-l-4 border-blue-500 pl-4">
                                <h1 className="text-3xl font-bold text-gray-900 dark:text-white glow-text">Upsolve Queue</h1>
                                <p className="mt-2 text-gray-600 dark:text-blue-300">
                                    Problems you attempted but haven't solved yet.
                                </p>
                            </div>
                            <button
                                onClick={handleSync}
                                disabled={syncing}
                                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition-all hover:bg-blue-700 disabled:opacity-50 btn-arcade border-2 border-blue-500"
                            >
                                <RefreshCw className={`h-5 w-5 ${syncing ? 'animate-spin' : ''}`} />
                                {syncing ? 'Syncing...' : 'Sync Now'}
                            </button>
                        </div>

                        {error && (
                            <div className="mb-6 rounded-lg bg-red-900/20 border border-red-800 p-4 text-red-200 flex items-center gap-2">
                                <AlertCircle className="h-5 w-5" />
                                {error}
                            </div>
                        )}

                        {/* Problems List */}
                        {problems.length === 0 ? (
                            <div className="rounded-lg border-2 border-blue-500/50 bg-white dark:bg-zinc-900 p-12 text-center pixel-border">
                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-zinc-800">
                                    <CheckCircle className="h-8 w-8 text-green-500" />
                                </div>
                                <h3 className="text-xl font-semibold text-white">All Caught Up!</h3>
                                <p className="mt-2 text-gray-400">
                                    You have no pending problems to upsolve. Great job!
                                </p>
                            </div>
                        ) : (
                            <div className="grid gap-4">
                                {problems.map((problem) => (
                                    <div
                                        key={problem._id}
                                        className="group flex flex-col gap-4 rounded-lg border-2 border-blue-500/50 bg-white dark:bg-zinc-900 p-6 transition-all hover:border-blue-500 sm:flex-row sm:items-start sm:justify-between pixel-border"                                  >
                                        <div className="flex items-center gap-4">
                                            {/* Platform Icon/Badge */}
                                            <span className={`flex h-10 w-10 items-center justify-center rounded-lg text-xs font-bold uppercase ${problem.platform === 'codeforces'
                                                ? 'bg-red-900/20 text-red-400'
                                                : 'bg-yellow-900/20 text-yellow-400'
                                                }`}>
                                                {problem.platform === 'codeforces' ? 'CF' : 'LC'}
                                            </span>

                                            <div>
                                                <h3 className="font-semibold text-white group-hover:text-blue-400 transition-colors">
                                                    <a href={problem.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                                                        {problem.title}
                                                        <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                    </a>
                                                </h3>
                                                <div className="mt-1 flex items-center gap-3 text-sm text-gray-400">
                                                    {problem.difficulty > 0 && (
                                                        <span className="font-medium text-gray-300">
                                                            Rating: {problem.difficulty}
                                                        </span>
                                                    )}
                                                    <span>•</span>
                                                    <span>Added {new Date(problem.addedAt).toLocaleDateString()}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <a
                                                href={problem.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 transition-colors"
                                            >
                                                Solve
                                            </a>
                                            <button
                                                onClick={() => handleRemove(problem._id)}
                                                className="rounded-lg p-2 text-gray-400 hover:bg-red-900/20 hover:text-red-400 transition-colors"
                                                title="Remove from queue"
                                            >
                                                <Trash2 className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="w-full lg:w-80 flex-shrink-0 space-y-6">
                        {/* Virtual Contest Card */}
                        {showVirtualContest && (
                            <div className="rounded-lg border border-red-500/30 bg-red-950/10 p-6">
                                <h3 className="text-lg font-bold text-red-400 mb-2">
                                    ⚠️ Inactive Alert
                                </h3>
                                <p className="text-gray-300 mb-4 text-sm">
                                    You haven't participated in a contest for {daysSinceLastContest} days.
                                </p>
                                <div className="p-3 bg-red-900/20 rounded border border-red-900/30 mb-4">
                                    <p className="text-red-200 font-bold text-center italic">
                                        "Give the contest virtually dumbass"
                                    </p>
                                </div>


                                {recentMissedContests.length > 0 && (
                                    <div className="mb-4 space-y-2">
                                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                            Missed Contests (Last 30 Days: {recentMissedContests.length})
                                        </p>
                                        <div className="max-h-60 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                                            {recentMissedContests.map(contest => (
                                                <a
                                                    key={contest.id}
                                                    href={`https://codeforces.com/contest/${contest.id}/virtual`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="block p-2 rounded bg-red-900/10 border border-red-900/20 hover:bg-red-900/30 transition-colors group"
                                                >
                                                    <div className="text-sm font-medium text-gray-200 group-hover:text-white truncate">
                                                        {contest.name}
                                                    </div>
                                                    <div className="text-xs text-gray-500 mt-1">
                                                        {new Date(contest.startTime * 1000).toLocaleDateString()}
                                                    </div>
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <a
                                    href="https://codeforces.com/contests"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block w-full text-center rounded-lg bg-red-600 px-4 py-2 font-semibold text-white hover:bg-red-700 transition-colors"
                                >
                                    View All Contests
                                </a>
                            </div>
                        )}

                        {/* Stats Card */}
                        <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
                            <h3 className="text-lg font-bold text-white mb-4">Queue Stats</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-400">Pending</span>
                                    <span className="text-white font-bold">{problems.length}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-400">Codeforces</span>
                                    <span className="text-white font-bold">
                                        {problems.filter(p => p.platform === 'codeforces').length}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-400">LeetCode</span>
                                    <span className="text-white font-bold">
                                        {problems.filter(p => p.platform === 'leetcode').length}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
