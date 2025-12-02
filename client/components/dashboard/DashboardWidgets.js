import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Code2, Trophy, TrendingUp, Clock } from 'lucide-react';

export default function DashboardWidgets({ stats, platforms, activityData, recentSubmissions }) {
    if (!stats || !platforms) return null;

    // Prepare data for donut chart
    const chartData = [
        { name: 'Easy', value: stats.problemBreakdown.easy, color: '#22c55e' },
        { name: 'Medium', value: stats.problemBreakdown.medium, color: '#eab308' },
        { name: 'Hard', value: stats.problemBreakdown.hard, color: '#ef4444' }
    ];

    // Helper to get activity color
    const getActivityColor = (count) => {
        if (count === 0) return 'bg-zinc-800';
        if (count <= 2) return 'bg-green-900';
        if (count <= 5) return 'bg-green-700';
        return 'bg-green-500';
    };

    // Platform icons/colors
    const getPlatformBadge = (platform) => {
        const badges = {
            leetcode: 'bg-orange-500/20 text-orange-400 border border-orange-500/30',
            codeforces: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
            codechef: 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
            cses: 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
        };
        return badges[platform] || 'bg-zinc-700 text-gray-300 border border-zinc-600';
    };

    return (
        <div className="space-y-6">
            {/* Row 1: Aggregated Stats - Donut Chart + Counters */}
            <div className="grid md:grid-cols-2 gap-6">
                {/* Donut Chart */}
                <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Total Solved</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie
                                data={chartData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={90}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip contentStyle={{ backgroundColor: '#27272a', border: '1px solid #52525b', color: '#fff' }} />
                            <Legend wrapperStyle={{ color: '#d4d4d8' }} />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="mt-4 text-center">
                        <p className="text-3xl font-bold text-white">{stats.totalSolved}</p>
                        <p className="text-sm text-gray-400">Problems Solved</p>
                    </div>
                </div>

                {/* Stat Counters */}
                <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-6">
                    <h3 className="text-lg font-semibold text-white mb-6">Statistics</h3>
                    <div className="space-y-6">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <Code2 className="h-5 w-5 text-gray-400" />
                                <p className="text-sm text-gray-400">Total Questions</p>
                            </div>
                            <p className="text-4xl font-bold text-white">{stats.totalSolved}</p>
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <Trophy className="h-5 w-5 text-gray-400" />
                                <p className="text-sm text-gray-400">Active Days</p>
                            </div>
                            <p className="text-4xl font-bold text-white">{stats.activeDays}</p>
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <TrendingUp className="h-5 w-5 text-gray-400" />
                                <p className="text-sm text-gray-400">Max Streak</p>
                            </div>
                            <p className="text-4xl font-bold text-white">{stats.maxStreak} 🔥</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Row 2: Platform Cards */}
            <div className="grid md:grid-cols-3 gap-4">
                {/* Codeforces Card */}
                <div className="bg-zinc-900 rounded-lg border border-zinc-800 overflow-hidden">
                    <div className="bg-blue-600 text-white px-4 py-3">
                        <h3 className="font-semibold text-lg">Codeforces</h3>
                        <p className="text-sm opacity-90">@{platforms.codeforces.handle}</p>
                    </div>
                    <div className="p-4 space-y-3">
                        <div>
                            <p className="text-xs text-gray-400 mb-1">Current Rating</p>
                            <p className="text-2xl font-bold text-cyan-400">{platforms.codeforces.currentRating}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 mb-1">Max Rating</p>
                            <p className="text-lg font-semibold text-gray-300">{platforms.codeforces.maxRating}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 mb-1">Rank</p>
                            <p className="font-semibold text-gray-200">{platforms.codeforces.rank}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 mb-1">Contests</p>
                            <p className="text-sm font-medium text-gray-300">{platforms.codeforces.contestsParticipated}</p>
                        </div>
                    </div>
                </div>

                {/* LeetCode Card */}
                <div className="bg-zinc-900 rounded-lg border border-zinc-800 overflow-hidden">
                    <div className="bg-orange-600 text-white px-4 py-3">
                        <h3 className="font-semibold text-lg">LeetCode</h3>
                        <p className="text-sm opacity-90">@{platforms.leetcode.handle}</p>
                    </div>
                    <div className="p-4 space-y-3">
                        <div>
                            <p className="text-xs text-gray-400 mb-1">Global Ranking</p>
                            <p className="text-2xl font-bold text-orange-400">#{platforms.leetcode.globalRanking.toLocaleString()}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 mb-1">Problems Solved</p>
                            <p className="text-lg font-semibold text-gray-300">{platforms.leetcode.totalSolved}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 mb-1">Contest Rating</p>
                            <p className="text-lg font-semibold text-gray-300">{platforms.leetcode.contestRating}</p>
                        </div>
                        <div className="flex gap-2 text-xs">
                            <span className="text-green-400 font-medium">E: {platforms.leetcode.easy}</span>
                            <span className="text-yellow-400 font-medium">M: {platforms.leetcode.medium}</span>
                            <span className="text-red-400 font-medium">H: {platforms.leetcode.hard}</span>
                        </div>
                    </div>
                </div>

                {/* CodeChef Card */}
                <div className="bg-zinc-900 rounded-lg border border-zinc-800 overflow-hidden">
                    <div className="bg-amber-700 text-white px-4 py-3">
                        <h3 className="font-semibold text-lg">CodeChef</h3>
                        <p className="text-sm opacity-90">@{platforms.codechef.handle}</p>
                    </div>
                    <div className="p-4 space-y-3">
                        <div>
                            <p className="text-xs text-gray-400 mb-1">Stars</p>
                            <p className="text-2xl font-bold text-amber-400">
                                {'⭐'.repeat(platforms.codechef.stars)}
                            </p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 mb-1">Current Rating</p>
                            <p className="text-lg font-semibold text-gray-300">{platforms.codechef.rating}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 mb-1">Max Rating</p>
                            <p className="text-lg font-semibold text-gray-300">{platforms.codechef.maxRating}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 mb-1">Division</p>
                            <p className="text-sm font-medium text-gray-300">{platforms.codechef.division}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Row 3: Activity Heatmap */}
            <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-6">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">Activity</h3>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                        <span>Less</span>
                        <div className="flex gap-1">
                            <div className="w-3 h-3 rounded-sm bg-zinc-800"></div>
                            <div className="w-3 h-3 rounded-sm bg-green-900"></div>
                            <div className="w-3 h-3 rounded-sm bg-green-700"></div>
                            <div className="w-3 h-3 rounded-sm bg-green-500"></div>
                        </div>
                        <span>More</span>
                    </div>
                </div>
                <div className="overflow-x-auto pb-2">
                    <div className="flex gap-0.5 min-w-max">
                        {activityData?.map((week, weekIdx) => (
                            <div key={weekIdx} className="flex flex-col gap-0.5">
                                {week.map((count, dayIdx) => (
                                    <div
                                        key={dayIdx}
                                        className={`w-3 h-3 rounded-sm ${getActivityColor(count)}`}
                                        title={`${count} submissions`}
                                    />
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                    {stats.activeDays} active days in the last year
                </p>
            </div>

            {/* Row 4: Recent Submissions */}
            <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-6">
                <div className="flex items-center gap-2 mb-4">
                    <Clock className="h-5 w-5 text-gray-400" />
                    <h3 className="text-lg font-semibold text-white">Recent Submissions</h3>
                </div>
                <div className="space-y-3">
                    {recentSubmissions?.map((sub, idx) => (
                        <div
                            key={idx}
                            className="flex items-center justify-between py-3 border-b border-zinc-800 last:border-0"
                        >
                            <div className="flex items-center gap-3 flex-1">
                                <span className={`px-2 py-1 rounded text-xs font-medium ${getPlatformBadge(sub.platform)}`}>
                                    {sub.platform.toUpperCase()}
                                </span>
                                <div className="flex-1">
                                    <p className="font-medium text-gray-200 text-sm">{sub.problem}</p>
                                    <p className="text-xs text-gray-500">{sub.difficulty}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-xs text-gray-500">{sub.timeAgo}</span>
                                <span className={`font-semibold text-sm ${sub.verdict === 'AC' ? 'text-green-400' : 'text-red-400'
                                    }`}>
                                    {sub.verdict}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Row 5: Upsolve List */}
            {stats.upsolves && stats.upsolves.length > 0 && (
                <div className="bg-zinc-900 rounded-lg border border-zinc-800 p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <TrendingUp className="h-5 w-5 text-red-400" />
                        <h3 className="text-lg font-semibold text-white">Upsolve Tracker</h3>
                    </div>
                    <div className="space-y-3">
                        {stats.upsolves.map((prob, idx) => (
                            <div
                                key={idx}
                                className="flex items-center justify-between py-3 border-b border-zinc-800 last:border-0"
                            >
                                <div className="flex items-center gap-3 flex-1">
                                    <span className={`px-2 py-1 rounded text-xs font-medium ${getPlatformBadge(prob.platform)}`}>
                                        {prob.platform.toUpperCase()}
                                    </span>
                                    <div className="flex-1">
                                        <a href={prob.url} target="_blank" rel="noopener noreferrer" className="font-medium text-gray-200 text-sm hover:text-blue-400 transition-colors">
                                            {prob.title}
                                        </a>
                                        <p className="text-xs text-gray-500">Rating: {prob.difficulty || 'N/A'}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-xs text-gray-500">
                                        {new Date(prob.addedAt).toLocaleDateString()}
                                    </span>
                                    <a
                                        href={prob.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-3 py-1 bg-zinc-800 hover:bg-zinc-700 text-white text-xs rounded transition-colors"
                                    >
                                        Solve
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
