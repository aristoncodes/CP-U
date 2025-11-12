const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const globalForPrisma = globalThis;
if (!globalForPrisma.prisma) {
	globalForPrisma.prisma = new PrismaClient();
}
const prisma = globalForPrisma.prisma;
const app = express();



const requiredEnvVars = ['DATABASE_URL', 'JWT_SECRET'];
const missingVars = requiredEnvVars.filter((key) => !process.env[key]);
if (missingVars.length) {
	console.error(`Missing required environment variables: ${missingVars.join(', ')}`);
}

const normalizeOrigin = (o) => (o ? o.replace(/\/+$/, '') : o);
const allowedOrigins = [
	normalizeOrigin(process.env.WEB_ORIGIN),
	normalizeOrigin(process.env.WEB_ORIGIN_2),
	normalizeOrigin(process.env.WEB_ORIGIN_3),
	'http://localhost:3000',
	'http://localhost:5173'
].filter(Boolean);
app.use(cors({
	origin: function (origin, callback) {
		if (!origin) return callback(null, true); // allow curl/postman
		const normalized = normalizeOrigin(origin);
		const isAllowed =
			allowedOrigins.includes(normalized) ||
			/^https:\/\/.*\.vercel\.app$/.test(normalized) ||
			/^http:\/\/localhost(:\d+)?$/.test(normalized);
		return callback(null, isAllowed);
	},
	credentials: true,
	optionsSuccessStatus: 204,
	preflightContinue: false
}));

app.use(express.json());



app.get("/", (req, res) => {
  res.status(404).json({ ok: true, message: "Use /api/* endpoints" });
});

app.get("/api/test", (req, res) => {
  res.json({ message: "Backend is LIVE!" });
});

app.post('/api/auth/signup', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, passwordHash },
    });
    res.status(201).json({ message: 'User created successfully' });
  } catch (e) {
    if (e.code === 'P2002') {
      return res.status(400).json({ error: 'Email already exists' });
    }
    if (e.code === 'P1000') {
      return res.status(500).json({ error: 'Database authentication failed (P1000)' });
    }
    if (e.code === 'P1001') {
      return res.status(500).json({ error: 'Database not reachable (P1001)' });
    }
    console.error('Signup failed:', e);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET is not defined');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      message: "Login successful",
      token: token
    });
  } catch (e) {
    console.error('Login failed:', e);
    res.status(500).json({ error: 'Internal server error' });
  }
});



const handler = (req, res) => app(req, res);
module.exports = handler;
module.exports.app = app;
