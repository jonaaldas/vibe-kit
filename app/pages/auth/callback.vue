<template>
  <div class="min-h-screen flex items-center justify-center">
    <p>Signing you in...</p>
  </div>
</template>

<script setup>
onMounted(async () => {
  const query = new URLSearchParams(window.location.search);
  const code = query.get('code');

  const response = await $fetch('/api/auth/google', {
    method: 'POST',
    body: { code },
  });

  if (response.res === true) {
    await navigateTo('/protected');
  }
});
</script>
