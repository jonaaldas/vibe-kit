<script setup lang="ts">
const authStore = useAuthStore();

async function logout() {
  await $fetch('/api/auth/logout', { method: 'POST' });
  authStore.user = null;
  navigateTo('/register');
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
    <div class="w-full max-w-md">
      <UPageCard>
        <div class="flex flex-col items-center gap-4 p-4">
          <UAvatar
            v-if="authStore.user?.picture"
            :src="authStore.user.picture"
            :alt="authStore.user.name"
            size="xl"
          />
          <div class="text-center">
            <h2 class="text-xl font-semibold">{{ authStore.user?.name }}</h2>
            <p class="text-sm text-gray-500 dark:text-gray-400">{{ authStore.user?.email }}</p>
          </div>
          <UBadge color="success" variant="subtle" label="Linked with Google" />
          <UButton label="Logout" color="neutral" variant="outline" block @click="logout" />
        </div>
      </UPageCard>
    </div>
  </div>
</template>
