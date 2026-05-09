# Voice of India — Website

Next.js + Prisma (SQLite locally) + admin dashboard + WhatsApp webhook for donation proof intake.

## Quick start

From the **repository root** (recommended — uses npm workspaces):

```bash
npm install
npm run db:migrate
npm run db:seed
npm run dev
```

Or from the **`web/`** folder only:

```bash
cd web
npm install
npm run db:migrate
npx prisma db seed
npm run dev
```

Always use the **Prisma version from this project** (`npm run db:migrate` or `cd web && npx prisma`). Running plain `npx prisma` from the repo root can install Prisma 7 and fail (no schema there).

- Public site: [http://localhost:3000](http://localhost:3000)
- Admin: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)  
  Default credentials: `admin@voi.local` / `changeme` (change password by updating the database or re-seeding with a new hash).

Copy `.env.example` to `.env` and adjust `SESSION_SECRET` and `ADMIN_EMAIL` before production.

## Production

1. Use a hosted **PostgreSQL** database (Neon, Supabase, RDS). Set `DATABASE_URL` and run `npx prisma migrate deploy`.
2. Set strong `SESSION_SECRET` and restrict `ADMIN_EMAIL`.
3. Deploy on **Vercel** (or similar). Ensure Prisma runs `generate` on install (`postinstall` in `package.json`).
4. **WhatsApp**: In Meta Developer Console, set the webhook URL to `https://your-domain.com/api/whatsapp` and use the same `WHATSAPP_VERIFY_TOKEN`. Add `WHATSAPP_ACCESS_TOKEN` so image/document messages can resolve media URLs for the admin proofs table.

## Project layout

- `app/(site)/` — public pages (home, dynamic CMS pages, events, gallery).
- `app/admin/` — content admin (site settings, pages, events, gallery, donation proofs).
- `app/api/whatsapp/` — Meta WhatsApp webhook (GET verify, POST ingest).
- `prisma/` — schema, migrations, seed.

Donations are **not** processed by Stripe: the donate page links to WhatsApp; proofs appear under **Admin → WhatsApp donation proofs** when the webhook is configured.
