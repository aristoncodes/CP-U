require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/cp-universe');
        console.log('✅ Local MongoDB Connected');
    } catch (err) {
        console.error('❌ DB Connection Error:', err);
        process.exit(1);
    }
};
connectDB();

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/sync', require('./routes/sync'));
app.use('/api/user', require('./routes/user'));
app.use('/api/profile', require('./routes/profile'));
app.use('/api/upsolve', require('./routes/upsolve'));
app.use('/api/topics', require('./routes/topics'));
app.use('/api/problems', require('./routes/problems'));

app.get('/', (req, res) => {
    res.send('CP-U API is running');
});

// User Routes


app.delete('/api/upsolve/:id', (req, res) => {
    res.status(501).json({ message: 'Not Implemented: Delete Upsolve' });
});

// AI Routes
app.post('/api/ai/explain', (req, res) => {
    // TODO: Gemini API integration
    res.status(501).json({ message: 'Not Implemented: AI Explain' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
