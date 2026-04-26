# Dartmouth Climbing Gym Sign-In

An web app to manage check-in/check-out of climbers at the Dartmouth Climbing Gym. Built with React + Vite + TypeScript + Tailwind, backed by Firebase Hosting and Firestore.

## Live demo

https://dartmouth-climbing-gym.web.app/

## Features

- Kiosk-friendly sign-in/out page for in-person use (`/signin`)
- Digital waiver form (`/waiver`)
- Admin dashboard for staff — live climber table, sign-out controls, CSV export (`/admin`)
- Public-facing landing page with real-time capacity display

## Tech stack

- React 18 + Vite 5 + TypeScript (strict)
- Tailwind CSS 3 (enumerated tokens only)
- Firebase v10 modular SDK (Auth + Firestore)
- Firebase Hosting (SPA with rewrites)

## Run locally

```bash
npm install
npm run dev
```

Vite serves the app at http://localhost:5173. Requires a `.env` file with `VITE_FIREBASE_*` keys (see `.env.example`).

## Build

```bash
npm run build       # type-check + Vite production build → dist/
npm run preview     # serve dist/ locally
```

## Deploying

CI/CD via GitHub Actions deploys automatically: PRs get Firebase Hosting preview channels, merges to `main` go live.

Manual deploy:

```bash
firebase login
firebase deploy --only hosting
```

## Authors + Contributors

- Javier A. Rodillas 25' (+ 1)
- Sebastian Frazier 26'
- Luc Cote 23'
