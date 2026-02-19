<template>
  <h1>Callback</h1>
</template>

<script setup>
onMounted(async () => {
  const query = new URLSearchParams(window.location.search);
  const code = query.get('code');

  const response = await $fetch('/api/auth/register', {
    method: 'POST',
    body: {
      code,
    },
  });

  if (response.res == true) {
    await navigateTo('/protected');
  }
});
</script>
