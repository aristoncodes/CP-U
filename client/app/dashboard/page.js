'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Navbar from '@/components/Navbar';
import WelcomeWidget from '@/components/dashboard/WelcomeWidget';
import DailyChallengeCard from '@/components/dashboard/DailyChallengeCard';
import ContestRadar from '@/components/dashboard/ContestRadar';
import UpsolveQueueMini from '@/components/dashboard/UpsolveQueueMini';

export default function DashboardPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null);
    const [upsolves, setUpsolves] = useState([]);
    const [streak, setStreak] = useState(5); // Mock streak for now

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                router.push('/login');
                return;
            }

            try {
                // Fetch user profile
                const userRes = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/user/profile`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                // Fetch upsolve list
                const upsolveRes = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/upsolve`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                setUserData(userRes.data);
                setUpsolves(upsolveRes.data);
            } catch (err) {
                console.error('Failed to fetch data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [router]);

    const handleMarkDone = async (upsolveId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.patch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/upsolve/${upsolveId}`,
                { solved: true },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            // Refresh upsolves
            setUpsolves(prev => prev.map(u => u._id === upsolveId ? { ...u, solved: true } : u));
        } catch (err) {
            console.error('Failed to mark as done:', err);
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-white dark:bg-zinc-950">
                <div className="text-center">
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 dark:border-zinc-700 border-t-gray-900 dark:border-t-white mx-auto"></div>
                    <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950">
            <Navbar />

            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {/* Welcome Widget */}
                <div className="mb-8">
                    <WelcomeWidget
                        userName={userData?.name || userData?.username || 'User'}
                        streak={streak}
                    />
                </div>

                {/* Grid Layout for Widgets */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Daily Challenge */}
                    <DailyChallengeCard />

                    {/* Contest Radar */}
                    <ContestRadar />
                </div>

                {/* Quick Actions */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <a
                        href="/problems"
                        className="p-6 rounded-lg border-2 border-blue-500 bg-white dark:bg-zinc-900 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-all pixel-border group"
                    >
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 group-hover:text-blue-500 transition-colors">Browse Problems</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Explore curated problem sets</p>
                    </a>
                    <a
                        href="/algorithms"
                        className="p-6 rounded-lg border-2 border-blue-500 bg-white dark:bg-zinc-900 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-all pixel-border group"
                    >
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 group-hover:text-blue-500 transition-colors">Learn Algorithms</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Master algorithmic patterns</p>
                    </a>
                    <a
                        href="/profile"
                        className="p-6 rounded-lg border-2 border-blue-500 bg-white dark:bg-zinc-900 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-all pixel-border group"
                    >
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 group-hover:text-blue-500 transition-colors">View Profile</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Check your stats and progress</p>
                    </a>
                </div>
            </div>
        </div>
    );
}
