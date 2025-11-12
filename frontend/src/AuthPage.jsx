import React, { useState } from 'react';
import axios from 'axios';


const API_URL = import.meta.env.VITE_API_URL;

function AuthPage() {
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
        setMessage(`Login Success! Your token is: ${token}`);
        

        console.log("Token saved:", token);
        
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
    <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
            style={{ width: '100%', padding: '8px', margin: '8px 0' }}
          />
        </div>
        <div>
          <label>Password:</label>
          <input 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', margin: '8px 0' }}
          />
        </div>
        <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>
          {isLogin ? 'Login' : 'Sign Up'}
        </button>
      </form>
      <button 
        onClick={() => setIsLogin(!isLogin)} 
        style={{ marginTop: '10px', background: 'none', border: 'none', color: 'blue', cursor: 'pointer' }}
      >
        {isLogin ? 'Need an account? Sign Up' : 'Have an account? Login'}
      </button>


      {message && (
        <div style={{ marginTop: '20px', padding: '10px', background: '#f0f0f0', border: '1px solid #ccc', borderRadius: '5px' }}>
          <p style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{message}</p>
        </div>
      )}
    </div>
  );
}

export default AuthPage;