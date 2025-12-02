'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { Check, Clock, AlertCircle } from 'lucide-react';

export default function UpsolvePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [pendingProblems, setPendingProblems] = useState([]);
    const [completedProblems, setCompletedProblems] = useState([]);

    useEffect(() => {
        // Check authentication
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
            return;
        }

        // Initialize with mock data
        setPendingProblems(mockPendingProblems);
        setCompletedProblems(mockCompletedProblems);
        setLoading(false);
    }, [router]);

    const markAsCompleted = (problemId) => {
        const problem = pendingProblems.find((p) => p.id === problemId);
        if (problem) {
            setPendingProblems(pendingProblems.filter((p) => p.id !== problemId));
            setCompletedProblems([...completedProblems, { ...problem, completedAt: new Date().toISOString() }]);
        }
    };

    const moveBackToPending = (problemId) => {
        const problem = completedProblems.find((p) => p.id === problemId);
        if (problem) {
            setCompletedProblems(completedProblems.filter((p) => p.id !== problemId));
            setPendingProblems([...pendingProblems, problem]);
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-black mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-black">Upsolve Tracker</h1>
                    <p className="mt-2 text-gray-600">Track and solve problems you missed in contests</p>
                </div>

                {/* Stats Summary */}
                <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                        <div className="flex items-center gap-2">
                            <Clock className="h-5 w-5 text-red-600" />
                            <span className="font-semibold text-red-900">Pending: {pendingProblems.length}</span>
                        </div>
                    </div>
                    <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                        <div className="flex items-center gap-2">
                            <Check className="h-5 w-5 text-green-600" />
                            <span className="font-semibold text-green-900">Completed: {completedProblems.length}</span>
                        </div>
                    </div>
                </div>

                {/* Two Column Layout */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {/* Pending Column */}
                    <div>
                        <div className="mb-4 flex items-center gap-2">
                            <AlertCircle className="h-5 w-5 text-red-600" />
                            <h2 className="text-xl font-bold text-black">To Do</h2>
                        </div>
                        <div className="space-y-3">
                            {pendingProblems.length === 0 ? (
                                <div className="rounded-lg border border-gray-200 bg-white p-6 text-center">
                                    <p className="text-gray-600">No pending problems! 🎉</p>
                                </div>
                            ) : (
                                pendingProblems.map((problem) => (
                                    <div
                                        key={problem.id}
                                        className="group rounded-lg border-2 border-red-200 bg-white p-4 shadow-sm transition-all hover:shadow-md"
                                    >
                                        <div className="mb-2 flex items-start justify-between">
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-black">{problem.name}</h3>
                                                <p className="text-sm text-gray-600">
                                                    {problem.contest} • {problem.platform}
                                                </p>
                                            </div>
                                            <span className="rounded-md bg-red-100 px-2 py-1 text-xs font-medium text-red-700">
                                                {problem.difficulty || 'Medium'}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs text-gray-500">{problem.attemptedAt}</span>
                                            <button
                                                onClick={() => markAsCompleted(problem.id)}
                                                className="flex items-center gap-1 rounded-md bg-green-600 px-3 py-1 text-sm font-medium text-white transition-colors hover:bg-green-700"
                                            >
                                                <Check className="h-4 w-4" />
                                                Mark Complete
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Completed Column */}
                    <div>
                        <div className="mb-4 flex items-center gap-2">
                            <Check className="h-5 w-5 text-green-600" />
                            <h2 className="text-xl font-bold text-black">Completed</h2>
                        </div>
                        <div className="space-y-3">
                            {completedProblems.length === 0 ? (
                                <div className="rounded-lg border border-gray-200 bg-white p-6 text-center">
                                    <p className="text-gray-600">Start solving pending problems!</p>
                                </div>
                            ) : (
                                completedProblems.map((problem) => (
                                    <div
                                        key={problem.id}
                                        className="group rounded-lg border-2 border-green-200 bg-white p-4 shadow-sm transition-all hover:shadow-md"
                                    >
                                        <div className="mb-2 flex items-start justify-between">
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-black">{problem.name}</h3>
                                                <p className="text-sm text-gray-600">
                                                    {problem.contest} • {problem.platform}
                                                </p>
                                            </div>
                                            <Check className="h-5 w-5 text-green-600" />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs text-gray-500">
                                                Completed {problem.completedAt ? new Date(problem.completedAt).toLocaleDateString() : 'recently'}
                                            </span>
                                            <button
                                                onClick={() => moveBackToPending(problem.id)}
                                                className="text-xs text-gray-500 hover:text-gray-700"
                                            >
                                                Undo
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                {/* Help Section */}
                <div className="mt-8 rounded-lg border border-blue-200 bg-blue-50 p-4">
                    <h3 className="mb-2 font-semibold text-blue-900">💡 Pro Tip</h3>
                    <p className="text-sm text-blue-800">
                        After each contest, add the problems you couldn't solve to your upsolve list. Revisit them within 24 hours for maximum learning impact!
                    </p>
                </div>
            </div>
        </div>
    );
}

// Mock data
const mockPendingProblems = [
    {
        id: 1,
        name: 'Maximum Subarray Sum',
        contest: 'Codeforces Round 925',
        platform: 'Codeforces',
        difficulty: 'Medium',
        attemptedAt: '2 days ago',
    },
    {
        id: 2,
        name: 'Tree Construction',
        contest: 'Educational Round 160',
        platform: 'Codeforces',
        difficulty: 'Hard',
        attemptedAt: '5 days ago',
    },
    {
        id: 3,
        name: 'Longest Path in DAG',
        contest: 'Weekly Contest 380',
        platform: 'LeetCode',
        difficulty: 'Medium',
        attemptedAt: '1 week ago',
    },
];

const mockCompletedProblems = [
    {
        id: 4,
        name: 'Binary Search Variations',
        contest: 'Div 2 Round 920',
        platform: 'Codeforces',
        completedAt: '2024-11-28',
    },
];
