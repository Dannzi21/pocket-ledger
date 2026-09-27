# PocketLedger

A personal budget dashboard with exact currency arithmetic.

A small, approachable portfolio project built with HTML, CSS, and modern JavaScript. No dependencies, API keys, build step, or account required.

## Features

- Record income and expenses with categories and dates.
- Filter by month and see income, expenses, balance, and category charts.
- Store money as integer cents to avoid floating-point rounding errors.
- Delete entries and undo the most recent deletion.
- Responsive layouts, labeled forms, visible keyboard focus, and local browser storage.
- Optional sample data; the app starts empty.

## Run locally

Install Node.js 22 or newer, then run:

```sh
git clone https://github.com/Dannzi21/pocket-ledger.git
cd pocket-ledger
npm start
```

Open **http://localhost:3000**. No `npm install` is needed. Stop the server with Ctrl+C. To run multiple projects together, set the `PORT` environment variable to a different number for each server.

## Tests

```sh
npm test
```

Tests use Node’s built-in runner. GitHub Actions runs them on pushes and pull requests.

## Project structure

- `public/index.html` — semantic page structure
- `public/styles.css` — responsive visual design
- `public/app.js` — events, rendering, and UI state
- `public/domain.js` — testable business rules
- `public/common.js` — storage and safe text rendering
- `test/domain.test.js` — meaningful edge-case tests
- `server.mjs` — a minimal local development server

## How it works

User-entered decimal amounts are parsed directly into integer cents. A pure summary function selects one calendar month and computes totals and expense groups.

User text is escaped before HTML rendering. Saved data is validated before use. Storage errors are surfaced in the interface.

## Data and limitations

Data stays in localStorage for this browser and origin. There is no backend, login, cloud sync, or analytics. Clearing browser data deletes records. Different devices do not share records, and simultaneous tabs are not synchronized. The local server binds to your own computer only and is intended for development.

## Put it online

Deploy the contents of `public/` to any static HTTPS host. All asset links are relative, so subdirectory hosting works too. Do not deploy `server.mjs` as a production backend.

## Make it your own

- Add a CSV export.
- Add configurable monthly category budgets.

Read the tests alongside `domain.js` to understand the rules before extending them.

## Development note

Created with AI assistance as a learning and portfolio starter. Review, customize, and understand the code before presenting it in an interview.
