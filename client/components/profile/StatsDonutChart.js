'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

export default function StatsDonutChart({ easy = 0, medium = 0, hard = 0, codeforces = 0 }) {
    const data = [
        { name: 'Easy (LC)', value: easy, color: '#22c55e' },
        { name: 'Medium (LC)', value: medium, color: '#eab308' },
        { name: 'Hard (LC)', value: hard, color: '#ef4444' },
        { name: 'Codeforces', value: codeforces, color: '#3b82f6' }
    ];

    const total = easy + medium + hard + codeforces;

    return (
        <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
            <h3 className="text-xl font-bold text-white mb-4">Problems Solved</h3>
            {total === 0 ? (
                <div className="h-64 flex items-center justify-center text-gray-500">
                    <p>No problems solved yet</p>
                </div>
            ) : (
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data.filter(d => d.value > 0)}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {data.filter(d => d.value > 0).map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#18181b',
                                    border: '1px solid #27272a',
                                    borderRadius: '0.5rem',
                                    color: '#ffffff'
                                }}
                            />
                            <Legend
                                formatter={(value, entry) => (
                                    <span style={{ color: '#d1d5db' }}>
                                        {value}: {entry.payload.value}
                                    </span>
                                )}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    );
}
