'use client';

import { ListTodo, CheckCircle2, ExternalLink } from 'lucide-react';

export default function UpsolveQueueMini({ upsolves = [], onMarkDone }) {
    // Show only top 3 pending problems
    const pendingUpsolves = upsolves.filter(u => !u.solved).slice(0, 3);

    const getDifficultyColor = (difficulty) => {
        if (!difficulty) return 'text-gray-400';
        // Convert to string and handle non-string types
        const lower = String(difficulty).toLowerCase();
        if (lower.includes('easy')) return 'text-green-500';
        if (lower.includes('medium')) return 'text-yellow-500';
        if (lower.includes('hard')) return 'text-red-500';
        return 'text-gray-400';
    };

    return (
        <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <ListTodo className="w-6 h-6 text-green-400" />
                    Upsolve Queue
                </h3>
                <span className="text-sm text-gray-400">
                    {pendingUpsolves.length} pending
                </span>
            </div>

            {pendingUpsolves.length === 0 ? (
                <div className="text-center py-8">
                    <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-2" />
                    <p className="text-gray-400">All caught up! 🎉</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {pendingUpsolves.map((upsolve, index) => (
                        <div
                            key={upsolve._id || index}
                            className="p-3 rounded-lg border border-zinc-700 bg-zinc-800/50 hover:bg-zinc-800 transition-colors"
                        >
                            <div className="flex items-start justify-between gap-2">
                                <div className="flex-1">
                                    <h4 className="font-semibold text-white text-sm mb-1">
                                        {upsolve.problemName || upsolve.title}
                                    </h4>
                                    <div className="flex items-center gap-2 text-xs">
                                        <span className="text-gray-400">{upsolve.platform}</span>
                                        {upsolve.difficulty && (
                                            <>
                                                <span className="text-gray-600">•</span>
                                                <span className={getDifficultyColor(upsolve.difficulty)}>
                                                    {upsolve.difficulty}
                                                </span>
                                            </>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center gap-1">
                                    {upsolve.problemUrl && (
                                        <a
                                            href={upsolve.problemUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-1.5 rounded hover:bg-zinc-700 transition-colors"
                                            title="Open problem"
                                        >
                                            <ExternalLink className="w-4 h-4 text-gray-400" />
                                        </a>
                                    )}
                                    {onMarkDone && (
                                        <button
                                            onClick={() => onMarkDone(upsolve._id)}
                                            className="p-1.5 rounded hover:bg-zinc-700 transition-colors"
                                            title="Mark as done"
                                        >
                                            <CheckCircle2 className="w-4 h-4 text-gray-400 hover:text-green-500" />
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}

                    {upsolves.filter(u => !u.solved).length > 3 && (
                        <a
                            href="/upsolve"
                            className="block text-center text-sm text-blue-400 hover:text-blue-300 mt-3"
                        >
                            View all {upsolves.filter(u => !u.solved).length} problems →
                        </a>
                    )}
                </div>
            )}
        </div>
    );
}
