# NPF TV

Official media platform for Nigeria Police Force TV — live broadcasts, news, video library,
programs, gallery, press centre, and a staff admin dashboard. Domain: **npftv.net**.

## Stack
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS — brand palette: navy `#0F2A4A`, black `#0A0A0A`, gold `#C9A227`, crimson `#B3242A` accent
- PostgreSQL + Prisma ORM
- NextAuth.js — credentials login, JWT sessions, role-based access (ADMIN / EDITOR)
- Cloudinary — image uploads (cover images, thumbnails, gallery photos)

## What's built
- **Public site:** homepage, news, live TV, video library, programs (with schedule), photo
  gallery, press centre, contact form, sitewide search — all pulling from the database
- **Admin dashboard** (`/admin`): full create/edit/delete for News, Videos, Programs, Gallery,
  Press Releases, Announcements; a Live TV on/off control panel; Site Settings (social links,
  emergency contact); Staff Accounts (ADMIN-only user management)
- **SEO:** per-page metadata with Open Graph/Twitter cards, JSON-LD structured data on articles,
  auto-generated `sitemap.xml` and `robots.txt`
- **Social:** share buttons on news and press release pages; footer social links pulled live
  from Site Settings

## Local setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy environment variables and fill them in:
   ```bash
   cp .env.example .env
   ```
   You need a Postgres database — Supabase and Neon both have free tiers that work with Prisma.
   **If you're on Supabase:** use the **Session pooler** connection string, not the direct
   connection — the direct connection is IPv6-only on many projects and won't connect from most
   home networks.

3. Push the schema to your database:
   ```bash
   npx prisma migrate dev --name init
   ```

4. Seed the first admin account and demo content:
   ```bash
   npm run seed
   ```
   This creates the admin login from `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` in your `.env`,
   plus sample news, videos, programs, a gallery album, a press release, and announcements so the
   site isn't empty on first run. Safe to re-run — it won't duplicate existing records.

5. Run the dev server:
   ```bash
   npm run dev
   ```
   - Public site: http://localhost:3000
   - Admin login: http://localhost:3000/admin/login

## Logo & assets
Drop these into the `public/` folder before running (not included in the file set):
- `public/logo.png` — used in the site header
- `public/favicon.ico` — browser tab icon

## Deploying to production

1. **Push to GitHub** (or GitLab/Bitbucket) and import the repo into
   [Vercel](https://vercel.com/new) — it auto-detects Next.js.

2. **Set environment variables** in Vercel's project settings (Settings → Environment Variables).
   Add everything from `.env`, with two changes for production:
   - `NEXTAUTH_URL` → `https://npftv.net` (not `localhost`)
   - `DATABASE_URL` → your production Supabase/Neon connection string (session pooler, as above)

3. **Point the domain:** in Vercel, Settings → Domains → add `npftv.net`, then update your
   domain's DNS records (at your registrar) to the values Vercel shows you. This can take a few
   hours to propagate.

4. **Run the production migration** once, against your production database:
   ```bash
   DATABASE_URL="<production-url>" npx prisma migrate deploy
   ```
   Use `migrate deploy`, not `migrate dev`, for production — it applies existing migrations
   without prompting or generating new ones.

5. **Seed the production admin account** the same way, then log in and change the password
   immediately, and remove or rotate the default credentials from `.env.example`'s history.

6. **Cloudinary:** create a free account at [cloudinary.com](https://cloudinary.com), grab your
   Cloud Name, API Key, and API Secret from the dashboard, and add them as environment variables.
   Without these, image uploads in the admin dashboard will show a clear "not configured" message
   instead of failing silently.

### Post-launch checklist
- [ ] Real logo and favicon in place
- [ ] Admin password changed from the seeded default
- [ ] Real content replacing the seeded demo content (delete demo articles/videos/etc. from the
      admin dashboard once real content is published)
- [ ] Site Settings filled in (Settings → social links, emergency contact)
- [ ] Live TV YouTube ID set and tested (toggle live, confirm it plays, toggle off)
- [ ] `npftv.net` DNS pointed at Vercel and SSL certificate issued (automatic via Vercel)
- [ ] Google Search Console: submit `https://npftv.net/sitemap.xml`

## Project structure notes
- `lib/data.ts` — all public-site database queries
- `lib/actions/*.ts` — all admin mutations (server actions), one file per content type
- `lib/authGuard.ts` — `requireStaffSession()` / `requireAdminSession()`, used at the top of
  every mutation
- `components/admin/` — shared admin UI (forms, sidebar, upload field, etc.)
- Route groups: `app/admin/(shell)/` wraps every logged-in admin page in the sidebar layout;
  `app/admin/login/` sits outside it deliberately, so the login screen has no sidebar
