const express = require('express');
const router = express.Router();
const Topic = require('../models/Topic');

// GET /api/topics - Get all topics
router.get('/', async (req, res) => {
    try {
        const topics = await Topic.find().select('-__v');
        res.json(topics);
    } catch (err) {
        console.error('Error fetching topics:', err);
        res.status(500).json({ error: 'Failed to fetch topics' });
    }
});

// GET /api/topics/:slug - Get a specific topic by slug
router.get('/:slug', async (req, res) => {
    try {
        const topic = await Topic.findOne({ slug: req.params.slug });
        if (!topic) {
            return res.status(404).json({ error: 'Topic not found' });
        }
        res.json(topic);
    } catch (err) {
        console.error('Error fetching topic:', err);
        res.status(500).json({ error: 'Failed to fetch topic' });
    }
});

module.exports = router;
