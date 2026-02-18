<template>
  <h1>Callback</h1>
</template>

<script setup>
onMounted(async () => {
  const query = new URLSearchParams(window.location.search);
  const code = query.get('code');
  console.log(code);

  const response = await $fetch('/api/auth/register', {
    method: 'POST',
    body: {
      code,
    },
  });

  console.log(response);
});
</script>
