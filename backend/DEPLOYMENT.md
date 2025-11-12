# Backend deployment on Vercel

Set these Environment Variables in your Vercel Project (Production and Preview):

- DATABASE_URL: PostgreSQL connection string from Render (enable SSL if required).
- JWT_SECRET: Strong random string.
- WEB_ORIGIN: Your frontend origin, e.g. https://your-frontend-domain.vercel.app
- WEB_ORIGIN_2: http://localhost:5173 (for local dev, optional)
- WEB_ORIGIN_3: any additional origin (optional)

Notes:
- Prisma packages are production dependencies and `vercel-build` runs `prisma generate`.
- The serverless entry is `index.js` via `vercel.json`. All routes are prefixed with `/api/...`.
- Health check: GET /api/test

Local development:
- Ensure `.env` contains DATABASE_URL and JWT_SECRET.
- Run `npm install` then `node index.js` with a local adapter or deploy to Vercel for serverless.

