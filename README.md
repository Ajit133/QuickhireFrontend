# QuickHire Frontend

A modern job board web application built with React and Vite. QuickHire allows job seekers to browse and apply for jobs, view detailed job listings, and lets admins post and manage job openings.

---

## Features

- **Home page** — hero section, featured jobs, latest jobs, job categories, and company highlights
- **Browse Jobs** — filterable and searchable job listings
- **Job Detail** — full job description with an apply modal
- **Admin Panel** — post and delete job listings
- **Global state management** via Redux Toolkit
- **Responsive UI** built with Tailwind CSS v4

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + Vite 7 |
| Routing | React Router v7 |
| State | Redux Toolkit + React-Redux |
| HTTP | Axios |
| Styling | Tailwind CSS v4 |

---

## Project Structure

```
src/
├── assets/           # Static assets (images, icons)
├── components/
│   ├── common/       # Reusable UI components (Button, Logo, etc.)
│   ├── home/         # Sections used on the Home page
│   ├── jobs/         # Job cards, filters, modals, skeletons
│   └── layout/       # Navbar and Footer
├── constants/        # Shared constant data (job tags, etc.)
├── pages/            # Route-level page components
│   ├── HomePage.jsx
│   ├── BrowseJobsPage.jsx
│   ├── JobDetailPage.jsx
│   └── AdminPage.jsx
└── store/            # Redux slices and store configuration
    ├── index.js
    ├── jobsSlice.js
    ├── jobDetailsSlice.js
    └── applicationSlice.js
```

---

## Prerequisites

- **Node.js** v18 or later
- **npm** v9 or later (or pnpm / yarn)
- A running instance of the **QuickHire backend** API (Django REST Framework, default port `8000`)

---

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd QuickhireFrontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000/api
```

> See [Environment Variables](#environment-variables) below for full details.

### 4. Start the development server

```bash
npm run dev
```

The app will be available at `http://localhost:5173` by default.

---

## Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start the Vite development server with HMR |
| `npm run build` | Build for production (output in `dist/`) |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across the project |

---

## Environment Variables

All environment variables must be prefixed with `VITE_` so that Vite exposes them to the browser bundle.

Create a `.env` file in the project root (never commit this file):

```env
# Base URL of the QuickHire REST API backend
VITE_API_BASE_URL=http://127.0.0.1:8000/api
```

| Variable | Required | Default | Description |
|---|---|---|---|
| `VITE_API_BASE_URL` | Yes | `http://127.0.0.1:8000/api` | Base URL for all API requests |

Access the variable in code via:

```js
const API = import.meta.env.VITE_API_BASE_URL;
```

> **Note:** The current codebase has the API URL hardcoded in each Redux slice. It is recommended to move this to the environment variable shown above for easier environment switching.

---

## Building for Production

```bash
npm run build
```

The optimised output is written to the `dist/` folder and can be served by any static file host (Nginx, Vercel, Netlify, etc.).
