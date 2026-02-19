<script setup lang="ts">
const authStore = useAuthStore()

const isSubscribed = computed(() =>
  authStore.user?.subscriptionStatus === 'active' || authStore.user?.subscriptionStatus === 'trialing'
)

const subscriptionLabel = computed(() => {
  const status = authStore.user?.subscriptionStatus
  if (!status) return 'No subscription'
  return status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')
})

const renewalDate = computed(() => {
  const end = authStore.user?.currentPeriodEnd
  if (!end) return null
  return new Date(end * 1000).toLocaleDateString()
})

async function manageSubscription() {
  const { url } = await $fetch('/api/stripe/create-portal', { method: 'POST' })
  if (url) {
    navigateTo(url, { external: true })
  }
}

async function logout() {
  await $fetch('/api/auth/logout', { method: 'POST' })
  authStore.user = null
  navigateTo('/register')
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
    <div class="w-full max-w-md flex flex-col gap-6">
      <UPageCard>
        <div class="flex flex-col items-center gap-4 p-4">
          <UAvatar
            v-if="authStore.user?.picture"
            :src="authStore.user.picture"
            :alt="authStore.user.name"
            size="xl"
          />
          <div class="text-center">
            <h2 class="text-xl font-semibold">
              {{ authStore.user?.name }}
            </h2>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              {{ authStore.user?.email }}
            </p>
          </div>
          <UBadge
            color="success"
            variant="subtle"
            label="Linked with Google"
          />
          <UButton
            label="Logout"
            color="neutral"
            variant="outline"
            block
            @click="logout"
          />
        </div>
      </UPageCard>

      <UPageCard>
        <div class="flex flex-col gap-4 p-4">
          <h3 class="text-lg font-semibold">
            Subscription
          </h3>
          <div class="flex items-center justify-between">
            <span class="text-sm text-gray-500 dark:text-gray-400">Status</span>
            <UBadge
              :color="isSubscribed ? 'success' : 'neutral'"
              :variant="isSubscribed ? 'subtle' : 'outline'"
              :label="subscriptionLabel"
            />
          </div>
          <div
            v-if="renewalDate"
            class="flex items-center justify-between"
          >
            <span class="text-sm text-gray-500 dark:text-gray-400">Renews</span>
            <span class="text-sm">{{ renewalDate }}</span>
          </div>
          <UButton
            v-if="authStore.user?.stripeCustomerId"
            label="Manage Billing"
            color="neutral"
            variant="outline"
            block
            @click="manageSubscription"
          />
          <UButton
            v-else
            label="View Plans"
            block
            @click="navigateTo('/pricing')"
          />
        </div>
      </UPageCard>
    </div>
  </div>
</template>
