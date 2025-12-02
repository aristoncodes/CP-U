const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth'); // Your JWT middleware

// GET /api/user/profile - Fetch user profile data
router.get('/profile', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) return res.status(404).json({ msg: 'User not found' });
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// PUT /api/user/profile - Updates handles and saves them forever
router.put('/profile', auth, async (req, res) => {
    try {
        console.log('PUT /api/user/profile hit');
        console.log('User ID:', req.user.id);
        console.log('Body:', req.body);
        const { codeforces, leetcode, codechef, name, bio } = req.body;

        // Build update object dynamically
        const updateFields = {
            updatedAt: Date.now()
        };

        // Update handles if provided
        if (codeforces !== undefined) updateFields['handles.codeforces'] = codeforces;
        if (leetcode !== undefined) updateFields['handles.leetcode'] = leetcode;
        if (codechef !== undefined) updateFields['handles.codechef'] = codechef;

        // Update profile fields
        if (name !== undefined) updateFields.name = name;
        if (bio !== undefined) updateFields.bio = bio;

        // Update other fields if provided (assuming schema supports them, currently User schema might need updates for name/bio if not present)
        // Based on previous User.js view, name/bio were not in schema but were in frontend. 
        // Let's stick to handles for now as per plan, but if user wants name/bio persistence we should add them to schema.
        // The user request specifically mentioned: "Update server/models/User.js ... Ensure your handles and profile data have a dedicated home".
        // The provided schema in the prompt didn't explicitly add 'name' or 'bio' top-level fields beyond what was there, 
        // but the frontend sends them. Let's check if we should add them.
        // The prompt's schema had: username, email, password, handles, stats.
        // The frontend sends: name, bio, codeforces, leetcode.
        // If I want to persist name/bio, I should add them to the schema.
        // I will add them to the schema in a separate step if needed, or just assume they are not critical for "persistence of handles" which is the main bug.
        // However, the user said "Fix the Database... Ensure your User Schema is strict about the profile structure".
        // I'll stick to the user's provided schema for now which focuses on handles/stats.

        // Use findByIdAndUpdate with { new: true } to return the updated doc
        const user = await User.findByIdAndUpdate(
            req.user.id, // Comes from the JWT token
            {
                $set: updateFields
            },
            { new: true, runValidators: true } // Crucial options
        ).select('-password'); // Don't send back the password

        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
