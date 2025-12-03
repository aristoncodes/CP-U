"use client";
import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const checkUserLoggedIn = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const config = {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    };
                    // Ideally verify token with backend here
                    // const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/user`, config);
                    // setUser(res.data);
                    setUser({ token }); // Temporary: just set token existence
                } catch (err) {
                    localStorage.removeItem('token');
                    setUser(null);
                }
            }
            setLoading(false);
        };
        checkUserLoggedIn();
    }, []);

    const login = async (email, password) => {
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, { email, password });
            localStorage.setItem('token', res.data.token);
            setUser({ token: res.data.token });
            router.push('/dashboard');
            return { success: true };
        } catch (err) {
            return { success: false, error: err.response?.data?.msg || 'Login failed' };
        }
    };

    const register = async (username, email, password) => {
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, { username, email, password });
            localStorage.setItem('token', res.data.token);
            setUser({ token: res.data.token });
            router.push('/dashboard');
            return { success: true };
        } catch (err) {
            return { success: false, error: err.response?.data?.msg || 'Registration failed' };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        router.push('/login');
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
