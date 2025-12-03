# 🎮 CP-U: Competitive Programming Universe

> **Level Up Your Coding Skills.**
> A unified dashboard to track progress, upsolve missed problems, and climb the algorithm leaderboards across Codeforces, LeetCode, CSES, and more.

## 🗺️ The Mission (Problem Statement)

Travelers in the realm of Competitive Programming currently face a fragmented ecosystem. To prove their worth, they must juggle multiple platforms (Codeforces, LeetCode, CSES), leading to:

*   **Data Silos:** No single "Character Sheet" to view holistic stats or combined ratings.
*   **Inefficient Grinding:** Users often forget to "upsolve" (defeat the bosses they missed) after contests.
*   **Static Lore:** Algorithm resources are often boring, static text without progress tracking.

## 🛡️ The Solution

CP-U acts as your central **Guild Hall**. It aggregates data into a **Unified Profile**, provides an **Upsolving Tracker** to manage your quest log, and offers interactive **Algorithm Ladders** powered by AI.

## 🎒 Inventory (Tech Stack)

| Slot | Gear | Description |
| :--- | :--- | :--- |
| **Frontend** | ![Next.js](https://img.shields.io/badge/Next.js-black?style=flat-square&logo=next.js&logoColor=white) | Server-Side Rendering (SSR) for fast profile loads. |
| **Backend** | ![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat-square&logo=node.js&logoColor=white) | Orchestrates API calls and scrapers. |
| **Database** | ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white) | Stores user profiles and flexible problem schemas. |
| **Auth** | ![JWT](https://img.shields.io/badge/JWT-black?style=flat-square&logo=json-web-tokens&logoColor=white) | Secure login and session management. |
| **AI Companion** | ![Gemini](https://img.shields.io/badge/Gemini-8E75B2?style=flat-square&logo=google-gemini&logoColor=white) | Smart hints and logic explanations. |
| **Tools** | ![Puppeteer](https://img.shields.io/badge/Puppeteer-40B5A4?style=flat-square&logo=puppeteer&logoColor=white) | Scraper for platforms without public APIs. |

## ✨ Abilities (Features)

### 📊 The Master Heatmap (Unified Profile)
Combine your submission history from all platforms into one massive activity graph. Overlay your ratings to see your true power level.

### ⚔️ Upsolving Tracker
Never let a problem defeat you twice. The system automatically fetches problems you failed or skipped in recent contests and adds them to your "To-Do" Quest Log.

### 🤖 AI Grandmaster (Gemini Integration)
Stuck on a boss fight? Summon the AI Grandmaster to provide "Smart Hints" without spoiling the full solution, or ask it to explain complex algorithm logic.

### 🏆 Mashup Arena
Create custom "Mashup" contests to challenge yourself or friends with specific problem sets.

### 🔍 Advanced Scrying (Search & Filter)
Global search bar to find problems by name/ID. Filter by Tags (DP, Graphs), Platform, and Difficulty.

## 📜 Spellbook (API Overview)

| Endpoint | Method | Effect | Access |
| :--- | :--- | :--- | :--- |
| `/api/auth/register` | `POST` | Create a new character | Public |
| `/api/auth/login` | `POST` | Login & generate session token | Public |
| `/api/problems` | `GET` | Fetch quests (Pagination enabled) | Auth |
| `/api/user/profile` | `PUT` | Update bio, handles, & stats | Auth |
| `/api/upsolve/:id` | `DELETE` | Mark quest as complete | Auth |
| `/api/ai/explain` | `POST` | Summon AI explanation | Auth |
| `/api/contest/mashup` | `POST` | Create virtual contest | Auth |

## 🚀 Game Start (Installation)

### 1. Clone the Repository
```bash
git clone https://github.com/aristoncodes/CP-U.git
cd CP-U
```

### 2. Install Dependencies
```bash
# Install backend deps
cd server && npm install

# Install frontend deps
cd ../client && npm install
```

### 3. Configure Environment
Create a `.env` file in the `server` directory and add your magic keys:
```env
MONGO_URI=your_mongodb_string
JWT_SECRET=your_secret_spell
GEMINI_API_KEY=your_ai_key
```

### 4. Run the Server
```bash
# In server directory
npm start

# In client directory
npm run dev
```

## 📄 Project Proposal
For a detailed breakdown of the academic proposal, system architecture, and expected outcomes, please refer to the [Project Proposal](PROPOSAL.md).
