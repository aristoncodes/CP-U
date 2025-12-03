'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthLayout from '@/components/AuthLayout';
import Link from 'next/link';
import axios from 'axios';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
            const response = await axios.post(`${apiUrl}/api/auth/login`, {
                email,
                password,
            });

            // Save token to localStorage
            localStorage.setItem('token', response.data.token);

            // Redirect to dashboard
            router.push('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const testimonial = {
        quote: "CP-U transformed the way I track my competitive programming journey. It's like having a personal coach!",
        author: "Alex Chen, Codeforces Expert"
    };

    return (
        <AuthLayout testimonial={testimonial}>
            <div className="space-y-6 card-retro bg-panel border-accent/30 p-8 box-shadow-neon">
                <div className="text-center">
                    <h1 className="text-3xl font-heading text-white glow-text">
                        PLAYER 1 READY<span className="animate-blink">?</span>
                    </h1>
                    <p className="mt-2 text-gray-400 font-mono text-sm uppercase tracking-widest">Insert Coin to Continue</p>
                </div>

                {error && (
                    <div className="pixel-border bg-red-900/20 border-red-500 p-3 text-sm text-red-400 font-mono uppercase">
                        [ERROR] {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="email" className="block text-xs font-retro text-accent uppercase tracking-wider">
                            User ID (Email)
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="PLAYER_ONE@EXAMPLE.COM"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-core border-2 border-slate-700 px-4 py-3 text-white placeholder-gray-600 font-mono focus:border-accent focus:outline-none focus:ring-0 transition-colors uppercase"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="password" className="block text-xs font-retro text-accent uppercase tracking-wider">
                            Passcode
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-core border-2 border-slate-700 px-4 py-3 text-white placeholder-gray-600 font-mono focus:border-accent focus:outline-none focus:ring-0 transition-colors"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full btn-arcade mt-4 hover:bg-accent hover:text-white transition-all duration-200 animate-pulse hover:animate-none"
                    >
                        {loading ? 'CONNECTING...' : 'PRESS START'}
                    </button>
                </form>

                <div className="text-center text-sm font-mono text-gray-500 uppercase">
                    New Player?{' '}
                    <Link href="/register" className="text-accent hover:text-blue-400 hover:underline">
                        Join Server
                    </Link>
                </div>
            </div>
        </AuthLayout>
    );
}
