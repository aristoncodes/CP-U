'use client';

import { useState } from 'react';
import axios from 'axios';

export default function EditProfileModal({ user, isOpen, onClose, onSave }) {
    const [formData, setFormData] = useState({
        name: user?.name || '',
        bio: user?.bio || '',
        codeforces: user?.handles?.codeforces || '',
        leetcode: user?.handles?.leetcode || ''
    });
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            console.log('Updating profile...');
            console.log('URL:', `${process.env.NEXT_PUBLIC_API_URL}/api/user/profile`);
            console.log('Data:', formData);
            const res = await axios.put(
                `${process.env.NEXT_PUBLIC_API_URL}/api/user/profile`,
                formData,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            onSave(res.data);
            onClose();
        } catch (err) {
            console.error('Failed to update profile:', err);
            alert('Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-lg border border-zinc-800 bg-zinc-900 p-6 shadow-xl">
                <h2 className="mb-6 text-xl font-bold text-white">Edit Profile</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Display Name</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Bio</label>
                        <textarea
                            value={formData.bio}
                            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                            className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                            rows="3"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Codeforces Handle</label>
                            <input
                                type="text"
                                value={formData.codeforces}
                                onChange={(e) => setFormData({ ...formData, codeforces: e.target.value })}
                                className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                                placeholder="tourist"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">LeetCode Username</label>
                            <input
                                type="text"
                                value={formData.leetcode}
                                onChange={(e) => setFormData({ ...formData, leetcode: e.target.value })}
                                className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                                placeholder="johndoe"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded-md text-gray-400 hover:text-white hover:bg-zinc-800 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-500 transition-colors disabled:opacity-50"
                        >
                            {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
