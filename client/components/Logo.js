import React from 'react';

export default function Logo({ className = "w-10 h-10" }) {
    return (
        <svg
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            {/* Glow Filter */}
            <defs>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                <linearGradient id="shieldGrad" x1="100" y1="0" x2="100" y2="200">
                    <stop offset="0%" stopColor="#34D399" />
                    <stop offset="100%" stopColor="#059669" />
                </linearGradient>
            </defs>

            {/* Shield Base */}
            <path d="M100 180C100 180 170 140 170 60V30L100 10L30 30V60C30 140 100 180 100 180Z"
                stroke="url(#shieldGrad)" strokeWidth="8" fill="#111827" />

            {/* Inner Pixelated Brackets */}
            <g filter="url(#glow)">
                <path d="M80 70 L60 95 L80 120" stroke="#34D399" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M120 70 L140 95 L120 120" stroke="#34D399" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M90 125 L110 65" stroke="#10B981" strokeWidth="6" strokeLinecap="round" strokeOpacity="0.8" />
            </g>

            {/* CPU Pins Detail */}
            <rect x="90" y="145" width="20" height="4" fill="#34D399" />
            <rect x="90" y="155" width="20" height="4" fill="#34D399" />
        </svg>
    );
}
