const mongoose = require('mongoose');

const TopicSchema = new mongoose.Schema({
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    tier: { type: String, required: true, enum: ['Bronze', 'Silver', 'Gold', 'Platinum'] },
    tags: [{ type: String }],
    summary: { type: String },
    content: { type: String, required: true },
    codeTemplate: { type: String },
    problems: [{
        name: { type: String, required: true },
        url: { type: String, required: true },
        difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'] },
        platform: { type: String }
    }],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Topic', TopicSchema);
