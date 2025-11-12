import React from 'react';
import AuthPage from './AuthPage'; 

function App() {
  return (
    <div className="min-h-screen bg-cpbg">
      <header className="border-b border-gray-800 bg-cpcard/60 backdrop-blur">
        <div className="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-cpprimary animate-pulse" />
            <h1 className="text-lg font-semibold tracking-wide text-gray-100">CP-U</h1>
          </div>
          <nav className="text-sm text-gray-400">
            <a className="hover:text-gray-200 transition-colors" href="#">Problems</a>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-10">
        <div className="grid md:grid-cols-2 gap-8">
          <section className="rounded-lg border border-gray-800 bg-cpcard p-6 shadow-lg shadow-black/20">
            <h2 className="mb-2 text-xl font-semibold text-gray-100">Welcome</h2>
            <p className="text-sm text-gray-400">
              Practice and compete like on Codeforces/CSES — minimal, fast, and focused.
            </p>
          </section>
          <section className="rounded-lg border border-gray-800 bg-cpcard p-6 shadow-lg shadow-black/20">
            <AuthPage />
          </section>
        </div>
      </main>
      <footer className="border-t border-gray-800 py-6 text-center text-xs text-gray-500">
        Built for speed — CP style.
      </footer>
    </div>
  );
}

export default App;