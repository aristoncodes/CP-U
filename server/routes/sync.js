const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const syncEngine = require('../utils/syncEngine');

// @route   POST /api/sync
// @desc    Sync user's submissions from Codeforces and LeetCode
// @access  Private
router.post('/', auth, async (req, res) => {
    try {
        const results = await syncEngine.syncUser(req.user.id);
        res.json({
            message: 'Sync Complete',
            results
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
