'use client';

import { Flame } from 'lucide-react';

export default function WelcomeWidget({ userName, streak = 0 }) {
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 18) return 'Good Afternoon';
        return 'Good Evening';
    };

    return (
        <div className="rounded-lg border border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-950 p-6">
            <h2 className="text-3xl font-bold text-white mb-2">
                {getGreeting()}, {userName}! 👋
            </h2>
            <div className="flex items-center gap-2 mt-4">
                <Flame className="w-6 h-6 text-orange-500" />
                <p className="text-lg text-gray-300">
                    You are on a <span className="font-bold text-orange-500">{streak}-day</span> streak! 🔥
                </p>
            </div>
            <p className="text-gray-400 mt-2">Keep up the momentum and solve today's challenge!</p>
        </div>
    );
}
