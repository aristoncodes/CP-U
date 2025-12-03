export default function AuthLayout({ children, testimonial }) {
    return (
        <div className="flex min-h-screen bg-core text-primary font-sans selection:bg-accent selection:text-white relative overflow-hidden">
            {/* CRT Overlay Effects */}
            <div className="crt-overlay absolute inset-0 z-50 pointer-events-none"></div>
            <div className="scanline absolute inset-0 z-50 pointer-events-none"></div>

            {/* Left Side - Dark Section with Testimonial */}
            <div className="hidden lg:flex lg:w-1/2 flex-col justify-between bg-panel p-12 border-r-2 border-accent relative overflow-hidden">
                {/* Background Grid Effect */}
                <div className="absolute inset-0 opacity-10 pointer-events-none"
                    style={{
                        backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.5) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(59, 130, 246, 0.5) 1px, transparent 1px)`,
                        backgroundSize: '40px 40px'
                    }}
                ></div>

                <div className="relative z-10">
                    <h2 className="text-4xl font-heading text-white glow-text">CP-U</h2>
                    <p className="mt-2 text-accent font-retro text-xs tracking-widest">Your Competitive Programming Universe</p>
                </div>

                {testimonial && (
                    <div className="mt-auto relative z-10">
                        <div className="card-retro bg-core/80 backdrop-blur-sm border-accent/50">
                            <blockquote className="text-lg font-mono text-gray-300 italic">
                                "{testimonial.quote}"
                            </blockquote>
                            <p className="mt-4 text-sm font-retro text-accent">
                                — {testimonial.author}
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* Right Side - Form Section */}
            <div className="flex w-full items-center justify-center bg-core p-8 lg:w-1/2 relative">
                {/* Mobile Background Grid */}
                <div className="absolute inset-0 opacity-5 pointer-events-none lg:hidden"
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
