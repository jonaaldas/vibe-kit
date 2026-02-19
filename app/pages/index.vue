<script setup lang="ts">
const authStore = useAuthStore();

const features = [
  { icon: 'i-lucide-shield-check', label: 'Google Auth' },
  { icon: 'i-lucide-credit-card', label: 'Stripe Billing' },
  { icon: 'i-lucide-database', label: 'Turso DB' },
  { icon: 'i-lucide-bot', label: 'AI-Ready' },
];
</script>

<template>
  <div class="relative min-h-dvh w-full overflow-hidden bg-gray-950 flex flex-col">
    <!-- Gradient orbs -->
    <div class="pointer-events-none absolute inset-0">
      <div class="absolute -top-40 -left-40 size-150 rounded-full bg-green-500/15 blur-[120px]" />
      <div class="absolute -bottom-40 -right-40 size-125 rounded-full bg-green-400/10 blur-[100px]" />
      <div
        class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-75 rounded-full bg-green-600/5 blur-[80px]"
      />
    </div>

    <!-- Dot grid pattern -->
    <div
      class="pointer-events-none absolute inset-0 opacity-20"
      :style="{
        backgroundImage: 'radial-gradient(circle, rgb(74 222 128 / 0.15) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
      }"
    />

    <!-- Nav -->
    <nav class="relative z-10 flex items-center justify-between px-6 py-5 sm:px-10">
      <div class="flex items-center gap-2">
        <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-green-500">
          <UIcon name="i-lucide-zap" class="text-white text-lg" />
        </div>
        <span class="text-white font-semibold text-lg tracking-tight">vibe-kit</span>
      </div>
      <div class="flex items-center gap-3">
        <UButton to="/docs" label="Docs" color="neutral" variant="ghost" class="text-gray-300 hover:text-white" />
        <UButton to="/pricing" label="Pricing" color="neutral" variant="ghost" class="text-gray-300 hover:text-white" />
        <UButton v-if="authStore.user" to="/settings" label="Dashboard" variant="subtle" />
        <UButton v-else to="/register" label="Sign In" variant="subtle" />
      </div>
    </nav>

    <!-- Hero content -->
    <div class="relative z-10 flex flex-1 flex-col items-center justify-center px-6 text-center">
      <!-- Badge -->
      <div
        class="mb-8 inline-flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-4 py-1.5 text-sm text-green-400"
      >
        <UIcon name="i-lucide-sparkles" class="text-base" />
        <span>Built for vibe coders</span>
      </div>

      <!-- Headline -->
      <h1 class="max-w-3xl text-5xl font-bold leading-[1.1] tracking-tight text-white sm:text-7xl">
        Ship your app
        <span class="bg-linear-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent"
          >before the vibe fades</span
        >
      </h1>

      <!-- Subheading -->
      <p class="mt-6 max-w-xl text-lg text-gray-400 leading-relaxed sm:text-xl">
        Auth, payments, database, and deployment — all wired up. Clone it. Prompt it. Ship it.
      </p>

      <!-- CTA buttons -->
      <div class="mt-10 flex flex-wrap items-center justify-center gap-4">
        <UButton to="/docs" label="Get Started" size="xl" trailing-icon="i-lucide-arrow-right" />
        <UButton
          to="https://github.com/jonaaldas/vibe-kit"
          external
          label="GitHub"
          icon="i-simple-icons-github"
          color="neutral"
          variant="solid"
          size="xl"
        />
        <UButton
          to="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fjonaaldas%2Fvibe-kit&demo-title=Vibe%20Coding%20Starter%20Kit&demo-description=Nuxt%204%20starter%20with%20auth%2C%20Stripe%2C%20and%20Turso%20DB"
          external
          label="Deploy to Vercel"
          icon="i-simple-icons-vercel"
          color="neutral"
          variant="solid"
          size="xl"
        />
      </div>

      <!-- Feature pills -->
      <div class="mt-16 flex flex-wrap items-center justify-center gap-3">
        <div
          v-for="feature in features"
          :key="feature.label"
          class="flex items-center gap-2 rounded-full border border-gray-800 bg-gray-900/60 px-4 py-2 text-sm text-gray-300 backdrop-blur-sm"
        >
          <UIcon :name="feature.icon" class="text-green-400 text-base" />
          <span>{{ feature.label }}</span>
        </div>
      </div>
    </div>

    <!-- Bottom fade line -->
    <div
      class="relative z-10 mx-auto mb-8 h-px w-full max-w-lg bg-linear-to-r from-transparent via-green-500/30 to-transparent"
    />
  </div>
</template>
