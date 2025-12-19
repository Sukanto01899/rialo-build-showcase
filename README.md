# Rialo Builder Hub

A community showcase for projects built on Rialo. This app includes a public
gallery with search + category filters, anonymous likes/views, GitHub star
lookup, and a secure admin panel to review submissions and publish projects.

## Highlights

- **Server‑side search + filters** (project title, builder username, category)
- **Infinite scroll** (10 projects per page)
- **Anonymous likes + views** with a local fingerprint
- **GitHub stars** fetched on project detail + used in rating
- **Admin panel** with login + protected APIs
- **Project submissions** (public form → admin review)

## Tech Stack

- Next.js (App Router)
- MongoDB + Mongoose
- Tailwind CSS + DaisyUI

## Getting Started

Install deps and run:

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Environment Variables

Create `.env.local`:

```bash
MONGODB_URI=your_mongodb_uri
ADMIN_TOKEN=your_admin_token
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Admin Access

1. Visit `/admin/login`
2. Enter `ADMIN_TOKEN`
3. Navigate to:
   - `/admin` (dashboard)
   - `/admin/submissions` (review)
   - `/admin/add-project` (publish)

Admin routes and APIs are protected by middleware + an HttpOnly cookie.

## How Search Works

- **Search text** → matches `title` or `builder.username`
- **Categories** → supports multiple values (comma‑separated)
- Uses server‑side filtering via `GET /api/projects`

## Infinite Scroll

The gallery loads projects in pages of 10 using:

```
GET /api/projects?page=1&limit=10
```

The response includes `{ projects, total, page, limit }`.

## Likes + Views (Anonymous)

Each visitor gets a local fingerprint. Likes and views are stored per project
and deduplicated by fingerprint:

- `POST /api/projects/[slug]/love` (like)
- `DELETE /api/projects/[slug]/love` (unlike)
- `POST /api/projects/[slug]/view` (view)

Views are incremented **once per fingerprint** per project.

## Rating

Rating is computed client‑side:

```
score = loves * 2 + views * 0.1 + stars * 3
rating = min(5, score / 20) rounded to 1 decimal
```

GitHub stars are fetched from the repo URL on the detail page and used to
compute rating.

## API Overview

Public:

- `GET /api/projects` (search + pagination)
- `POST /api/projects` (new submission into `Project`, pending)
- `GET /api/projects/[slug]` (single project)
- `POST /api/projects/[slug]/love`
- `DELETE /api/projects/[slug]/love`
- `POST /api/projects/[slug]/view`
- `POST /api/submissions` (submission form)

Admin (token required):

- `POST /api/admin/login`
- `GET /api/admin/submissions`
- `POST /api/admin/projects`

## Notes for Local Testing

- Ensure MongoDB is running and `MONGODB_URI` is valid.
- For GitHub stars, public repos work best (rate limits apply).
- If you see stale behavior, remove `.next` and restart dev server.

## Common Tasks

Update projects:

1. Submit a build via the modal on the homepage.
2. Review in `/admin/submissions`.
3. Publish from `/admin/add-project`.

## Project Structure

```
app/                 # Next.js app routes
components/          # UI components
contexts/            # Fingerprint context
lib/                 # Helpers (services, rating, github)
model/               # Mongoose models
```

---

If you want API docs or deployment notes added, tell me.
