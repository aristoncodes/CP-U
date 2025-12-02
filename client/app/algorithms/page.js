'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';
import Navbar from '@/components/Navbar';
import { Code2, BookOpen, Trophy, Sparkles } from 'lucide-react';

// Icon mapping for topics  
const iconMap = {
    bronze: Code2,
    silver: BookOpen,
    gold: Trophy,
    platinum: Sparkles
};

// Color mapping for tiers
const tierColors = {
    Bronze: 'from-amber-950/30 to-zinc-900 border-amber-500/30',
    Silver: 'from-gray-950/30 to-zinc-900 border-gray-400/30',
    Gold: 'from-yellow-950/30 to-zinc-900 border-yellow-500/30',
    Platinum: 'from-cyan-950/30 to-zinc-900 border-cyan-500/30'
};

export default function AlgorithmsPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [topics, setTopics] = useState([]);

    useEffect(() => {
        const fetchTopics = async () => {
            // Check authentication
            const token = localStorage.getItem('token');
            if (!token) {
                router.push('/login');
                return;
            }

            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/topics`);
                setTopics(response.data);
            } catch (err) {
                console.error('Failed to fetch topics:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchTopics();
    }, [router]);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-zinc-950">
                <div className="text-center">
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-zinc-700 border-t-white mx-auto"></div>
                    <p className="mt-4 text-gray-400">Loading topics...</p>
                </div>
            </div>
        );
    }

    // Group topics by tier
    const groupedTopics = topics.reduce((acc, topic) => {
        if (!acc[topic.tier]) acc[topic.tier] = [];
        acc[topic.tier].push(topic);
        return acc;
    }, {});

    const tiers = ['Bronze', 'Silver', 'Gold', 'Platinum'];

    return (
        <div className="min-h-screen bg-zinc-950">
            <Navbar />

            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-white">USACO Algorithm Guide</h1>
                    <p className="mt-2 text-gray-400">Master competitive programming from Bronze to Platinum</p>
                </div>

                {/* Topics by Tier */}
                {tiers.map(tier => {
                    const tierTopics = groupedTopics[tier] || [];
                    if (tierTopics.length === 0) return null;

                    return (
                        <div key={tier} className="mb-12">
                            {/* Tier Header */}
                            <div className="mb-6 flex items-center gap-3">
                                <h2 className="text-2xl font-bold text-white">{tier} Tier</h2>
                                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-zinc-800 text-gray-300">
                                    {tierTopics.length} {tierTopics.length === 1 ? 'topic' : 'topics'}
                                </span>
                            </div>

                            {/* Topics Grid */}
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {tierTopics.map((topic) => {
                                    const Icon = iconMap[tier.toLowerCase()] || Code2;

                                    return (
                                        <Link
                                            key={topic._id}
                                            href={`/algorithms/${topic.slug}`}
                                            className={`group rounded-lg border ${tierColors[tier]} bg-gradient-to-br p-6 shadow-sm transition-all hover:shadow-lg`}
                                        >
                                            {/* Icon */}
                                            <div className="mb-4 inline-flex rounded-lg p-3 bg-zinc-800">
                                                <Icon className="h-6 w-6 text-white" />
                                            </div>

                                            {/* Title & Tags */}
                                            <h3 className="mb-2 text-xl font-bold text-white">{topic.title}</h3>
                                            <div className="mb-3 flex flex-wrap gap-2">
                                                {topic.tags.slice(0, 2).map((tag, idx) => (
                                                    <span key={idx} className="px-2 py-1 rounded text-xs font-medium bg-zinc-800 text-gray-300">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>

                                            {/* Summary */}
                                            <p className="mb-4 text-sm text-gray-400">{topic.summary}</p>

                                            {/* Problems Count */}
                                            <div className="flex items-center justify-between text-sm mt-4">
                                                <span className="text-gray-400">
                                                    {topic.problems.length} {topic.problems.length === 1 ? 'problem' : 'problems'}
                                                </span>
                                                <span className="text-white font-medium group-hover:underline">
                                                    Learn →
                                                </span>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}

                {topics.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500">No topics available yet. Run the seed script to populate topics.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
