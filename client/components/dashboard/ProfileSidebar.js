import { Github, Linkedin, Twitter } from 'lucide-react';

export default function ProfileSidebar({ user, onEditProfile }) {
    if (!user) return null;

    return (
        <aside className="sticky top-20 h-fit">
            <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-6">
                {/* Avatar */}
                <div className="mb-6 text-center">
                    <img
                        src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`}
                        alt={user.name}
                        className="w-32 h-32 rounded-full mx-auto border-4 border-zinc-800"
                    />
                </div>

                {/* Name & Username */}
                <div className="text-center mb-4">
                    <h2 className="text-2xl font-bold text-white">{user.name || user.username}</h2>
                    <p className="text-gray-400">@{user.username}</p>
                </div>

                {/* Bio */}
                <p className="text-sm text-gray-300 text-center mb-6 leading-relaxed">
                    {user.bio || "No bio yet."}
                </p>

                {/* Social Links */}
                <div className="flex justify-center gap-3 mb-6">
                    <a
                        href={user.social?.github || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full border border-zinc-700 hover:bg-zinc-800 transition-colors"
                        aria-label="GitHub"
                    >
                        <Github className="h-5 w-5 text-gray-300" />
                    </a>
                    <a
                        href={user.social?.linkedin || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full border border-zinc-700 hover:bg-zinc-800 transition-colors"
                        aria-label="LinkedIn"
                    >
                        <Linkedin className="h-5 w-5 text-gray-300" />
                    </a>
                    <a
                        href={user.social?.twitter || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full border border-zinc-700 hover:bg-zinc-800 transition-colors"
                        aria-label="Twitter"
                    >
                        <Twitter className="h-5 w-5 text-gray-300" />
                    </a>
                </div>

                {/* Edit Profile Button */}
                <button
                    onClick={onEditProfile}
                    className="w-full border-2 border-zinc-700 rounded-lg py-2 font-semibold text-gray-300 hover:bg-zinc-800 transition-colors"
                >
                    Edit Profile
                </button>

                {/* Skills */}
                <div className="mt-6 pt-6 border-t border-zinc-800">
                    <h3 className="text-sm font-semibold text-gray-300 mb-3">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                        {user.skills?.map((skill, idx) => (
                            <span
                                key={idx}
                                className="px-3 py-1 bg-zinc-800 text-gray-300 rounded-full text-sm font-medium border border-zinc-700"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </aside>
    );
}
