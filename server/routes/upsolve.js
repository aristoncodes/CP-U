const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Upsolve = require('../models/Upsolve');

// @route   GET /api/upsolve
// @desc    Get all upsolve problems for the user
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const upsolves = await Upsolve.find({ userId: req.user.id }).sort({ addedAt: -1 });
        res.json(upsolves);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE /api/upsolve/:id
// @desc    Delete an upsolve problem
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const upsolve = await Upsolve.findById(req.params.id);

        if (!upsolve) {
            return res.status(404).json({ msg: 'Problem not found' });
        }

        // Check user
        if (upsolve.userId.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        await upsolve.deleteOne();

        res.json({ msg: 'Problem removed' });
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Problem not found' });
        }
        res.status(500).send('Server Error');
    }
});

module.exports = router;
