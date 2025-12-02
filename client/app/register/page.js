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
            setError('Passwords do not match');
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
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
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
            <div className="space-y-6">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-black">Create Account</h1>
                    <p className="mt-2 text-gray-600">Start your CP journey today</p>
                </div>

                {error && (
                    <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                            Username
                        </label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            placeholder="johndoe"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full rounded-md border border-gray-300 px-4 py-2 text-black placeholder-gray-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={handleChange}
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
                            name="password"
                            type="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full rounded-md border border-gray-300 px-4 py-2 text-black placeholder-gray-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                            Confirm Password
                        </label>
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            placeholder="••••••••"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full rounded-md border border-gray-300 px-4 py-2 text-black placeholder-gray-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-md bg-black px-4 py-2 font-semibold text-white transition-colors hover:bg-gray-800 disabled:bg-gray-400"
                    >
                        {loading ? 'Creating account...' : 'Sign Up'}
                    </button>
                </form>

                <div className="text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link href="/login" className="font-medium text-black hover:underline">
                        Sign in
                    </Link>
                </div>
            </div>
        </AuthLayout>
    );
}
