import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const API_URL = import.meta.env.VITE_API_URL;

function AuthPage() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); 

    const url = isLogin 
      ? `${API_URL}/api/auth/login` 
      : `${API_URL}/api/auth/signup`;

    try {
      const res = await axios.post(url, { email, password });

      if (isLogin) {

        const token = res.data.token;
        localStorage.setItem('token', token); 
        setMessage('Login Success! Redirecting to problems...');
        

        console.log("Token saved:", token);
        setTimeout(() => navigate('/problems'), 500);
        
      } else {

        setMessage('Signup Success! Please log in.');
        setIsLogin(true); 
      }

    } catch (err) {
      const errorMsg = err.response?.data?.error || 'An error occurred';
      setMessage(`Error: ${errorMsg}`);
      console.error(err);
    }
  };

  return (
    <div className="max-w-md">
      <h2 className="mb-4 text-lg font-semibold text-gray-100">
        {isLogin ? 'Login' : 'Sign Up'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm text-gray-400">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-gray-100 placeholder-gray-500 outline-none ring-0 transition focus:border-cpprimary focus:outline-none"
            placeholder="you@example.com"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-gray-400">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-gray-100 placeholder-gray-500 outline-none ring-0 transition focus:border-cpprimary"
            placeholder="••••••••"
          />
        </div>
        <button
          type="submit"
          className="inline-flex w-full items-center justify-center rounded-md bg-cpprimary px-4 py-2 text-sm font-medium text-gray-900 transition hover:bg-cpprimaryDark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cpprimary/60"
        >
          {isLogin ? 'Login' : 'Sign Up'}
        </button>
      </form>
      <button
        onClick={() => setIsLogin(!isLogin)}
        className="mt-3 w-full text-left text-sm text-cpprimary hover:text-cpprimaryDark transition"
      >
        {isLogin ? 'Need an account? Sign Up' : 'Have an account? Login'}
      </button>

      {message && (
        <div className="mt-4 rounded-md border border-gray-800 bg-gray-900 p-3 text-sm text-gray-200">
          <p className="whitespace-pre-wrap break-words m-0">{message}</p>
        </div>
      )}
    </div>
  );
}

export default AuthPage;