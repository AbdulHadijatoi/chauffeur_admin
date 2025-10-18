<script setup>
import { ref, onMounted } from 'vue';
import { fetchWrapper } from '@/utils/helpers/fetch-wrapper';
import { base_url,domain } from '@/utils/config';
import logo from '@/assets/images/logos/logo.png'
import { RouterLink } from 'vue-router';

</script>

<template>
  <div class="logo">
    <RouterLink to="/">
      <img v-if="logo" :src="logo" height="100px" alt="logo" />
    </RouterLink>
  </div>
</template>
