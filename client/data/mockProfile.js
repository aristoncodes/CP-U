// Mock profile data for Codolio-style dashboard

export const mockProfile = {
    user: {
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
        name: 'John Doe',
        username: 'johndoe',
        bio: 'Competitive programmer passionate about algorithms and data structures. Love solving challenging problems and learning new techniques.',
        social: {
            github: 'https://github.com/johndoe',
            linkedin: 'https://linkedin.com/in/johndoe',
            twitter: 'https://twitter.com/johndoe'
        },
        skills: ['C++', 'Python', 'Java', 'Algorithms', 'Data Structures', 'Dynamic Programming', 'Graphs']
    },

    stats: {
        totalSolved: 450,
        activeDays: 120,
        maxStreak: 42,
        problemBreakdown: {
            easy: 180,
            medium: 210,
            hard: 60
        }
    },

    platforms: {
        codeforces: {
            handle: 'johndoe',
            currentRating: 1450,
            maxRating: 1520,
            rank: 'Specialist',
            color: 'cyan',
            contestsParticipated: 32
        },
        leetcode: {
            handle: 'johndoe',
            globalRanking: 12453,
            totalSolved: 320,
            contestRating: 1650,
            easy: 120,
            medium: 150,
            hard: 50
        },
        codechef: {
            handle: 'johndoe',
            stars: 3,
            rating: 1645,
            maxRating: 1700,
            division: 'Division 2'
        }
    },

    recentSubmissions: [
        {
            problem: 'Two Sum',
            platform: 'leetcode',
            verdict: 'AC',
            timeAgo: '2 hours ago',
            difficulty: 'Easy'
        },
        {
            problem: 'Longest Substring Without Repeating Characters',
            platform: 'leetcode',
            verdict: 'AC',
            timeAgo: '5 hours ago',
            difficulty: 'Medium'
        },
        {
            problem: 'Maximum Subarray Sum',
            platform: 'codeforces',
            verdict: 'WA',
            timeAgo: '1 day ago',
            difficulty: 'Hard'
        },
        {
            problem: 'Binary Search',
            platform: 'cses',
            verdict: 'AC',
            timeAgo: '1 day ago',
            difficulty: 'Easy'
        },
        {
            problem: 'Graph Traversal',
            platform: 'codechef',
            verdict: 'AC',
            timeAgo: '2 days ago',
            difficulty: 'Medium'
        }
    ],

    // Activity heatmap data (52 weeks x 7 days)
    activityData: generateActivityData()
};

// Generate random activity data for the heatmap
function generateActivityData() {
    const weeks = 52;
    const days = 7;
    const data = [];

    for (let week = 0; week < weeks; week++) {
        const weekData = [];
        for (let day = 0; day < days; day++) {
            // More activity on weekdays, less on weekends
            const isWeekend = day === 0 || day === 6;
            const maxActivity = isWeekend ? 3 : 8;
            const activity = Math.floor(Math.random() * maxActivity);
            weekData.push(activity);
        }
        data.push(weekData);
    }

    return data;
}
