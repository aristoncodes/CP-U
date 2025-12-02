const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const axios = require('axios');
const fetchLeetCodeStats = require('../utils/leetcodeDirect');

// @route   GET /api/profile/stats
// @desc    Get aggregated stats from Codeforces and LeetCode
// @access  Private
router.get('/stats', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ msg: 'User not found' });

        // Initialize stats with saved data
        const stats = {
            codeforces: user.stats?.codeforces || null,
            leetcode: user.stats?.leetcode || null
        };

        let needsSave = false;

        // 1. Fetch Codeforces Stats (if handle exists)
        if (user.handles.codeforces) {
            try {
                // Fetch user info (rating, rank)
                const cfResponse = await axios.get(`https://codeforces.com/api/user.info?handles=${user.handles.codeforces}`);

                if (cfResponse.data.status === 'OK') {
                    const cfData = cfResponse.data.result[0];

                    // Fetch user submissions to count solved problems (limit to recent 1000)
                    let problemsSolved = 0;
                    try {
                        console.log(`Fetching Codeforces submissions for ${user.handles.codeforces}...`);
                        const submissionsResponse = await axios.get(
                            `https://codeforces.com/api/user.status?handle=${user.handles.codeforces}&from=1&count=1000`,
                            { timeout: 10000 } // 10 second timeout
                        );

                        if (submissionsResponse.data.status === 'OK') {
                            // Count unique problems with verdict "OK"
                            const solvedProblems = new Set();
                            submissionsResponse.data.result.forEach(submission => {
                                if (submission.verdict === 'OK' && submission.problem) {
                                    const problemKey = `${submission.problem.contestId}-${submission.problem.index}`;
                                    solvedProblems.add(problemKey);
                                }
                            });
                            problemsSolved = solvedProblems.size;
                            console.log(`Codeforces problems solved: ${problemsSolved}`);
                        }
                    } catch (submissionsErr) {
                        console.error('Failed to fetch Codeforces submissions:', submissionsErr.message);
                        // Try to use cached value if available
                        if (user.stats?.codeforces?.problemsSolved) {
                            problemsSolved = user.stats.codeforces.problemsSolved;
                            console.log(`Using cached Codeforces problems count: ${problemsSolved}`);
                        }
                    }

                    const newCfStats = {
                        rating: cfData.rating || 0,
                        rank: cfData.rank || 'Unrated',
                        maxRating: cfData.maxRating || 0,
                        handle: cfData.handle,
                        problemsSolved: problemsSolved
                    };

                    // Preserve lastContest and missedContests from DB if they exist
                    if (user.stats?.codeforces?.lastContest) {
                        newCfStats.lastContest = user.stats.codeforces.lastContest;
                    }
                    if (user.stats?.codeforces?.missedContests) {
                        newCfStats.missedContests = user.stats.codeforces.missedContests;
                    }

                    // Update stats object
                    stats.codeforces = newCfStats;

                    // Update user object for persistence (without overwriting contest data)
                    if (!user.stats) user.stats = {};
                    if (!user.stats.codeforces) user.stats.codeforces = {};

                    user.stats.codeforces.rating = newCfStats.rating;
                    user.stats.codeforces.rank = newCfStats.rank;
                    user.stats.codeforces.maxRating = newCfStats.maxRating;
                    user.stats.codeforces.problemsSolved = newCfStats.problemsSolved;
                    // Don't overwrite lastContest or missedContests - those are only set by sync

                    needsSave = true;
                }
            } catch (err) {
                console.error('Codeforces Profile Error:', err.message);
                // Keep old stats if fetch fails, or set error if no old stats
                if (!stats.codeforces) stats.codeforces = { error: 'Failed to fetch data' };
            }
        }

        // 2. Fetch LeetCode Stats (Direct GraphQL)
        if (user.handles.leetcode) {
            try {
                const lcData = await fetchLeetCodeStats(user.handles.leetcode);
                if (lcData) {
                    // Update stats object
                    stats.leetcode = lcData;

                    // Update user object for persistence
                    if (!user.stats) user.stats = {};
                    user.stats.leetcode = lcData;
                    needsSave = true;
                }
            } catch (err) {
                console.error('LeetCode Profile Error:', err.message);
                // Keep old stats if fetch fails, or set error if no old stats
                if (!stats.leetcode) stats.leetcode = { error: 'Failed to fetch data' };
            }
        }


        // Save updated stats to DB if any changes
        if (needsSave) {
            try {
                await user.save();
            } catch (saveErr) {
                console.error('❌ Error saving user stats:', saveErr);
                console.error('Validation errors:', saveErr.errors);
                // Don't throw - return the stats even if save fails
            }
        }

        res.json(stats);
    } catch (err) {
        console.error('❌ /api/profile/stats Error:', err.message);
        console.error('Stack:', err.stack);
        res.status(500).send('Server Error');
    }
});

// @route   PUT /api/profile
// @desc    Update user profile (handles, bio, etc.)
// @access  Private
router.put('/', auth, async (req, res) => {
    const { codeforces, leetcode, bio, name } = req.body;

    // Build profile object
    const profileFields = {};
    if (bio) profileFields.bio = bio; // Note: User model might not have bio yet, need to check
    // Actually User model has handles object.

    try {
        let user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ msg: 'User not found' });

        // Update handles
        if (codeforces !== undefined) user.handles.codeforces = codeforces;
        if (leetcode !== undefined) user.handles.leetcode = leetcode;

        // Update other fields if they exist in schema (User model currently only has username, email, password, handles, role, createdAt)
        // We might want to add 'bio' and 'name' to User model if we want to store them.
        // For now, let's just update handles as that's the critical part.

        await user.save();
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
