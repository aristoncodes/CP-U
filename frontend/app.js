import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [msg, setMsg] = useState('Loading...');
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (!API_URL) {
      setMsg("VITE_API_URL is not set");
      return;
    }

    axios.get(`${API_URL}/api/test`)
      .then(res => setMsg(res.data.message))
      .catch(err => setMsg(`Failed to connect to backend: ${err.message}`));
  }, [API_URL]);

  return <h1>Backend Status: {msg}</h1>;
}

export default App;