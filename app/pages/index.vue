<script setup lang="ts">
const authStore = useAuthStore()

async function logout() {
  await $fetch('/api/auth/logout', { method: 'POST' })
  authStore.user = null
  navigateTo('/register')
}
</script>

<template>
  <div>
    <h1>Welcome to Vibe Coding Starter Kit</h1>
    <p>This is a simple Vue.js application that you can use as a starting point for your own projects.</p>
    <UButton
      v-if="authStore.user"
      label="Logout"
      color="neutral"
      variant="outline"
      @click="logout"
    />
  </div>
</template>
