# Project Proposal: CP-U (Competitive Programming Universe)

**Submitted by:** Aditya Yadav
**Institution:** Newton School of Technology / Rishihood University
**Date:** October 2025

## 1. Project Title
**CP-U: Unified Competitive Programming Aggregator and Learning Platform**

## 2. Problem Statement
Competitive programmers currently face a fragmented ecosystem, having to juggle multiple platforms like Codeforces, LeetCode, CSES, and CodeChef to track their progress.

*   **Data Silos:** There is no single dashboard to view a user's holistic problem-solving history or combined rating across different judges.
*   **Inefficient Learning:** Users often forget to "upsolve" (solve missed problems) after contests, and algorithm learning resources are often static text without progress tracking.

**Solution:** CP-U solves this by aggregating data into a Unified Profile, providing an Upsolving Tracker to manage missed contest problems, and offering interactive Algorithm Ladders with advanced search and filter capabilities.

## 3. System Architecture
**Architecture Flow:** Frontend → Backend (API) ↔ External APIs/Scrapers → Database.

*   **Frontend:** Built with Next.js (JavaScript) for Server-Side Rendering (SSR) to ensure fast load times for profiles and SEO for algorithm pages.
*   **Backend:** Express.js API orchestrates data fetching. It uses a hybrid approach of official APIs (Codeforces) and web scrapers (Puppeteer) for platforms without public data access.
*   **Database:** MongoDB stores user profiles and problem history. It uses a flexible schema to handle different data structures from various coding platforms.
*   **Authentication:** Secure JWT-based system for login and session management.

## 4. Key Features

| Category | Features |
| :--- | :--- |
| **Auth & Authorization** | Secure user registration, login, logout, and role-based access control (Admin vs. Regular User). |
| **Unified Profile** | Aggregates submission history from multiple platforms into a single "Master Heatmap" and overlays rating graphs. |
| **CRUD Operations & Pagination** | Create custom mashup contests, Read problem stats, Update user goals/bio, and Delete completed items from upsolving lists. Implemented on "Problemset" and "Submission History" pages to efficiently load large datasets (e.g., 20 problems per page). |
| **Searching & Filtering** | Global search bar to find problems by name/ID. Filters available for Tags (DP, Graphs), Platform (Codeforces, CSES), and Difficulty. |
| **Sorting** | Users can sort problem lists by Acceptance Rate, Date Added, or Difficulty Level (Ascending/Descending). |
| **AI Integration** | Gemini AI integration to provide "Smart Hints" for stuck users and generate explanations for complex algorithm logic. |
| **Upsolving Tracker** | Automatically fetches problems a user failed or skipped in recent contests and creates a "To-Do" list. |

## 5. Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | Next.js 14, JavaScript, Tailwind CSS, Shadcn UI, Recharts, Axios |
| **Backend** | Node.js, Express.js, Puppeteer (Scraping) |
| **Database** | MongoDB (Primary Storage) |
| **Authentication** | JWT (JSON Web Tokens), bcrypt |
| **AI Model** | Google Gemini API (for code explanation and hints) |
| **Hosting** | Vercel (Frontend), Render (Backend), MongoDB Atlas |

## 6. API Overview

| Endpoint | Method | Description | Access |
| :--- | :--- | :--- | :--- |
| `/api/auth/register` | `POST` | Register new user | Public |
| `/api/auth/login` | `POST` | Login and generate JWT | Public |
| `/api/problems` | `GET` | Fetch problems with pagination (`?page=1`) | Auth |
| `/api/user/profile` | `PUT` | Update user bio, handles, preferences | Auth |
| `/api/upsolve/:id` | `DELETE` | Remove problem from "To-Do" list | Auth |
| `/api/ai/explain` | `POST` | Generate AI explanation | Auth |
| `/api/contest/mashup` | `POST` | Create a virtual contest | Auth |
| `/api/admin/users` | `GET` | Fetch all users (Admin Dashboard) | Admin |

## 7. Expected Outcomes
*   **Centralized Hub:** A "single source of truth" for a programmer's portfolio, eliminating the need to maintain disparate profiles.
*   **Enhanced Usability:** Features like Pagination, Searching, and Sorting ensure users can navigate thousands of problems efficiently.
*   **Improved Skill Retention:** The Upsolving and Spaced Repetition features will directly improve users' contest ratings by plugging knowledge gaps.
*   **Robust Integration:** A reliable system that effectively handles data fetching from multiple external sources (Codeforces, LeetCode, CSES).
