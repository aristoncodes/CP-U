'use client';

import { Code2, ExternalLink } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function DailyChallengeCard() {
    const [problem, setProblem] = useState(null);

    useEffect(() => {
        // Mock daily problem - in production, this could fetch from API
        const mockProblems = [
            { title: 'Two Sum', difficulty: 'Easy', platform: 'LeetCode', url: 'https://leetcode.com/problems/two-sum' },
            { title: 'Binary Search', difficulty: 'Medium', platform: 'LeetCode', url: 'https://leetcode.com/problems/binary-search' },
            { title: 'Maximum Subarray', difficulty: 'Medium', platform: 'CodeForces', url: 'https://codeforces.com/problemset/problem/1/A' },
            { title: 'Longest Palindrome', difficulty: 'Hard', platform: 'LeetCode', url: 'https://leetcode.com/problems/longest-palindromic-substring' },
        ];

        // Select problem based on day of year to ensure consistency throughout the day
        const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
        setProblem(mockProblems[dayOfYear % mockProblems.length]);
    }, []);

    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case 'Easy': return 'text-green-500 bg-green-500/10 border-green-500/30';
            case 'Medium': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/30';
            case 'Hard': return 'text-red-500 bg-red-500/10 border-red-500/30';
            default: return 'text-gray-500 bg-gray-500/10 border-gray-500/30';
        }
    };

    if (!problem) return null;

    return (
        <div className="rounded-lg border border-zinc-800 bg-gradient-to-br from-blue-950/20 via-zinc-900 to-purple-950/20 p-6">
            <div className="flex items-center gap-2 mb-4">
                <Code2 className="w-6 h-6 text-blue-400" />
                <h3 className="text-xl font-bold text-white">Problem of the Day</h3>
            </div>

            <div className="mb-4">
                <h4 className="text-2xl font-bold text-white mb-2">{problem.title}</h4>
                <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${getDifficultyColor(problem.difficulty)}`}>
                        {problem.difficulty}
                    </span>
                    <span className="text-gray-400 text-sm">{problem.platform}</span>
                </div>
            </div>

            <a
                href={problem.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg hover:from-blue-500 hover:to-purple-500 transition-all transform hover:scale-105"
            >
                Solve Now
                <ExternalLink className="w-4 h-4" />
            </a>
        </div>
    );
}
