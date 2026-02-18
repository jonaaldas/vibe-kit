<template>
  <NuxtPage />
  <UIButton @click="handleClick">Click me</UIButton>
</template>
<script setup lang="ts">
const handleClick = async () => {
  const cookie = await $fetch('/api/test');
  console.log(cookie);
};
</script>
