const axios = require('axios');
const Upsolve = require('../models/Upsolve');
const User = require('../models/User');

const syncEngine = {
    syncUser: async (userId) => {
        const user = await User.findById(userId);
        if (!user) throw new Error('User not found');

        const results = {
            codeforces: { added: 0, removed: 0 },
            leetcode: { added: 0, removed: 0 }
        };

        // 1. Sync Codeforces
        if (user.handles.codeforces) {
            try {
                const cfStats = await syncCodeforces(user._id, user.handles.codeforces);
                results.codeforces = cfStats;
            } catch (err) {
                console.error('Codeforces Sync Error:', err.message);
            }
        }

        // 2. Sync LeetCode
        if (user.handles.leetcode) {
            try {
                const lcStats = await syncLeetCode(user._id, user.handles.leetcode);
                results.leetcode = lcStats;
            } catch (err) {
                console.error('LeetCode Sync Error:', err.message);
            }
        }

        return results;
    }
};

async function syncCodeforces(userId, handle) {
    const stats = { added: 0, removed: 0 };

    try {
        // 1. Fetch User's Contest History
        const historyResponse = await axios.get(`https://codeforces.com/api/user.rating?handle=${handle}`);
        const allContests = historyResponse.data.result.reverse();
        const contests = allContests.slice(0, 10); // Last 10 contests

        // Update User's Last Contest Info & Find Missed Contests
        if (allContests.length > 0) {
            const lastContest = allContests[0];

            // Fetch ALL contests to find what was missed
            const globalContestsResponse = await axios.get('https://codeforces.com/api/contest.list?gym=false');
            const globalContests = globalContestsResponse.data.result;

            // Get list of contest IDs the user participated in
            const participatedContestIds = new Set(allContests.map(c => c.contestId));

            // Calculate 30 days ago timestamp
            const thirtyDaysAgo = Date.now() / 1000 - (30 * 24 * 60 * 60);

            // Filter: Started in last 30 days, is FINISHED, is a standard round, and user DIDN'T participate
            const missed = globalContests.filter(c =>
                c.startTimeSeconds > thirtyDaysAgo &&  // Last 30 days
                c.phase === 'FINISHED' &&  // Contest is over
                !participatedContestIds.has(c.id) &&  // User didn't participate
                (c.name.includes('Div.') || c.name.includes('Global') || c.name.includes('Educational'))  // Standard rounds
            ).sort((a, b) => b.startTimeSeconds - a.startTimeSeconds); // Newest first

            await User.findByIdAndUpdate(userId, {
                'stats.codeforces.lastContest': {
                    contestId: lastContest.contestId,
                    contestName: lastContest.contestName,
                    timeSeconds: lastContest.ratingUpdateTimeSeconds
                },
                'stats.codeforces.missedContests': missed.map(c => ({
                    id: c.id,
                    name: c.name,
                    startTime: c.startTimeSeconds
                }))
            });
        }

        // 2. Fetch User's Submissions (to check what's solved)
        // We fetch a larger batch to ensure we cover the period of these 10 contests + recent upsolves
        const subsResponse = await axios.get(`https://codeforces.com/api/user.status?handle=${handle}&from=1&count=1000`);
        const submissions = subsResponse.data.result;

        // Create a Set of solved problem IDs (contestId + index)
        const solvedSet = new Set();
        submissions.forEach(sub => {
            if (sub.verdict === 'OK') {
                solvedSet.add(`${sub.problem.contestId}${sub.problem.index}`);
            }
        });

        // 3. Iterate through last 10 contests
        for (const contest of contests) {
            const contestId = contest.contestId;
            const contestName = contest.contestName;

            // Determine Division
            let isDiv2 = contestName.includes('Div. 2');
            let isDiv3 = contestName.includes('Div. 3');
            let isDiv4 = contestName.includes('Div. 4');

            // Fetch contest problems
            // Note: Codeforces API doesn't have a direct "get contest problems" endpoint that is lightweight.
            // We usually use contest.standings with from=1&count=1 to get problem list.
            try {
                const contestData = await axios.get(`https://codeforces.com/api/contest.standings?contestId=${contestId}&from=1&count=1`);
                const problems = contestData.data.result.problems;

                for (const problem of problems) {
                    const problemId = `${problem.contestId}${problem.index}`;
                    const index = problem.index; // "A", "B", "C", etc.

                    // Check if already solved
                    if (solvedSet.has(problemId)) {
                        // If it's in our DB, remove it (Auto-remove logic)
                        const removed = await Upsolve.findOneAndDelete({ userId, platform: 'codeforces', problemId });
                        if (removed) stats.removed++;
                        continue;
                    }

                    // Filtering Logic
                    let shouldAdd = false;

                    if (isDiv3 || isDiv4) {
                        // Div 3/4: Add ALL unsolved
                        shouldAdd = true;
                    } else if (isDiv2) {
                        // Div 2: Add only A, B, C, D
                        if (['A', 'B', 'C', 'D'].includes(index)) {
                            shouldAdd = true;
                        }
                    } else {
                        // For other contests (Div 1, Global, etc.), maybe default to A-C or just skip? 
                        // User asked specifically for Div 2 and Div 3/4 logic. 
                        // Let's be safe and include A-C for others or just ignore. 
                        // Let's assume standard Div 2 logic for mixed/others for now to be helpful.
                        if (['A', 'B', 'C'].includes(index)) {
                            shouldAdd = true;
                        }
                    }

                    if (shouldAdd) {
                        // Add to Upsolve DB if not exists
                        const exists = await Upsolve.findOne({ userId, platform: 'codeforces', problemId });
                        if (!exists) {
                            await Upsolve.create({
                                userId,
                                platform: 'codeforces',
                                problemId,
                                title: problem.name,
                                url: `https://codeforces.com/contest/${contestId}/problem/${index}`,
                                difficulty: problem.rating || 0
                            });
                            stats.added++;
                        }
                    }
                }
            } catch (err) {
                console.error(`Failed to fetch problems for contest ${contestId}:`, err.message);
            }
        }

    } catch (err) {
        console.error('Codeforces Sync Error:', err.message);
    }

    return stats;
}

async function syncLeetCode(userId, username) {
    const stats = { added: 0, removed: 0 };

    // Fetch recent submissions
    const response = await axios.get(`https://alfa-leetcode-api.onrender.com/userSubmission/${username}?limit=20`);
    const submissions = response.data.submission; // Note: API structure might vary, assuming 'submission' array based on common wrappers

    if (!submissions || !Array.isArray(submissions)) return stats;

    for (const sub of submissions) {
        const problemId = sub.titleSlug;
        const title = sub.title;
        const url = `https://leetcode.com/problems/${sub.titleSlug}/`;
        const isAccepted = sub.statusDisplay === 'Accepted';

        if (isAccepted) {
            // Auto-Remove
            const removed = await Upsolve.findOneAndDelete({ userId, platform: 'leetcode', problemId });
            if (removed) stats.removed++;
        } else {
            // Auto-Add
            const exists = await Upsolve.findOne({ userId, platform: 'leetcode', problemId });
            if (!exists) {
                // Check if solved in batch
                const isSolvedInBatch = submissions.some(s => s.titleSlug === problemId && s.statusDisplay === 'Accepted');

                if (!isSolvedInBatch) {
                    await Upsolve.create({
                        userId,
                        platform: 'leetcode',
                        problemId,
                        title,
                        url,
                        difficulty: 0 // LeetCode difficulty not always in submission list, default to 0
                    });
                    stats.added++;
                }
            }
        }
    }
    return stats;
}

module.exports = syncEngine;
