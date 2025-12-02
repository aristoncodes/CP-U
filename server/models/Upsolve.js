const mongoose = require('mongoose');

const UpsolveSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    platform: { type: String, enum: ['codeforces', 'leetcode'], required: true },
    problemId: { type: String, required: true },
    title: { type: String, required: true },
    url: { type: String, required: true },
    difficulty: { type: Number, default: 0 }, // Rating for CF, 1/2/3 for LC or 0 if unknown
    addedAt: { type: Date, default: Date.now }
});

// Compound index to prevent duplicates for same user/platform/problem
UpsolveSchema.index({ userId: 1, platform: 1, problemId: 1 }, { unique: true });

module.exports = mongoose.model('Upsolve', UpsolveSchema);
