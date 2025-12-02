'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';
import Navbar from '@/components/Navbar';
import { BookOpen, Code2, ListChecks, Copy, Check } from 'lucide-react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

export default function AlgorithmTopicPage() {
    const router = useRouter();
    const params = useParams();
    const slug = params.topic;

    const [loading, setLoading] = useState(true);
    const [topic, setTopic] = useState(null);
    const [activeSection, setActiveSection] = useState('intro');
    const [copied, setCopied] = useState(false);
    const [solvedProblems, setSolvedProblems] = useState(new Set());

    useEffect(() => {
        const fetchTopic = async () => {
            // Check authentication
            const token = localStorage.getItem('token');
            if (!token) {
                router.push('/login');
                return;
            }

            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/topics/${slug}`);
                setTopic(response.data);
            } catch (err) {
                console.error('Failed to fetch topic:', err);
                router.push('/algorithms');
            } finally {
                setLoading(false);
            }
        };

        fetchTopic();
    }, [router, slug]);

    const scrollToSection = (sectionId) => {
        setActiveSection(sectionId);
        const element = document.getElementById(sectionId);
        if (element) {
            const offset = 100;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    const copyCode = async (code) => {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const toggleProblem = (problemName) => {
        const newSolved = new Set(solvedProblems);
        if (newSolved.has(problemName)) {
            newSolved.delete(problemName);
        } else {
            newSolved.add(problemName);
        }
        setSolvedProblems(newSolved);
    };

    const getDifficultyColor = (difficulty) => {
        switch (difficulty?.toLowerCase()) {
            case 'easy':
                return 'bg-green-100 text-green-700 border-green-300';
            case 'medium':
                return 'bg-yellow-100 text-yellow-700 border-yellow-300';
            case 'hard':
                return 'bg-red-100 text-red-700 border-red-300';
            default:
                return 'bg-gray-100 text-gray-700 border-gray-300';
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-white">
                <div className="text-center">
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-black mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading topic...</p>
                </div>
            </div>
        );
    }

    if (!topic) {
        return null; // Will redirect
    }

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="flex gap-8">
                    {/* Left Sidebar - Sticky */}
                    <aside className="hidden lg:block w-64 flex-shrink-0">
                        <div className="sticky top-8">
                            {/* Topic Info */}
                            <div className="mb-8 p-4 rounded-lg bg-gray-50 border border-gray-200">
                                <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-2">
                                    Topic Info
                                </h3>
                                <p className="text-sm text-gray-700 mb-3">
                                    {topic.problems?.length || 0} practice problems
                                </p>
                                <a
                                    href="#problems"
                                    className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                                >
                                    Jump to problems →
                                </a>
                            </div>

                            {/* Back to Topics */}
                            <Link
                                href="/algorithms"
                                className="flex items-center gap-2 text-sm text-gray-600 hover:text-black transition-colors"
                            >
                                ← Back to Topics
                            </Link>
                        </div>
                    </aside>

                    {/* Main Content - Max Width 800px */}
                    <main className="flex-1 max-w-[800px]">
                        {/* Hero Section */}
                        <div className="mb-12">
                            <div className="mb-4">
                                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-zinc-800 text-gray-300">
                                    {topic.tier} Tier
                                </span>
                            </div>
                            <h1 className="text-5xl font-bold text-black mb-4">{topic.title}</h1>
                            <p className="text-lg text-gray-600 mb-4">{topic.summary}</p>
                            <div className="flex flex-wrap gap-2">
                                {topic.tags.map((tag, idx) => (
                                    <span key={idx} className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="mb-16 prose prose-zinc prose-lg max-w-none">
                            <ReactMarkdown
                                remarkPlugins={[remarkMath]}
                                rehypePlugins={[rehypeKatex]}
                                components={{
                                    h1: ({ node, ...props }) => <h2 className="text-3xl font-bold text-black mb-6 mt-8" {...props} />,
                                    h2: ({ node, ...props }) => <h3 className="text-2xl font-bold text-black mt-8 mb-4" {...props} />,
                                    h3: ({ node, ...props }) => <h4 className="text-xl font-semibold text-black mt-6 mb-3" {...props} />,
                                    p: ({ node, ...props }) => <p className="text-gray-700 mb-4 leading-relaxed" {...props} />,
                                    ul: ({ node, ...props }) => <ul className="list-disc list-outside text-gray-700 space-y-2 mb-4 ml-6" {...props} />,
                                    ol: ({ node, ...props }) => <ol className="list-decimal list-outside text-gray-700 space-y-2 mb-4 ml-6" {...props} />,
                                    li: ({ node, ...props }) => <li className="text-gray-700" {...props} />,
                                    strong: ({ node, ...props }) => <strong className="font-bold text-gray-900" {...props} />,
                                    code: ({ node, inline, className, children, ...props }) => {
                                        const match = /language-(\w+)/.exec(className || '');
                                        return !inline && match ? (
                                            <SyntaxHighlighter
                                                language={match[1]}
                                                style={atomDark}
                                                customStyle={{
                                                    borderRadius: '0.5rem',
                                                    padding: '1.5rem',
                                                    fontSize: '0.875rem',
                                                    lineHeight: '1.5',
                                                }}
                                                showLineNumbers
                                            >
                                                {String(children).replace(/\n$/, '')}
                                            </SyntaxHighlighter>
                                        ) : (
                                            <code className="bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
                                                {children}
                                            </code>
                                        );
                                    },
                                    pre: ({ node, ...props }) => <div className="my-4" {...props} />,
                                    blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-4" {...props} />,
                                }}
                            >
                                {topic.content}
                            </ReactMarkdown>
                        </div>

                        {/* Code Template Section */}
                        {topic.codeTemplate && (
                            <div className="mb-16">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-3xl font-bold text-black">Code Template</h2>
                                    <button
                                        onClick={() => copyCode(topic.codeTemplate)}
                                        className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                                    >
                                        {copied ? (
                                            <>
                                                <Check className="h-4 w-4" />
                                                Copied!
                                            </>
                                        ) : (
                                            <>
                                                <Copy className="h-4 w-4" />
                                                Copy Code
                                            </>
                                        )}
                                    </button>
                                </div>

                                <SyntaxHighlighter
                                    language="cpp"
                                    style={atomDark}
                                    customStyle={{
                                        borderRadius: '0.5rem',
                                        padding: '1.5rem',
                                        fontSize: '0.875rem',
                                        lineHeight: '1.5',
                                    }}
                                    showLineNumbers
                                >
                                    {topic.codeTemplate}
                                </SyntaxHighlighter>
                            </div>
                        )}

                        {/* Practice Problems Section */}
                        <div id="problems" className="mb-16 scroll-mt-24">
                            <h2 className="text-3xl font-bold text-black mb-6">Practice Problems</h2>
                            <p className="text-gray-600 mb-6">
                                Hand-picked problems to help you master this topic. Start with easy problems and work your way up!
                            </p>

                            <div className="overflow-hidden rounded-lg border border-gray-200">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                Status
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                Problem
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                Difficulty
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                                Platform
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                        {topic.problems?.map((problem, idx) => (
                                            <tr key={idx} className="hover:bg-gray-50 transition-colors">
                                                <td className="whitespace-nowrap px-6 py-4">
                                                    <input
                                                        type="checkbox"
                                                        checked={solvedProblems.has(problem.name)}
                                                        onChange={() => toggleProblem(problem.name)}
                                                        className="h-5 w-5 rounded border-gray-300 text-green-600 focus:ring-green-500 cursor-pointer"
                                                    />
                                                </td>
                                                <td className="px-6 py-4">
                                                    <a
                                                        href={problem.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline"
                                                    >
                                                        {problem.name}
                                                    </a>
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4">
                                                    <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${getDifficultyColor(problem.difficulty)}`}>
                                                        {problem.difficulty}
                                                    </span>
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">
                                                    {problem.platform}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </main>

                    {/* Right Spacer (for visual balance on large screens) */}
                    <div className="hidden xl:block w-64 flex-shrink-0"></div>
                </div>
            </div>
        </div>
    );
}
