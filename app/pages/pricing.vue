<script setup lang="ts">
import { plans } from '~/config/plans'

const authStore = useAuthStore()
const billing = ref<'monthly' | 'yearly'>('monthly')
const loadingPriceId = ref<string | null>(null)

const isSubscribed = computed(() =>
  authStore.user?.subscriptionStatus === 'active' || authStore.user?.subscriptionStatus === 'trialing'
)

async function subscribe(priceId: string) {
  if (!authStore.user) {
    return navigateTo('/register')
  }
  loadingPriceId.value = priceId
  try {
    const { url } = await $fetch('/api/stripe/create-checkout', {
      method: 'POST',
      body: { priceId }
    })
    if (url) {
      navigateTo(url, { external: true })
    }
  } catch (err) {
    console.error('Checkout error:', err)
  } finally {
    loadingPriceId.value = null
  }
}

async function manageSubscription() {
  try {
    const { url } = await $fetch('/api/stripe/create-portal', {
      method: 'POST'
    })
    if (url) {
      navigateTo(url, { external: true })
    }
  } catch (err) {
    console.error('Portal error:', err)
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950 px-4 py-16">
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-12">
        <h1 class="text-3xl font-bold mb-3">
          Pricing
        </h1>
        <p class="text-gray-500 dark:text-gray-400 mb-6">
          Choose the plan that works for you
        </p>

        <div class="inline-flex items-center gap-3">
          <span :class="billing === 'monthly' ? 'font-semibold' : 'text-gray-500'">Monthly</span>
          <USwitch
            :model-value="billing === 'yearly'"
            @update:model-value="billing = $event ? 'yearly' : 'monthly'"
          />
          <span :class="billing === 'yearly' ? 'font-semibold' : 'text-gray-500'">Yearly</span>
        </div>
      </div>

      <div class="grid md:grid-cols-2 gap-8">
        <UPageCard
          v-for="plan in plans"
          :key="plan.name"
        >
          <div class="flex flex-col gap-4 p-4">
            <div>
              <h2 class="text-xl font-semibold">
                {{ plan.name }}
              </h2>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                {{ plan.description }}
              </p>
            </div>

            <div class="flex items-baseline gap-1">
              <span class="text-4xl font-bold">{{ billing === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice }}</span>
              <span class="text-gray-500 dark:text-gray-400">/{{ billing === 'monthly' ? 'mo' : 'yr' }}</span>
            </div>

            <ul class="flex flex-col gap-2">
              <li
                v-for="feature in plan.features"
                :key="feature"
                class="flex items-center gap-2 text-sm"
              >
                <UIcon
                  name="i-lucide-check"
                  class="text-primary shrink-0"
                />
                {{ feature }}
              </li>
            </ul>

            <div class="mt-2">
              <UButton
                v-if="isSubscribed"
                label="Manage Subscription"
                color="neutral"
                variant="outline"
                block
                @click="manageSubscription"
              />
              <UButton
                v-else
                label="Subscribe"
                block
                :loading="loadingPriceId === (billing === 'monthly' ? plan.monthlyPriceId : plan.yearlyPriceId)"
                @click="subscribe(billing === 'monthly' ? plan.monthlyPriceId : plan.yearlyPriceId)"
              />
            </div>
          </div>
        </UPageCard>
      </div>
    </div>
  </div>
</template>
