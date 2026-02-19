# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bun install          # Install dependencies (always use bun, never pnpm/npm/yarn)
bun run dev          # Dev server on http://localhost:4242
bun run build        # Production build
bun run lint         # ESLint
bun run typecheck    # Type checking (nuxt typecheck)
bun run db:generate  # Generate Drizzle migrations
bun run db:migrate   # Run migrations
bun run db:push      # Push schema directly (no migration files)
bun run db:studio    # Drizzle Studio GUI
```

## Architecture

**Nuxt 4 SPA** (SSR disabled) with Nuxt UI v4, Pinia state management, and Tailwind CSS v4.

### Client (`app/`)
- `pages/` — File-based routing. Protected routes guarded by `middleware/auth.global.ts` (currently `/protected`, `/settings`)
- `stores/auth.ts` — Pinia auth store. Fetches user via `/api/auth/me` on app init (`plugins/auth.ts`)
- `pages/auth/callback.vue` — Google OAuth callback. Exchanges code via `/api/auth/google`, then redirects

### Server (`server/`)
- **API routes** in `server/api/` — Nitro auto-imports, use `defineEventHandler`
- **Auth flow**: Google OAuth → `server/api/auth/google.ts` exchanges code for token → upserts user → sets `session` httpOnly cookie (JWT via `jose`)
- `server/utils/defineAuthHandler.ts` — Wrapper for authenticated endpoints. Verifies JWT cookie, attaches `event.context.user`
- `server/utils/createSession.ts` — JWT creation/verification using `jose`
- `server/utils/db.ts` — Drizzle ORM instance (auto-imported by Nitro)

### Database
- **Turso** (libSQL) with Drizzle ORM
- Schema: `server/database/schema.ts`
- Migrations output: `server/database/migrations/`
- Queries: `server/database/queries/`

### Shared (`shared/types/`)
- TypeScript interfaces shared between client and server (e.g., Google OAuth types)

## Key Conventions

- **Package manager**: `bun` (specified in `packageManager` field)
- **Dev server port**: 4242 (configured in `nuxt.config.ts`)
- **ESLint style**: no comma dangles, 1tbs brace style
- **UI colors**: primary=green, neutral=slate (`app/app.config.ts`)
- **Validation**: Zod for request body validation on server
- **Auth pattern**: Use `defineAuthHandler` (not `defineEventHandler`) for endpoints requiring authentication
- **Environment variables**: `DATABASE_URL`, `DATABASE_TOKEN`, `JWT_SECRET`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `SITE_URL`
