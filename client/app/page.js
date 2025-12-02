import { TrendingUp, Sparkles, Zap, Code2 } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white selection:bg-blue-600 selection:text-white">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center h-[85vh] px-4 text-center">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
          The Unified Ecosystem for <br />
          <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">Competitive Programmers</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mb-10">
          Aggregate stats, track progress, and upsolve smarter across Codeforces, LeetCode, and beyond—all in one place.
        </p>
        <div className="flex gap-4">
          <Link href="/register">
            <button className="px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg rounded-full hover:from-blue-500 hover:to-purple-500 transition-all transform hover:scale-105 shadow-lg shadow-blue-500/50">
              Get Started
            </button>
          </Link>
          <Link href="/login">
            <button className="px-10 py-4 border-2 border-white text-white font-bold text-lg rounded-full hover:bg-white hover:text-black transition-all transform hover:scale-105">
              Login
            </button>
          </Link>
        </div>
      </section>

      {/* Live Stats Ticker */}
      <section className="py-8 border-y border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-gradient-to-r dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center items-center gap-12 text-center">
            <div>
              <p className="text-4xl font-bold text-gray-900 dark:text-white">10,000+</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Problems Solved</p>
            </div>
            <div className="h-12 w-px bg-white/20"></div>
            <div>
              <p className="text-4xl font-bold text-gray-900 dark:text-white">500+</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Active Users</p>
            </div>
            <div className="h-12 w-px bg-white/20"></div>
            <div>
              <p className="text-4xl font-bold text-gray-900 dark:text-white">5+</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Platforms Integrated</p>
            </div>
          </div>
        </div>
      </section>

      {/* Value Propositions - 3 Cards */}
      <section className="py-20 px-4 md:px-10 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">Why CP-Universe?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Value Prop 1: Unified Ratings */}
          <div className="p-8 border border-gray-200 dark:border-white/20 rounded-2xl hover:border-blue-500 transition-all group bg-white dark:bg-gradient-to-br dark:from-zinc-900 dark:to-zinc-950">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Unified Ratings</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              See your Codeforces, LeetCode, and CodeChef ratings in one dashboard. Track your growth across all platforms effortlessly.
            </p>
          </div>

          {/* Value Prop 2: AI Hints */}
          <div className="p-8 border border-gray-200 dark:border-white/20 rounded-2xl hover:border-purple-500 transition-all group bg-white dark:bg-gradient-to-br dark:from-zinc-900 dark:to-zinc-950">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-3">AI Hints</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Get intelligent, progressive hints powered by AI. Learn problem-solving patterns without spoiling the solution.
            </p>
          </div>

          {/* Value Prop 3: Auto-Upsolving */}
          <div className="p-8 border border-gray-200 dark:border-white/20 rounded-2xl hover:border-green-500 transition-all group bg-white dark:bg-gradient-to-br dark:from-zinc-900 dark:to-zinc-950">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Auto-Upsolving</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Automatically track problems you couldn't solve in contests. Build your upsolve queue and master every missed problem.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-white/10 py-12 mt-20 bg-gray-50 dark:bg-transparent">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <Code2 className="w-6 h-6" />
              <span className="text-xl font-bold">CP-Universe</span>
            </div>
            <div className="flex gap-8 text-gray-600 dark:text-gray-400">
              <Link href="/login" className="hover:text-gray-900 dark:hover:text-white transition-colors">Login</Link>
              <Link href="/register" className="hover:text-gray-900 dark:hover:text-white transition-colors">Sign Up</Link>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 dark:hover:text-white transition-colors">GitHub</a>
              <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Docs</a>
            </div>
            <p className="text-gray-500 text-sm">© 2025 CP-Universe. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
