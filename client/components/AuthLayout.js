export default function AuthLayout({ children, testimonial }) {
    return (
        <div className="dark flex min-h-screen bg-slate-900 text-slate-50 font-sans selection:bg-blue-500 selection:text-white relative overflow-hidden">
            {/* CRT Overlay Effects */}
            <div className="crt-overlay absolute inset-0 z-50 pointer-events-none"></div>
            <div className="scanline absolute inset-0 z-50 pointer-events-none"></div>

            {/* Left Side - Dark Section with Testimonial */}
            <div className="hidden lg:flex lg:w-1/2 flex-col justify-between bg-slate-800 p-12 border-r-2 border-blue-500 relative overflow-hidden">
                {/* Background Grid Effect */}
                <div className="absolute inset-0 opacity-20 pointer-events-none"
                    style={{
                        backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.5) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(59, 130, 246, 0.5) 1px, transparent 1px)`,
                        backgroundSize: '40px 40px'
                    }}
                ></div>

                <div className="relative z-10">
                    <h2 className="text-5xl font-heading text-white glow-text animate-glitch">CP-U</h2>
                    <p className="mt-2 text-blue-400 font-retro text-xs tracking-widest uppercase">System Online // Ready Player One</p>
                </div>

                {testimonial && (
                    <div className="mt-auto relative z-10">
                        <div className="card-retro bg-slate-900/90 backdrop-blur-sm border-blue-500 box-shadow-neon">
                            <blockquote className="text-lg font-mono text-gray-300 italic">
                                <span className="text-blue-500 mr-2">&gt;</span>
                                "{testimonial.quote}"
                            </blockquote>
                            <p className="mt-4 text-xs font-retro text-blue-400 uppercase">
                                — {testimonial.author}
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* Right Side - Form Section */}
            <div className="flex w-full items-center justify-center bg-slate-900 p-8 lg:w-1/2 relative">
                {/* Mobile Background Grid */}
                <div className="absolute inset-0 opacity-10 pointer-events-none lg:hidden"
                    style={{
                        backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.5) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(59, 130, 246, 0.5) 1px, transparent 1px)`,
                        backgroundSize: '20px 20px'
                    }}
                ></div>

                <div className="w-full max-w-md relative z-10">
                    {children}
                </div>
            </div>
        </div>
    );
}
