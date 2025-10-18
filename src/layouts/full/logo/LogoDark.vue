<template>
  <div class="logo">
    <RouterLink to="/">
      <img :src="logo" height="40px" alt="logo" />
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

// Import the logo from the public folder
const logo = '/logo.png';

const primary = ref('rgb(var(--v-theme-primary))');
const secondary = ref('rgb(var(--v-theme-secondary))');
</script>
