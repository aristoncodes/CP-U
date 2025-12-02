const express = require('express');
const router = express.Router();
const Problem = require('../models/Problem');
const auth = require('../middleware/auth');

// GET /api/problems - Get all problems
router.get('/', auth, async (req, res) => {
    try {
        const problems = await Problem.find().select('-__v').lean();

        // Transform for frontend
        const formatted = problems.map(p => ({
            id: p._id,
            name: p.title,
            platform: p.platform || 'Codeforces',
            rating: p.difficulty,
            tags: p.tags || [],
            url: p.url
        }));

        res.json(formatted);
    } catch (err) {
        console.error('Error fetching problems:', err);
        res.status(500).json({ error: 'Failed to fetch problems' });
    }
});

module.exports = router;
