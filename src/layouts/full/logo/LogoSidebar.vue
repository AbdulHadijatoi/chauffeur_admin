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
      <div class="d-flex align-items-center justify-center mt-2">
        <img v-if="logo" :src="logo" height="80px" alt="logo" />
      </div>
    </RouterLink>
  </div>
</template>
