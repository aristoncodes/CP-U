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
            <div className="space-y-6">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-black">Welcome Back</h1>
                    <p className="mt-2 text-gray-600">Sign in to continue to CP-U</p>
                </div>

                {error && (
                    <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full rounded-md border border-gray-300 px-4 py-2 text-black placeholder-gray-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full rounded-md border border-gray-300 px-4 py-2 text-black placeholder-gray-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-md bg-black px-4 py-2 font-semibold text-white transition-colors hover:bg-gray-800 disabled:bg-gray-400"
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                <div className="text-center text-sm text-gray-600">
                    Don't have an account?{' '}
                    <Link href="/register" className="font-medium text-black hover:underline">
                        Sign up
                    </Link>
                </div>
            </div>
        </AuthLayout>
    );
}
