export default function AuthLayout({ children, testimonial }) {
    return (
        <div className="flex min-h-screen">
            {/* Left Side - Dark Section with Testimonial */}
            <div className="hidden lg:flex lg:w-1/2 flex-col justify-between bg-black p-12 text-white">
                <div>
                    <h2 className="text-3xl font-bold">CP-U</h2>
                    <p className="mt-2 text-gray-400">Your Competitive Programming Universe</p>
                </div>

                {testimonial && (
                    <div className="mt-auto">
                        <blockquote className="text-lg italic">
                            "{testimonial.quote}"
                        </blockquote>
                        <p className="mt-4 text-sm text-gray-400">
                            — {testimonial.author}
                        </p>
                    </div>
                )}
            </div>

            {/* Right Side - Form Section */}
            <div className="flex w-full items-center justify-center bg-white p-8 lg:w-1/2">
                <div className="w-full max-w-md">
                    {children}
                </div>
            </div>
        </div>
    );
}
