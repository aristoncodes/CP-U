# Frontend environment (Vite)

Create these variables in Vercel Project → Settings → Environment Variables:

- VITE_API_URL: e.g. https://your-backend-domain.vercel.app

Local development:
- Add a `.env` file at project root with:
  - VITE_API_URL=http://localhost:3000 (or your dev backend)

The app reads `import.meta.env.VITE_API_URL`.

