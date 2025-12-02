'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Navbar from '@/components/Navbar';
import ProfileSidebar from '@/components/dashboard/ProfileSidebar';
import StatsDonutChart from '@/components/profile/StatsDonutChart';
import PlatformStatsCard from '@/components/profile/PlatformStatsCard';
import EditProfileModal from '@/components/dashboard/EditProfileModal';
import { mockProfile } from '@/data/mockProfile';

export default function ProfilePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [profileData, setProfileData] = useState(mockProfile);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [syncing, setSyncing] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                router.push('/login');
                return;
            }

            try {
                // Fetch user profile data
                const userRes = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/user/profile`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                // Fetch stats
                const statsRes = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/profile/stats`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                // Fetch upsolve list
                const upsolveRes = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/upsolve`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                const apiData = statsRes.data;
                const userData = userRes.data;
                const mergedData = { ...mockProfile };

                // Update user data
                mergedData.user = {
                    ...mergedData.user,
                    username: userData.username,
                    name: userData.name || userData.username,
                    bio: userData.bio || '',
                    handles: userData.handles || {}
                };

                // Update platform stats
                if (apiData.codeforces && !apiData.codeforces.error) {
                    mergedData.platforms.codeforces = {
                        ...mergedData.platforms.codeforces,
                        handle: apiData.codeforces.handle,
                        currentRating: apiData.codeforces.rating,
                        maxRating: apiData.codeforces.maxRating,
                        rank: apiData.codeforces.rank,
                        problemsSolved: apiData.codeforces.problemsSolved || 0
                    };
                }

                if (apiData.leetcode && !apiData.leetcode.error) {
                    mergedData.platforms.leetcode = {
                        ...mergedData.platforms.leetcode,
                        handle: apiData.leetcode.handle,
                        totalSolved: apiData.leetcode.totalSolved,
                        globalRanking: apiData.leetcode.ranking,
                        contestRating: apiData.leetcode.contestRating,
                        contestRanking: apiData.leetcode.contestRanking,
                        easy: apiData.leetcode.easy,
                        medium: apiData.leetcode.medium,
                        hard: apiData.leetcode.hard
                    };
                    // Update total solved count (LeetCode + Codeforces)
                    const cfSolved = apiData.codeforces?.problemsSolved || 0;
                    const lcSolved = apiData.leetcode.totalSolved || 0;
                    mergedData.stats.totalSolved = cfSolved + lcSolved;
                }

                mergedData.stats.upsolves = upsolveRes.data;

                setProfileData(mergedData);
            } catch (err) {
                console.error('Failed to fetch profile:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [router]);

    const handleSync = async () => {
        setSyncing(true);
        try {
            const token = localStorage.getItem('token');
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/sync`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            window.location.reload();
        } catch (err) {
            console.error('Sync failed:', err);
            setSyncing(false);
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-zinc-950">
                <div className="text-center">
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-zinc-700 border-t-white mx-auto"></div>
                    <p className="mt-4 text-gray-400">Loading profile...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-950">
            <Navbar />

            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8 flex justify-between items-end">
                    <div>
                        <h1 className="text-3xl font-bold text-white">My Profile</h1>
                        <p className="text-gray-400 mt-1">Your competitive programming stats and achievements</p>
                    </div>
                    <button
                        onClick={handleSync}
                        disabled={syncing}
                        className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2 disabled:opacity-50"
                    >
                        {syncing ? (
                            <>
                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-zinc-500 border-t-white"></div>
                                Syncing...
                            </>
                        ) : (
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" /><path d="M16 16h5v5" /></svg>
                                Sync Data
                            </>
                        )}
                    </button>
                </div>

                {/* Layout: Sidebar + Main Content */}
                <div className="grid lg:grid-cols-4 gap-8">
                    {/* Left Sidebar */}
                    <div className="lg:col-span-1">
                        <ProfileSidebar
                            user={profileData.user}
                            onEditProfile={() => setIsEditModalOpen(true)}
                        />
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3 space-y-6">
                        {/* Row 1: Donut Chart + Key Stats */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <StatsDonutChart
                                easy={profileData.platforms.leetcode?.easy || 0}
                                medium={profileData.platforms.leetcode?.medium || 0}
                                hard={profileData.platforms.leetcode?.hard || 0}
                                codeforces={profileData.platforms.codeforces?.problemsSolved || 0}
                            />

                            {/* Key Stats Card */}
                            <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
                                <h3 className="text-xl font-bold text-white mb-6">Key Stats</h3>
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-sm text-gray-400">Total Solved</p>
                                        <p className="text-3xl font-bold text-white">{profileData.stats.totalSolved || 0}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-400">Current Streak</p>
                                        <p className="text-3xl font-bold text-orange-500">5 days 🔥</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-400">Active Platforms</p>
                                        <p className="text-3xl font-bold text-white">3</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Row 2: Platform Cards */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <PlatformStatsCard
                                platform="Codeforces"
                                handle={profileData.platforms.codeforces.handle}
                                stats={[
                                    { label: 'Current Rating', value: profileData.platforms.codeforces.currentRating },
                                    { label: 'Max Rating', value: profileData.platforms.codeforces.maxRating },
                                    { label: 'Rank', value: profileData.platforms.codeforces.rank },
                                    { label: 'Problems Solved', value: profileData.platforms.codeforces.problemsSolved || 0 }
                                ]}
                                color="blue"
                            />
                            <PlatformStatsCard
                                platform="LeetCode"
                                handle={profileData.platforms.leetcode.handle}
                                stats={[
                                    { label: 'Total Solved', value: profileData.platforms.leetcode.totalSolved },
                                    { label: 'Global Ranking', value: profileData.platforms.leetcode.globalRanking?.toLocaleString() },
                                    { label: 'Easy/Med/Hard', value: `${profileData.platforms.leetcode.easy}/${profileData.platforms.leetcode.medium}/${profileData.platforms.leetcode.hard}` }
                                ]}
                                color="orange"
                            />
                        </div>

                        {/* Row 3: Activity Heatmap - Placeholder */}
                        <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
                            <h3 className="text-xl font-bold text-white mb-4">Activity Heatmap</h3>
                            <div className="h-48 flex items-center justify-center text-gray-500">
                                <p>Heatmap visualization coming soon</p>
                            </div>
                        </div>
                    </div>
                </div>

                <EditProfileModal
                    user={profileData.user}
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    onSave={(updatedUser) => {
                        setProfileData(prev => ({
                            ...prev,
                            user: {
                                ...prev.user,
                                ...updatedUser
                            }
                        }));
                        window.location.reload();
                    }}
                />
            </div>
        </div>
    );
}
