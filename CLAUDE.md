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
- **Environment variables**: `DATABASE_URL`, `DATABASE_TOKEN`, `JWT_SECRET`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `SITE_URL`, `STRIPE_SECRET_KEY`, `STRIPE_PUBLISHABLE_KEY`, `STRIPE_WEBHOOK_SECRET`

## Pages

- `/` — Landing page. Full-viewport dark hero with gradient orbs, dot grid, nav bar, headline, CTAs, and feature pills. No auth required.
- `/docs` — Documentation page. Quick start steps, env var reference, tech stack, project structure, commands, and vibe coding prompts. No auth required.
- `/register` — Sign in page with Google OAuth
- `/auth/callback` — OAuth callback handler
- `/pricing` — Stripe subscription plans with monthly/yearly toggle
- `/settings` — User profile & subscription management (auth required)
- `/protected` — Example protected route (auth required)

## Design System

- **Dark theme**: All pages use `bg-gray-950` dark backgrounds
- **Nav bar**: Logo (green square with zap icon + "vibe-kit" text), links to Docs/Pricing, Sign In or Dashboard button
- **Section headers**: Green icon in rounded container + bold white heading
- **Cards/panels**: `border-gray-800/60 bg-gray-900/30` with hover state `hover:border-gray-700/60`
- **Code blocks**: `bg-gray-950 border-gray-800/40` with copy buttons
- **Accent color**: Green (`text-green-400`, `bg-green-500/10`, `border-green-500/20`)
- **Gradient text**: `bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent`

## Adding New Pages

1. Create `.vue` file in `app/pages/` — Nuxt auto-registers the route
2. Use dark theme: `min-h-dvh bg-gray-950 text-gray-100`
3. Include the shared nav bar pattern (logo + links)
4. If the page requires auth, add its path to `protectedRoutes` array in `app/middleware/auth.global.ts`
5. Use Nuxt UI components (`UButton`, `UIcon`, `UPageCard`, etc.) — see [Nuxt UI docs](https://ui.nuxt.com)

## Adding New API Endpoints

1. Create file in `server/api/` — Nitro auto-registers the route
2. For public endpoints: use `defineEventHandler`
3. For authenticated endpoints: use `defineAuthHandler` (auto-verifies JWT, provides `event.context.user`)
4. Validate request bodies with Zod
5. Use query functions from `server/database/queries/` for database access

## Adding Database Tables

1. Define table in `server/database/schema.ts` using Drizzle's `sqliteTable`
2. Export `Type` and `NewType` using `InferSelectModel` / `InferInsertModel`
3. Create query functions in `server/database/queries/`
4. Run `bun run db:push` (dev) or `bun run db:generate && bun run db:migrate` (production)
