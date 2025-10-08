# Dartmouth Climbing Gym Sign-In

An open-source static web app to manage check-in/check-out of climbers at the
Dartmouth Climbing Gym. The app is built with plain HTML/CSS/JavaScript and uses
Firebase Hosting + Firestore for data storage and hosting.

## Live demo

The site is deployed to Firebase Hosting:

https://dartmouth-climbing-gym.web.app/

## Quick features

- Simple kiosk-friendly sign-in page for in-person use (`index.html`).
- Waiver form page (`pages/waiver.html`).
- Admin view for staff to monitor and manage active climbers (`pages/admin.html`).
- Public-facing count/status page for displaying the current number of climbers.

## Tech stack

- Static site: HTML, CSS, JavaScript
- Firebase Hosting for static hosting
- Firestore for storing sign-in/out records

## Prerequisites

- A modern browser (Chrome, Edge, Safari, Firefox)
- (Optional, for local serving) Python 3 or Node.js to run a local HTTP server
- (Optional, for deploying) Firebase CLI configured with a Firebase project

## Run locally (quick)

You can open `index.html` directly, or serve the project root with a simple
HTTP server to avoid CORS/relative-path issues.

Python 3:

```bash
python3 -m http.server 8000
```

Node (http-server):

```bash
npx http-server -p 8000
```

Then open http://localhost:8000 in your browser.

## Deploying to Firebase Hosting

If you have the Firebase CLI installed and a Firebase project configured for
hosting, deploy with:

```bash
firebase login
firebase deploy --only hosting
```

## File overview

- `index.html` — Main sign-in UI (root)
- `main.js` — JavaScript that integrates with Firebase & Firestore
- `styles/` — CSS files (`style.css`, `landing_style.css`, `info_style.css`)
- `pages/` — Additional pages (admin, waiver, hours, etc.)
- `media/` — Images and assets (logos, QR codes)
- `firebase.json` — Firebase hosting and rewrite config
- `404.html` — Not-found page

## Notes for maintainers

- Firestore rules and indexes are not included in this repo; check your Firebase
  console and `firebase.json` for rewrites and configuration.
- If you add server-side features later, include a CONTRIBUTING.md with
  development workflows and tests.

## Authors + Contributors

- Javier A. Rodillas
- Sebastian Frazier
- Luc Cote
