require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();
const app = express();



const allowedOrigins = [
	process.env.WEB_ORIGIN,
	process.env.WEB_ORIGIN_2,
	process.env.WEB_ORIGIN_3
].filter(Boolean);
app.use(cors({
	origin: function (origin, callback) {
		if (!origin) return callback(null, true); // allow curl/postman
		if (allowedOrigins.includes(origin)) {
			return callback(null, true);
		}
		return callback(new Error('Not allowed by CORS'));
	},
	credentials: true
}));
app.options('*', cors());

app.use(express.json());



app.get("/api/test", (req, res) => {
  res.json({ message: "Backend is LIVE!" });
});

app.post('/api/auth/signup', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const passwordHash = await bcrypt.hash(password, 10);
    
    const user = await prisma.user.create({
      data: { email, passwordHash },
    });

    res.status(201).json({ message: 'User created successfully' });

  } catch (e) {

    if (e.code === 'P2002') { 
      return res.status(400).json({ error: 'Email already exists' });
    }
    console.error(e);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.post('/api/auth/login', async (req, res) => {
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


  const token = jwt.sign(
    { userId: user.id, email: user.email }, 
    process.env.JWT_SECRET,                
    { expiresIn: '1h' }                  
  );

  res.json({ 
    message: "Login successful",
    token: token 
  });
});



// Export a serverless handler compatible with Vercel's @vercel/node
module.exports = (req, res) => app(req, res);
