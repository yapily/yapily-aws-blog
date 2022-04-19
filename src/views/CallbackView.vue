<template>
  <div>callback</div>
</template>
<script setup>
import { onMounted } from "vue";

onMounted(async () => {
  // set timeout to match interval for checking if consent is succesfull
  setTimeout(() => {
    window.close();
  });
});
</script>
