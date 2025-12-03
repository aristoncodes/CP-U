require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
// CORS configuration for Vercel deployment
// Middleware
// CORS configuration for Vercel deployment
app.use(cors({
    origin: [
        'http://localhost:3000',
        'http://localhost:3001',
        'https://cp-u-frontend.vercel.app'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.options(/(.*)/, cors()); // Enable preflight for all routes
app.use(express.json());

// Database Connection
// Database Connection
let dbConnectionError = null;
const connectDB = async () => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error('MONGO_URI environment variable is not set');
        }
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ MongoDB Connected:', mongoose.connection.host);
    } catch (err) {
        console.error('❌ DB Connection Error:', err.message);
        dbConnectionError = err.message;
        // process.exit(1); // Don't crash, let health check report the error
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

app.get('/api/health', (req, res) => {
    res.json({
        status: dbConnectionError ? 'error' : 'ok',
        dbState: mongoose.connection.readyState, // 0: disconnected, 1: connected, 2: connecting, 3: disconnecting
        dbHost: mongoose.connection.host,
        dbError: dbConnectionError,
        env: {
            mongo: !!process.env.MONGO_URI,
            jwt: !!process.env.JWT_SECRET
        }
    });
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

// Start server (for local development)
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});

// Export for Vercel serverless deployment
module.exports = app;