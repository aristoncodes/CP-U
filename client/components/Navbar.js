'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LogOut, User } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Navbar() {
    const pathname = usePathname();
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Check if user is authenticated
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token);
    }, [pathname]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/login');
    };

    // Public navigation links (not logged in)
    const publicLinks = [
        { name: 'Home', href: '/' },
        { name: 'Features', href: '/#features' },
    ];

    // Private navigation links (logged in)
    const privateLinks = [
        { name: 'Dashboard', href: '/dashboard' },
        { name: 'Problems', href: '/problems' },
        { name: 'Algorithms', href: '/algorithms' },
        { name: 'Upsolve', href: '/upsolve' },
    ];

    const navLinks = isAuthenticated ? privateLinks : publicLinks;

    return (
        <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link href={isAuthenticated ? '/dashboard' : '/'} className="flex items-center">
                        <span className="text-xl font-bold text-black">CP-U</span>
                    </Link>

                    {/* Navigation Links */}
                    <div className="hidden md:flex md:items-center md:space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`text-sm font-medium transition-colors hover:text-black ${pathname === link.href
                                        ? 'text-black'
                                        : 'text-gray-600'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Right Side Actions */}
                    <div className="flex items-center gap-3">
                        {isAuthenticated ? (
                            <>
                                {/* Profile Link */}
                                <Link
                                    href="/profile"
                                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
                                >
                                    <User className="h-4 w-4" />
                                    <span className="hidden sm:inline">Profile</span>
                                </Link>

                                {/* Logout Button */}
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                                >
                                    <LogOut className="h-4 w-4" />
                                    <span>Logout</span>
                                </button>
                            </>
                        ) : (
                            <>
                                {/* Login Button */}
                                <Link
                                    href="/login"
                                    className="rounded-md px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
                                >
                                    Login
                                </Link>

                                {/* Register Button */}
                                <Link
                                    href="/register"
                                    className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800"
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
