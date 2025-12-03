'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthLayout from '@/components/AuthLayout';
import Link from 'next/link';
import axios from 'axios';

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Validate passwords match
        if (formData.password !== formData.confirmPassword) {
            setError('PASSCODES DO NOT MATCH');
            return;
        }

        setLoading(true);

        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
            const response = await axios.post(`${apiUrl}/api/auth/register`, {
                username: formData.username,
                email: formData.email,
                password: formData.password,
            });

            // Save token to localStorage
            localStorage.setItem('token', response.data.token);

            // Redirect to dashboard
            router.push('/dashboard');
        } catch (err) {
            console.error('Registration Error:', err);
            const errorMsg = err.response?.data?.message ||
                err.response?.data?.msg ||
                err.message ||
                'REGISTRATION FAILED. TRY AGAIN.';
            setError(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    const testimonial = {
        quote: "Joining CP-U was the best decision for my competitive programming career. The insights are invaluable!",
        author: "Sarah Johnson, LeetCode Knight"
    };

    return (
        <AuthLayout testimonial={testimonial}>
            <div className="space-y-6 card-retro bg-panel border-accent/30 p-8 box-shadow-neon">
                <div className="text-center">
                    <h1 className="text-3xl font-heading text-white glow-text">
                        NEW GAME<span className="animate-blink">_</span>
                    </h1>
                    <p className="mt-2 text-gray-400 font-mono text-sm uppercase tracking-widest">Initialize Character Creation</p>
                </div>

                {error && (
                    <div className="pixel-border bg-red-900/20 border-red-500 p-3 text-sm text-red-400 font-mono uppercase">
                        [ERROR] {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="username" className="block text-xs font-retro text-accent uppercase tracking-wider">
                            Character Name
                        </label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            placeholder="PLAYER_ONE"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full bg-slate-900 border-2 border-slate-700 px-4 py-3 text-white placeholder-gray-600 font-mono focus:border-accent focus:outline-none focus:ring-0 transition-colors uppercase"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="email" className="block text-xs font-retro text-accent uppercase tracking-wider">
                            User ID (Email)
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="PLAYER@EXAMPLE.COM"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full bg-slate-900 border-2 border-slate-700 px-4 py-3 text-white placeholder-gray-600 font-mono focus:border-accent focus:outline-none focus:ring-0 transition-colors uppercase"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="password" className="block text-xs font-retro text-accent uppercase tracking-wider">
                            Passcode
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full bg-slate-900 border-2 border-slate-700 px-4 py-3 text-white placeholder-gray-600 font-mono focus:border-accent focus:outline-none focus:ring-0 transition-colors"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="confirmPassword" className="block text-xs font-retro text-accent uppercase tracking-wider">
                            Confirm Passcode
                        </label>
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            placeholder="••••••••"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full bg-slate-900 border-2 border-slate-700 px-4 py-3 text-white placeholder-gray-600 font-mono focus:border-accent focus:outline-none focus:ring-0 transition-colors"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full btn-arcade mt-4 hover:bg-accent hover:text-white transition-all duration-200 animate-pulse hover:animate-none"
                    >
                        {loading ? 'INITIALIZING...' : 'JOIN SERVER'}
                    </button>
                </form>

                <div className="text-center text-sm font-mono text-gray-500 uppercase">
                    Already Registered?{' '}
                    <Link href="/login" className="text-accent hover:text-blue-400 hover:underline">
                        Resume Game
                    </Link>
                </div>
            </div>
        </AuthLayout>
    );
}
