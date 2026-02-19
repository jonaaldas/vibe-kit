<script setup lang="ts">
const authStore = useAuthStore();

const sections = [
  {
    id: 'quickstart',
    icon: 'i-lucide-rocket',
    title: 'Quick Start',
    steps: [
      {
        title: 'Clone the repo',
        code: 'git clone https://github.com/your-repo/vibe-coding-starter-kit.git\ncd vibe-coding-starter-kit',
      },
      { title: 'Install dependencies', code: 'bun install' },
      {
        title: 'Set up environment variables',
        code: 'cp .env.example .env\n# Fill in your keys (see Environment Setup below)',
      },
      { title: 'Push database schema', code: 'bun run db:push' },
      { title: 'Start dev server', code: 'bun run dev\n# Open http://localhost:4242' },
    ],
  },
  {
    id: 'env',
    icon: 'i-lucide-key-round',
    title: 'Environment Setup',
    vars: [
      { name: 'DATABASE_URL', desc: 'Turso database URL — get one free at turso.tech' },
      { name: 'DATABASE_TOKEN', desc: 'Turso auth token for your database' },
      { name: 'JWT_SECRET', desc: 'Any random string — used to sign session cookies' },
      { name: 'GOOGLE_CLIENT_ID', desc: 'Google OAuth client ID from console.cloud.google.com' },
      { name: 'GOOGLE_CLIENT_SECRET', desc: 'Google OAuth client secret' },
      { name: 'SITE_URL', desc: 'Your app URL — http://localhost:4242 for local dev' },
      { name: 'STRIPE_SECRET_KEY', desc: 'Stripe secret key from dashboard.stripe.com' },
      { name: 'STRIPE_PUBLISHABLE_KEY', desc: 'Stripe publishable key' },
      { name: 'STRIPE_WEBHOOK_SECRET', desc: 'Stripe webhook signing secret (whsec_...)' },
    ],
  },
];

const stack = [
  { icon: 'i-simple-icons-nuxtdotjs', name: 'Nuxt 4', desc: 'Vue framework with file-based routing' },
  { icon: 'i-simple-icons-tailwindcss', name: 'Tailwind CSS v4', desc: 'Utility-first styling' },
  { icon: 'i-lucide-layout-grid', name: 'Nuxt UI v4', desc: 'Beautiful component library' },
  { icon: 'i-simple-icons-drizzle', name: 'Drizzle ORM', desc: 'Type-safe database queries' },
  { icon: 'i-lucide-database', name: 'Turso', desc: 'SQLite at the edge' },
  { icon: 'i-simple-icons-stripe', name: 'Stripe', desc: 'Subscriptions & billing' },
  { icon: 'i-simple-icons-google', name: 'Google OAuth', desc: 'One-click authentication' },
  { icon: 'i-lucide-store', name: 'Pinia', desc: 'State management' },
];

const architecture = [
  {
    title: 'Client (app/)',
    items: [
      { path: 'pages/', desc: 'File-based routing — each .vue file is a route' },
      { path: 'stores/auth.ts', desc: 'Pinia auth store — manages user state' },
      { path: 'middleware/auth.global.ts', desc: 'Route guard — protects /settings, /protected' },
      { path: 'plugins/auth.ts', desc: 'Fetches user session on app init' },
      { path: 'composables/', desc: 'Reusable composition functions (e.g. useStripe)' },
      { path: 'config/plans.ts', desc: 'Stripe pricing plan definitions' },
    ],
  },
  {
    title: 'Server (server/)',
    items: [
      { path: 'api/auth/', desc: 'Auth endpoints — Google OAuth, logout, session check' },
      { path: 'api/stripe/', desc: 'Stripe endpoints — checkout, portal, webhooks' },
      { path: 'database/schema.ts', desc: 'Drizzle schema — users table definition' },
      { path: 'database/queries/', desc: 'Database query functions' },
      { path: 'utils/defineAuthHandler.ts', desc: 'Wrapper for authenticated API routes' },
      { path: 'utils/createSession.ts', desc: 'JWT session creation & verification' },
    ],
  },
];

const commands = [
  { cmd: 'bun run dev', desc: 'Start dev server on port 4242' },
  { cmd: 'bun run build', desc: 'Production build' },
  { cmd: 'bun run lint', desc: 'Run ESLint' },
  { cmd: 'bun run typecheck', desc: 'Type check with nuxt typecheck' },
  { cmd: 'bun run db:generate', desc: 'Generate Drizzle migrations' },
  { cmd: 'bun run db:migrate', desc: 'Run pending migrations' },
  { cmd: 'bun run db:push', desc: 'Push schema directly (skip migrations)' },
  { cmd: 'bun run db:studio', desc: 'Open Drizzle Studio GUI' },
];

const vibeGuide = [
  {
    title: 'Add a new page',
    prompt:
      'Create a new page at /dashboard that shows user stats. Use Nuxt UI components and protect it with auth middleware.',
  },
  {
    title: 'Add a new API endpoint',
    prompt:
      "Create a new authenticated API endpoint at /api/user/update-name that accepts a POST with { name } body and updates the user's name in the database.",
  },
  {
    title: 'Add a new database table',
    prompt:
      'Add a "posts" table to the Drizzle schema with id, userId, title, content, and createdAt fields. Generate a migration and create query functions.',
  },
  {
    title: 'Add a new auth provider',
    prompt:
      'Add GitHub OAuth as a second login option alongside Google. Create the OAuth flow in server/api/auth/github.ts and add a "Continue with GitHub" button to the register page.',
  },
];

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text);
}
</script>

<template>
  <div class="min-h-dvh bg-gray-950 text-gray-100">
    <!-- Nav -->
    <nav
      class="sticky top-0 z-50 flex items-center justify-between border-b border-gray-800/60 bg-gray-950/80 px-6 py-4 backdrop-blur-xl sm:px-10"
    >
      <NuxtLink to="/" class="flex items-center gap-2">
        <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-green-500">
          <UIcon name="i-lucide-zap" class="text-white text-lg" />
        </div>
        <span class="text-white font-semibold text-lg tracking-tight">vibe-kit</span>
      </NuxtLink>
      <div class="flex items-center gap-3">
        <UButton to="/pricing" label="Pricing" color="neutral" variant="ghost" class="text-gray-300 hover:text-white" />
        <UButton v-if="authStore.user" to="/settings" label="Dashboard" variant="subtle" />
        <UButton v-else to="/register" label="Sign In" variant="subtle" />
      </div>
    </nav>

    <div class="mx-auto max-w-4xl px-6 py-16 sm:px-10">
      <!-- Header -->
      <div class="mb-16">
        <div
          class="mb-4 inline-flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1 text-sm text-green-400"
        >
          <UIcon name="i-lucide-book-open" class="text-base" />
          <span>Documentation</span>
        </div>
        <h1 class="text-4xl font-bold tracking-tight text-white sm:text-5xl">Get up and running</h1>
        <p class="mt-4 text-lg text-gray-400">Everything you need to go from clone to production.</p>
      </div>

      <!-- Quick Start -->
      <section id="quickstart" class="mb-20">
        <div class="mb-6 flex items-center gap-3">
          <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/10 text-green-400">
            <UIcon name="i-lucide-rocket" class="text-xl" />
          </div>
          <h2 class="text-2xl font-bold text-white">Quick Start</h2>
        </div>
        <div class="flex flex-col gap-4">
          <div
            v-for="(step, i) in sections[0]?.steps"
            :key="i"
            class="group rounded-xl border border-gray-800/60 bg-gray-900/40 p-5 transition-colors hover:border-gray-700/60"
          >
            <div class="mb-3 flex items-center gap-3">
              <div
                class="flex h-7 w-7 items-center justify-center rounded-lg bg-green-500/15 text-sm font-bold text-green-400"
              >
                {{ i + 1 }}
              </div>
              <h3 class="font-semibold text-white">
                {{ step.title }}
              </h3>
            </div>
            <div class="relative">
              <pre
                class="overflow-x-auto rounded-lg bg-gray-950 border border-gray-800/40 p-4 text-sm text-gray-300"
              ><code>{{ step.code }}</code></pre>
              <button
                class="absolute top-3 right-3 rounded-md p-1.5 text-gray-500 opacity-0 transition-opacity hover:text-gray-300 group-hover:opacity-100"
                @click="copyToClipboard(step.code)"
              >
                <UIcon name="i-lucide-copy" class="text-base" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Environment Setup -->
      <section id="env" class="mb-20">
        <div class="mb-6 flex items-center gap-3">
          <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/10 text-green-400">
            <UIcon name="i-lucide-key-round" class="text-xl" />
          </div>
          <h2 class="text-2xl font-bold text-white">Environment Variables</h2>
        </div>
        <div class="overflow-hidden rounded-xl border border-gray-800/60">
          <div
            v-for="(v, i) in sections[1]?.vars"
            :key="v.name"
            class="flex flex-col gap-1 border-b border-gray-800/40 px-5 py-4 last:border-b-0 sm:flex-row sm:items-center sm:gap-4"
            :class="i % 2 === 0 ? 'bg-gray-900/30' : 'bg-gray-900/10'"
          >
            <code class="shrink-0 text-sm font-semibold text-green-400 sm:w-56">{{ v.name }}</code>
            <span class="text-sm text-gray-400">{{ v.desc }}</span>
          </div>
        </div>
      </section>

      <!-- Tech Stack -->
      <section id="stack" class="mb-20">
        <div class="mb-6 flex items-center gap-3">
          <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/10 text-green-400">
            <UIcon name="i-lucide-layers" class="text-xl" />
          </div>
          <h2 class="text-2xl font-bold text-white">Tech Stack</h2>
        </div>
        <div class="grid gap-3 sm:grid-cols-2">
          <div
            v-for="tech in stack"
            :key="tech.name"
            class="flex items-center gap-4 rounded-xl border border-gray-800/60 bg-gray-900/30 p-4 transition-colors hover:border-gray-700/60"
          >
            <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-800/60">
              <UIcon :name="tech.icon" class="text-xl text-gray-300" />
            </div>
            <div>
              <div class="font-semibold text-white">
                {{ tech.name }}
              </div>
              <div class="text-sm text-gray-500">
                {{ tech.desc }}
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Architecture -->
      <section id="architecture" class="mb-20">
        <div class="mb-6 flex items-center gap-3">
          <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/10 text-green-400">
            <UIcon name="i-lucide-folder-tree" class="text-xl" />
          </div>
          <h2 class="text-2xl font-bold text-white">Project Structure</h2>
        </div>
        <div class="flex flex-col gap-6">
          <div
            v-for="group in architecture"
            :key="group.title"
            class="rounded-xl border border-gray-800/60 bg-gray-900/30 overflow-hidden"
          >
            <div class="border-b border-gray-800/40 bg-gray-900/60 px-5 py-3">
              <h3 class="font-semibold text-white">
                {{ group.title }}
              </h3>
            </div>
            <div class="divide-y divide-gray-800/30">
              <div
                v-for="item in group.items"
                :key="item.path"
                class="flex flex-col gap-1 px-5 py-3 sm:flex-row sm:items-center sm:gap-4"
              >
                <code class="shrink-0 text-sm text-green-400 sm:w-56">{{ item.path }}</code>
                <span class="text-sm text-gray-400">{{ item.desc }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Commands -->
      <section id="commands" class="mb-20">
        <div class="mb-6 flex items-center gap-3">
          <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/10 text-green-400">
            <UIcon name="i-lucide-terminal" class="text-xl" />
          </div>
          <h2 class="text-2xl font-bold text-white">Commands</h2>
        </div>
        <div class="overflow-hidden rounded-xl border border-gray-800/60">
          <div
            v-for="(c, i) in commands"
            :key="c.cmd"
            class="flex flex-col gap-1 border-b border-gray-800/40 px-5 py-3.5 last:border-b-0 sm:flex-row sm:items-center sm:gap-4"
            :class="i % 2 === 0 ? 'bg-gray-900/30' : 'bg-gray-900/10'"
          >
            <code class="shrink-0 text-sm font-semibold text-green-400 sm:w-52">{{ c.cmd }}</code>
            <span class="text-sm text-gray-400">{{ c.desc }}</span>
          </div>
        </div>
      </section>

      <!-- Vibe Coding Guide -->
      <section id="vibe" class="mb-20">
        <div class="mb-6 flex items-center gap-3">
          <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/10 text-green-400">
            <UIcon name="i-lucide-sparkles" class="text-xl" />
          </div>
          <h2 class="text-2xl font-bold text-white">Vibe Coding Guide</h2>
        </div>
        <p class="mb-6 text-gray-400">
          Copy these prompts into Claude Code or your AI assistant to extend the starter kit. The AI reads the
          <code class="rounded bg-gray-800 px-1.5 py-0.5 text-green-400">CLAUDE.md</code> file for full context.
        </p>
        <div class="flex flex-col gap-4">
          <div
            v-for="guide in vibeGuide"
            :key="guide.title"
            class="group rounded-xl border border-gray-800/60 bg-gray-900/40 p-5 transition-colors hover:border-gray-700/60"
          >
            <h3 class="mb-3 font-semibold text-white">
              {{ guide.title }}
            </h3>
            <div class="relative">
              <pre
                class="overflow-x-auto whitespace-pre-wrap rounded-lg bg-gray-950 border border-gray-800/40 p-4 text-sm text-gray-300"
              ><code>{{ guide.prompt }}</code></pre>
              <button
                class="absolute top-3 right-3 rounded-md p-1.5 text-gray-500 opacity-0 transition-opacity hover:text-gray-300 group-hover:opacity-100"
                @click="copyToClipboard(guide.prompt)"
              >
                <UIcon name="i-lucide-copy" class="text-base" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Footer -->
      <div class="mx-auto h-px w-full max-w-lg bg-linear-to-r from-transparent via-green-500/30 to-transparent" />
      <div class="mt-8 text-center text-sm text-gray-600">Built for vibes. Ship fast.</div>
    </div>
  </div>
</template>
