const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema({
    platform: { type: String, enum: ['codeforces', 'leetcode', 'cses'], required: true },
    problemId: { type: String, required: true },
    title: { type: String, required: true },
    url: { type: String, required: true },
    difficulty: { type: Number },
    tags: [{ type: String }],
    acceptanceRate: { type: Number }
}, { timestamps: true });

problemSchema.index({ platform: 1, problemId: 1 }, { unique: true });

module.exports = mongoose.model('Problem', problemSchema);
