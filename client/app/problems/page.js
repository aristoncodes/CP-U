'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { Brain } from 'lucide-react';
import axios from 'axios';

const RATINGS = [800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000, '2100+'];

export default function ProblemsPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [problems, setProblems] = useState([]);
    const [solvedProblems, setSolvedProblems] = useState(new Set());
    const [selectedRating, setSelectedRating] = useState(800);
    const [selectedProblem, setSelectedProblem] = useState(null);
    const [showHintModal, setShowHintModal] = useState(false);

    useEffect(() => {
        // Check authentication
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
            return;
        }

        // Fetch problems from API
        fetchProblems();
    }, [router]);

    const fetchProblems = async () => {
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
            const token = localStorage.getItem('token');

            const response = await axios.get(`${apiUrl}/api/problems`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setProblems(response.data);
        } catch (error) {
            // If API fails, use mock data
            setProblems(mockProblems);
        } finally {
            setLoading(false);
        }
    };

    const toggleSolved = (problemId) => {
        const newSolved = new Set(solvedProblems);
        if (newSolved.has(problemId)) {
            newSolved.delete(problemId);
        } else {
            newSolved.add(problemId);
        }
        setSolvedProblems(newSolved);
    };

    const handleAIHint = (problem) => {
        setSelectedProblem(problem);
        setShowHintModal(true);
    };

    // Get Codeforces rating colors
    const getRatingColor = (rating) => {
        const numRating = typeof rating === 'number' ? rating : 2100;

        if (numRating < 1200) return { text: 'text-gray-400', border: 'border-gray-400', bg: 'bg-gray-500' };
        if (numRating < 1400) return { text: 'text-green-500', border: 'border-green-500', bg: 'bg-green-500' };
        if (numRating < 1600) return { text: 'text-cyan-400', border: 'border-cyan-400', bg: 'bg-cyan-400' };
        if (numRating < 1900) return { text: 'text-blue-500', border: 'border-blue-500', bg: 'bg-blue-500' };
        if (numRating < 2100) return { text: 'text-violet-500', border: 'border-violet-500', bg: 'bg-violet-500' };
        return { text: 'text-orange-500', border: 'border-orange-500', bg: 'bg-orange-500' };
    };

    // Filter problems for selected rating
    const selectedProblems = problems.filter(p => {
        if (selectedRating === '2100+') {
            return p.rating >= 2100;
        }
        return p.rating === selectedRating;
    });

    // Calculate progress
    const totalSolved = solvedProblems.size;
    const totalProblems = problems.length;

    const ratingProgress = {
        solved: selectedProblems.filter(p => solvedProblems.has(p.id)).length,
        total: selectedProblems.length
    };

    const progressPercentage = ratingProgress.total > 0
        ? (ratingProgress.solved / ratingProgress.total) * 100
        : 0;

    const colors = getRatingColor(selectedRating);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-zinc-950">
                <div className="text-center">
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-zinc-700 border-t-white mx-auto"></div>
                    <p className="mt-4 text-gray-400">Loading problems...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-950">
            <Navbar />

            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="mb-6">
                    <h1 className="text-4xl font-bold text-white mb-2">CP-31 Sheet</h1>
                    <p className="text-gray-400">Total Solved: {totalSolved}/{totalProblems}</p>
                </div>

                {/* Rating Tabs - Horizontal Scrollable */}
                <div className="mb-6 overflow-x-auto pb-2">
                    <div className="flex gap-2 min-w-max">
                        {RATINGS.map((rating) => {
                            const ratingColors = getRatingColor(rating);
                            const isActive = selectedRating === rating;

                            return (
                                <button
                                    key={rating}
                                    onClick={() => setSelectedRating(rating)}
                                    className={`px-6 py-3 rounded-lg border-2 font-semibold transition-all whitespace-nowrap ${isActive
                                            ? `${ratingColors.bg} bg-opacity-20 ${ratingColors.border} text-white`
                                            : `bg-transparent border-zinc-700 ${ratingColors.text} hover:border-zinc-600`
                                        }`}
                                >
                                    {rating}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Progress Bar - Prominent */}
                <div className="mb-8 rounded-lg border border-zinc-800 bg-zinc-900 p-6">
                    <div className="mb-3 flex items-center justify-between">
                        <span className="text-lg font-semibold text-white">
                            Rating Progress
                        </span>
                        <span className="text-xl font-bold text-white">
                            {ratingProgress.solved}/{ratingProgress.total}
                        </span>
                    </div>
                    <div className="h-3 w-full rounded-full bg-zinc-800 overflow-hidden">
                        <div
                            className={`h-3 rounded-full ${colors.bg} transition-all duration-300`}
                            style={{ width: `${progressPercentage}%` }}
                        ></div>
                    </div>
                    <p className="mt-2 text-sm text-gray-400">
                        {progressPercentage.toFixed(0)}% complete for rating {selectedRating}
                    </p>
                </div>

                {/* Problems Table */}
                <div className="overflow-hidden rounded-lg border border-zinc-800">
                    <table className="min-w-full">
                        <thead className="bg-zinc-900 border-b border-zinc-800">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                                    Status
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                                    Problem
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                                    Platform
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                                    Tags
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800">
                            {selectedProblems.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center text-gray-400">
                                        No problems for rating {selectedRating}
                                    </td>
                                </tr>
                            ) : (
                                selectedProblems.map((problem, idx) => (
                                    <tr
                                        key={problem.id}
                                        className={`transition-colors hover:bg-zinc-800 ${idx % 2 === 0 ? 'bg-zinc-950' : 'bg-zinc-900'
                                            }`}
                                    >
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <input
                                                type="checkbox"
                                                checked={solvedProblems.has(problem.id)}
                                                onChange={() => toggleSolved(problem.id)}
                                                className="h-5 w-5 rounded border-zinc-600 bg-zinc-800 text-green-500 focus:ring-green-500 focus:ring-offset-zinc-900 cursor-pointer"
                                            />
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-medium text-white hover:text-blue-400 cursor-pointer transition-colors">
                                                {problem.name}
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-300">
                                            {problem.platform}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-wrap gap-1">
                                                {problem.tags?.slice(0, 2).map((tag, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="inline-flex items-center rounded-full bg-zinc-800 px-2 py-1 text-xs font-medium text-gray-300"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <button
                                                onClick={() => handleAIHint(problem)}
                                                className="inline-flex items-center gap-1 rounded-md border border-zinc-700 bg-zinc-800 px-3 py-1.5 text-sm font-medium text-gray-300 transition-colors hover:bg-zinc-700 hover:text-white"
                                            >
                                                <Brain className="h-4 w-4" />
                                                Hint
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* AI Hint Modal */}
            {showHintModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
                    <div className="w-full max-w-md rounded-lg bg-zinc-900 border border-zinc-800 p-6 shadow-xl">
                        <h3 className="mb-4 text-xl font-bold text-white">AI Hint</h3>
                        <p className="mb-2 text-sm font-medium text-gray-300">
                            Problem: {selectedProblem?.name}
                        </p>
                        <p className="mb-6 text-gray-400">
                            💡 Try thinking about this problem using dynamic programming. Consider breaking it down into smaller subproblems and building up the solution.
                        </p>
                        <button
                            onClick={() => setShowHintModal(false)}
                            className="w-full rounded-md bg-white px-4 py-2 font-semibold text-black transition-colors hover:bg-gray-200"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

// Mock data with ratings for CP-31 Sheet
const mockProblems = [
    { id: 1, name: 'Watermelon', platform: 'Codeforces', rating: 800, tags: ['Math', 'Brute Force'] },
    { id: 2, name: 'Way Too Long Words', platform: 'Codeforces', rating: 800, tags: ['Strings'] },
    { id: 3, name: 'Theatre Square', platform: 'Codeforces', rating: 800, tags: ['Math'] },
    { id: 4, name: 'Beautiful Matrix', platform: 'Codeforces', rating: 800, tags: ['Implementation'] },
    { id: 5, name: 'Petya and Strings', platform: 'Codeforces', rating: 800, tags: ['Strings'] },

    { id: 6, name: 'Team', platform: 'Codeforces', rating: 900, tags: ['Greedy'] },
    { id: 7, name: 'Beautiful Year', platform: 'Codeforces', rating: 900, tags: ['Brute Force'] },
    { id: 8, name: 'Drinks', platform: 'Codeforces', rating: 900, tags: ['Math'] },

    { id: 9, name: 'Free Ice Cream', platform: 'Codeforces', rating: 1000, tags: ['Implementation'] },
    { id: 10, name: 'Night at the Museum', platform: 'Codeforces', rating: 1000, tags: ['Strings'] },
    { id: 11, name: 'Buy a Shovel', platform: 'Codeforces', rating: 1000, tags: ['Math'] },

    { id: 12, name: 'Towers', platform: 'Codeforces', rating: 1100, tags: ['Greedy'] },
    { id: 13, name: 'Lights Out', platform: 'Codeforces', rating: 1100, tags: ['Implementation'] },

    { id: 14, name: 'Lecture', platform: 'Codeforces', rating: 1200, tags: ['Implementation'] },
    { id: 15, name: 'Perfect Permutation', platform: 'Codeforces', rating: 1200, tags: ['Constructive'] },

    { id: 16, name: 'Taxi', platform: 'Codeforces', rating: 1300, tags: ['Greedy'] },
    { id: 17, name: 'T-primes', platform: 'Codeforces', rating: 1300, tags: ['Math', 'Number Theory'] },

    { id: 18, name: 'Party', platform: 'Codeforces', rating: 1400, tags: ['Trees', 'DFS'] },
    { id: 19, name: 'Dragons', platform: 'Codeforces', rating: 1400, tags: ['Greedy', 'Sorting'] },

    { id: 20, name: 'Books', platform: 'Codeforces', rating: 1500, tags: ['Two Pointers'] },
    { id: 21, name: 'Wrath', platform: 'Codeforces', rating: 1500, tags: ['Greedy'] },

    { id: 22, name: 'Interesting Drink', platform: 'Codeforces', rating: 1600, tags: ['Binary Search'] },
    { id: 23, name: 'Array Division', platform: 'Codeforces', rating: 1700, tags: ['Greedy', 'Math'] },
    { id: 24, name: 'Sum of Divisors', platform: 'Codeforces', rating: 1800, tags: ['Number Theory'] },
    { id: 25, name: 'XOR Tree', platform: 'Codeforces', rating: 1900, tags: ['Trees', 'DFS', 'Bitmasks'] },
    { id: 26, name: 'Segment Tree', platform: 'Codeforces', rating: 2000, tags: ['Data Structures'] },
    { id: 27, name: 'Game Theory', platform: 'Codeforces', rating: 2100, tags: ['Games', 'DP'] },
];
