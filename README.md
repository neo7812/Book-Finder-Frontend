This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).
# Book Finder — Frontend

This is the frontend for the Book Finder project. It's a Next.js (App Router) React application that consumes the backend API to search and display books using the Google Books data.

Key technologies

- Next.js 16 (App Router)
- React 19
- TypeScript + ESLint
- Tailwind CSS + DaisyUI

Quick start

1. Install dependencies

```powershell
cd frontend
npm install
```

2. Configure environment

Create a `.env.local` in the `frontend/` folder. The app expects a base API URL in `NEXT_PUBLIC_API_URL`.

Example `.env.local`:

```env
# include the `/api` suffix (the frontend lib defaults to a /api base if not provided)
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Notes:
- The frontend's API client (`src/lib/api.ts`) uses `process.env.NEXT_PUBLIC_API_URL` and falls back to `http://127.0.0.1:5000/api`.

3. Run the dev server

```powershell
npm run dev
```

Open http://localhost:3000 in your browser.

Build & start (production)

```powershell
npm run build
npm start
```

Available scripts (from `package.json`)

- `dev` — run Next.js in development
- `build` — build production assets
- `start` — run built Next.js server
- `lint` — run ESLint

How the frontend talks to the backend

- The API base URL is configured by `NEXT_PUBLIC_API_URL` (see `.env.local`).
- The HTTP client is `src/lib/api.ts`, which creates an Axios instance with the base URL and a 10s timeout.
- Expected backend endpoints (configured in the backend README):
	- `GET /api/books?q=<query>&page=<page>&category=<cat>&author=<author>`
	- `GET /api/books/:id`

Project structure (high level)

- `app/` — Next.js App Router pages and layouts
- `components/` — UI components (BookCard, SearchBar, FilterPanel, etc.)
- `lib/` — small libraries/utilities (API client)
- `public/` — static assets

Development tips

- If you change backend port or host, update `NEXT_PUBLIC_API_URL` and restart the Next dev server.
- Use the browser devtools network tab to inspect API requests.
- If you see CORS errors, ensure the backend is running and CORS is enabled on the backend (it is by default in this project).

Troubleshooting

- Page fails to load or shows API errors:
	- Verify the backend is running (default: `http://localhost:5000`).
	- Confirm `NEXT_PUBLIC_API_URL` is set correctly.

- TypeScript/ESLint issues:
	- Run `npm run lint` and fix reported issues. The dev server shows TypeScript errors in the terminal.

Contributing

- Add new features in `app/` and split UI into `components/` as needed.
- If you add new environment variables, update this README and `backend/README.md` if they affect API behavior.

License

This project uses the ISC license (see root `package.json`).

---

If you'd like, I can also:
- Add a `frontend/.env.example` with the recommended variables (no secrets).
- Add a short screenshot or example request/response in the README.
