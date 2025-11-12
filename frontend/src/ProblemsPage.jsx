import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

function ProblemsPage() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/problems`);
        setProblems(res.data.problems || []);
      } catch (e) {
        setError(e.response?.data?.error || 'Failed to load problems');
      } finally {
        setLoading(false);
      }
    };
    fetchProblems();
  }, []);

  return (
    <section className="rounded-lg border border-gray-800 bg-cpcard p-6 shadow-lg shadow-black/20">
      <h2 className="mb-4 text-xl font-semibold text-gray-100">Problems</h2>
      {loading ? (
        <p className="text-sm text-gray-400">Loading...</p>
      ) : error ? (
        <p className="text-sm text-red-400">{error}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="text-gray-400">
              <tr className="text-left">
                <th className="py-2 pr-4">Code</th>
                <th className="py-2 pr-4">Title</th>
                <th className="py-2 pr-4">Difficulty</th>
              </tr>
            </thead>
            <tbody>
              {problems.map((p) => (
                <tr key={p.id} className="border-t border-gray-800 hover:bg-gray-900/50">
                  <td className="py-2 pr-4 text-cpprimary">{p.code}</td>
                  <td className="py-2 pr-4 text-gray-200">{p.title}</td>
                  <td className="py-2 pr-4 text-gray-400">{p.difficulty}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {problems.length === 0 && (
            <p className="mt-3 text-sm text-gray-500">No problems yet.</p>
          )}
        </div>
      )}
    </section>
  );
}

export default ProblemsPage;

