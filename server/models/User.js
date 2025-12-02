const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    name: { type: String, default: '' },
    bio: { type: String, default: '' },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    // This is where we store the handles consistently
    handles: {
        codeforces: { type: String, default: '' },
        leetcode: { type: String, default: '' },
        codechef: { type: String, default: '' }
    },

    // Store the fetched stats here so they load INSTANTLY on next login
    stats: {
        codeforces: {
            rating: { type: Number, default: 0 },
            rank: { type: String, default: 'Newbie' },
            maxRating: { type: Number, default: 0 },
            problemsSolved: { type: Number, default: 0 },
            lastContest: {
                contestId: { type: Number, default: 0 },
                contestName: { type: String, default: '' },
                timeSeconds: { type: Number, default: 0 }
            },
            missedContests: [{
                id: Number,
                name: String,
                startTime: Number
            }]
        },
        leetcode: {
            totalSolved: { type: Number, default: 0 },
            ranking: { type: Number, default: 0 },
            easy: { type: Number, default: 0 },
            medium: { type: Number, default: 0 },
            hard: { type: Number, default: 0 }
        }
    },

    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
