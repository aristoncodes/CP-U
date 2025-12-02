'use client';

import { ExternalLink } from 'lucide-react';

export default function PlatformStatsCard({ platform, handle, stats = [], color = 'blue' }) {
    const colorClasses = {
        blue: {
            bg: 'from-blue-950/30 to-zinc-900',
            border: 'border-blue-500/30',
            text: 'text-blue-400',
            badge: 'bg-blue-500/10 text-blue-400 border-blue-500/30'
        },
        orange: {
            bg: 'from-orange-950/30 to-zinc-900',
            border: 'border-orange-500/30',
            text: 'text-orange-400',
            badge: 'bg-orange-500/10 text-orange-400 border-orange-500/30'
        },
        purple: {
            bg: 'from-purple-950/30 to-zinc-900',
            border: 'border-purple-500/30',
            text: 'text-purple-400',
            badge: 'bg-purple-500/10 text-purple-400 border-purple-500/30'
        }
    };

    const colors = colorClasses[color] || colorClasses.blue;

    const getPlatformUrl = () => {
        switch (platform.toLowerCase()) {
            case 'codeforces':
                return `https://codeforces.com/profile/${handle}`;
            case 'leetcode':
                return `https://leetcode.com/${handle}`;
            case 'codechef':
                return `https://www.codechef.com/users/${handle}`;
            default:
                return '#';
        }
    };

    return (
        <div className={`rounded-lg border ${colors.border} bg-gradient-to-br ${colors.bg} p-6`}>
            <div className="flex items-center justify-between mb-6">
                <h3 className={`text-2xl font-bold ${colors.text}`}>{platform}</h3>
                {handle && (
                    <a
                        href={getPlatformUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-semibold border ${colors.badge} hover:opacity-80 transition-opacity`}
                    >
                        @{handle}
                        <ExternalLink className="w-3 h-3" />
                    </a>
                )}
            </div>

            <div className="space-y-4">
                {stats.map((stat, index) => (
                    <div key={index} className="flex justify-between items-center">
                        <span className="text-sm text-gray-400">{stat.label}</span>
                        <span className="text-lg font-bold text-white">{stat.value || 'N/A'}</span>
                    </div>
                ))}
            </div>

            {!handle && (
                <div className="mt-4 text-center text-sm text-gray-500">
                    Add your handle in profile settings
                </div>
            )}
        </div>
    );
}
